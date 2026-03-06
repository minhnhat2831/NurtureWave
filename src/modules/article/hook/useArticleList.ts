import { useTableManager } from '@/hooks/useTableManager'
import { getArticles } from '../api/api'

export const useArticleList = () => {
  return useTableManager({
    queryKey: ['articles'],
    queryFn: async (params) => {
      const response = await getArticles(params)
      return {
        data: response.data,
        metadata: response.metadata
      }
    },
    defaultLimit: 10,
  })
}
