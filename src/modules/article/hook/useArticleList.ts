import { useTableManager } from '@/hooks/useTableManager'
import { getArticles } from '../api/api'
import type { ArticleQueryParams } from '../schema/ArticleSchema.type'

export const useArticleList = () => {
  return useTableManager({
    queryKey: ['articles'],
    queryFn: async (params: ArticleQueryParams) => {
      const response = await getArticles(params)
      
      // If backend provides metadata, use it
      if (response.metadata) {
        return {
          data: response.data,
          metadata: response.metadata
        }
      }
      
      // Fallback: Backend returns all data without pagination
      // Calculate client-side pagination
      const totalCount = response.data.length
      const page = params.page || 1
      const limit = params.limit || 10
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedData = response.data.slice(startIndex, endIndex)
      
      return {
        data: paginatedData,
        metadata: {
          page,
          limit,
          totalPages: Math.ceil(totalCount / limit),
          totalCount,
          hasNextPage: page < Math.ceil(totalCount / limit),
        }
      }
    },
    defaultLimit: 10,
  })
}
