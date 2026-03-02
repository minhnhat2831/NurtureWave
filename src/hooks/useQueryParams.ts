import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router'
import queryString from 'query-string'
import { ParamsSchema, type ParamsType } from '../constants/SchemaConstants'

export const useQueryParams = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const params = useMemo<ParamsType>(() => {
    const parsed = queryString.parse(location.search)

    const transformed = {
      ...parsed,
      page: parsed.page ? Number(parsed.page) : undefined,
      limit: parsed.limit ? Number(parsed.limit) : undefined,
      offset: parsed.offset ? Number(parsed.offset) : undefined,
    }

    const result = ParamsSchema.safeParse(transformed)

    return result.success ? result.data : {}
  }, [location.search])

  const setParams = (newParams: Partial<ParamsType>) => {
    const current = queryString.parse(location.search)

    const merged = {
      ...current,
      ...newParams,
    }

    // remove null/undefined
    Object.keys(merged).forEach((key) => {
      const typedKey = key as keyof typeof merged

      if (
        merged[typedKey] === undefined ||
        merged[typedKey] === null ||
        merged[typedKey] === ''
      ) {
        delete merged[typedKey]
      }
    })

    const stringified = queryString.stringify(merged)

    navigate({
      pathname: location.pathname,
      search: stringified,
    })
  }

  const clearParams = () => {
    navigate({
      pathname: location.pathname,
      search: '',
    })
  }

  return {
    params,
    setParams,
    clearParams,
  }
}