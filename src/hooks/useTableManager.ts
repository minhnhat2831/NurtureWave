import { useQuery } from '@tanstack/react-query'
import { useCallback, useState, useEffect, useMemo } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { useQueryParams } from './useQueryParams'
import type { MetadataType, ParamsType } from '@/constants/SchemaConstants'

interface UseTableManagerOptions<TData> {
  queryKey: string[]
  queryFn: (params: ParamsType) => Promise<{
    data: TData[]
    metadata: MetadataType
  }>
  defaultLimit?: number
}

export const useTableManager = <TData>({
  queryKey,
  queryFn,
  defaultLimit = 10,
}: UseTableManagerOptions<TData>) => {
  const { params, setParams } = useQueryParams()

  const page = params.page ?? 1
  const limit = params.limit ?? defaultLimit
  const search = params.search ?? ''
  const sort = params.sort ?? "createdAt"

  // Local state for search input to avoid lag during typing
  const [searchInput, setSearchInput] = useState(search)

  // Memoize offset calculation
  const offset = useMemo(() => (page - 1) * limit, [page, limit])

  // Debounced search update to URL params with dependencies
  const debouncedSetSearch = useDebouncedCallback(
    (value: string) => {
      const trimmedValue = value.trim()
      setParams({ 
        search: trimmedValue || undefined, 
        page: 1 
      })
    }, 
    500,
    { maxWait: 2000 } // Force trigger after 2s even if still typing
  )

  // Sync searchInput with URL param on mount or when URL changes externally
  useEffect(() => {
    setSearchInput(search)
  }, [search])

  // Cleanup pending debounced calls on unmount
  useEffect(() => {
    return () => {
      debouncedSetSearch.cancel()
    }
  }, [debouncedSetSearch])

  const query = useQuery({
    queryKey: [...queryKey, page, limit, search, sort],
    queryFn: () =>
      queryFn({
        page,
        limit,
        offset,
        search: search || undefined,
        sort,
      }),
    placeholderData: undefined,
  })

  const metadata = query.data?.metadata

  // handlers with useCallback for stable references
  const setPage = useCallback((newPage: number) => {
    setParams({ page: newPage })
  }, [setParams])

  const setLimit = useCallback((newLimit: number) => {
    setParams({ limit: newLimit, page: 1 })
  }, [setParams])

  const setSearch = useCallback((value: string) => {
    setSearchInput(value) // Update local state immediately
    debouncedSetSearch(value) // Update URL params with debounce
  }, [debouncedSetSearch])

  const setSort = useCallback((value: string) => {
    setParams({ sort: value })
  }, [setParams])

  return {
    ...query,
    data: query.data?.data ?? [],
    metadata,

    page,
    limit,
    search: searchInput,
    sort,

    setPage,
    setLimit,
    setSearch,
    setSort,
    
    // Show loading skeleton during initial load and data fetching (sort, filter, etc)
    isLoading: query.isLoading || query.isFetching,
  }
}