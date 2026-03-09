import { useQuery } from '@tanstack/react-query'
import { getCategories } from '@/modules/article/api/categoryApi'

/**
 * PD Session Form Options & Constants
 */

export const PD_SESSION_STATUS_OPTIONS = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'unpublished', label: 'Unpublished' },
]

export const usePDSessionFormOptions = () => {
  const { data: categoriesData, isLoading: loadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  const categoryOptions = categoriesData?.data.map((cat) => ({
    value: cat.id,
    label: cat.name,
  })) || []

  return {
    categoryOptions,
    loadingCategories,
  }
}
