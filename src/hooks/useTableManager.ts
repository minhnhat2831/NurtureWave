import { useQuery } from '@tanstack/react-query'
import { useQueryParams } from './useQueryParams'
import type { MetadataType } from '@/constants/SchemaConstants'

interface UseTableManagerOptions<TData> {
  queryKey: string[]
  queryFn: (params: any) => Promise<{
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

  // handlers
  const setPage = (newPage: number) => {
    setParams({ page: newPage })
  }

  const setLimit = (newLimit: number) => {
    setParams({ limit: newLimit, page: 1 })
  }

  const setSearch = (value: string) => {
    setParams({ search: value, page: 1 })
  }

  const setSort = (value: string) => {
    setParams({ sort: value })
  }

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