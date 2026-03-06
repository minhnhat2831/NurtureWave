import { useTableManager } from '@/hooks/useTableManager'
import { getCategories } from '../api/api'

export const useCategoryList = () => {
  return useTableManager({
    queryKey: ['categories'],
    queryFn: async (params) => {
      const response = await getCategories(params)
      return {
        data: response.data,
        metadata: response.metadata
      }
    },
    defaultLimit: 10,
  })
}
