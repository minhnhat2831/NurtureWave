import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
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
  const search = params.search ?? undefined
  const sort = params.sort ?? "createdAt"

  const offset = (page - 1) * limit

  const query = useQuery({
    queryKey: [...queryKey, page, limit, search, sort],
    queryFn: () =>
      queryFn({
        page,
        limit,
        offset,
        search ,
        sort,
      }),
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
    setParams({ search: value, page: 1 })
  }, [setParams])

  const setSort = useCallback((value: string) => {
    setParams({ sort: value })
  }, [setParams])

  return {
    ...query,
    data: query.data?.data ?? [],
    metadata,

    page,
    limit,
    search,
    sort,

    setPage,
    setLimit,
    setSearch,
    setSort,
  }
}