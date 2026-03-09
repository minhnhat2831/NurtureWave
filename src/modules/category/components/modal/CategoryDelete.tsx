import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { ConfirmModal } from '@/components/common'
import { deleteCategories } from '../../api/api'
import { useCategoryModalStore } from '../../store'
import { handleApiError } from '@/utils/errorHandler'

export default function CategoryDelete() {
  const queryClient = useQueryClient()
  const { showDeleteModal, selectedDeleteCategory, closeDeleteModal } = useCategoryModalStore()

  const deleteMutation = useMutation({
    mutationFn: (ids: string[]) => deleteCategories(ids),
    onSuccess: () => {
      toast.success('Category deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      closeDeleteModal()
    },
    onError: (error) => {
      handleApiError(error, 'Failed to delete category')
    },
  })

  const handleConfirmDelete = () => {
    if (selectedDeleteCategory) {
      deleteMutation.mutate([selectedDeleteCategory.id])
    }
  }

  return (
    <ConfirmModal
      isOpen={showDeleteModal}
      onClose={closeDeleteModal}
      onConfirm={handleConfirmDelete}
      title="Delete Category"
      message="Are you sure you want to delete this category? This action cannot be undone."
      confirmText="Delete"
      variant="danger"
      isLoading={deleteMutation.isPending}
    />
  )
}
