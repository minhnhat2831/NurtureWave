import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteArticles } from '../../api/api'
import { useArticleModalStore } from '../../store'
import { ConfirmModal } from '@/components/common'
import { handleApiError } from '@/utils/errorHandler'

export default function ArticleDelete() {
  const queryClient = useQueryClient()
  const { showDeleteModal, selectedDeleteArticle, closeDeleteModal } = useArticleModalStore()

  const deleteMutation = useMutation({
    mutationFn: (ids: string[]) => deleteArticles(ids),
    onSuccess: () => {
      toast.success('Article deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['articles'] })
      closeDeleteModal()
    },
    onError: (error) => handleApiError(error, 'Failed to delete article'),
  })

  const handleDelete = () => {
    if (!selectedDeleteArticle) return
    deleteMutation.mutate([selectedDeleteArticle.id])
  }

  return (
    <ConfirmModal
      isOpen={showDeleteModal}
      onClose={closeDeleteModal}
      onConfirm={handleDelete}
      title="Delete Article"
      message="Are you sure you want to delete this article? This action cannot be undone."
      confirmText="Delete"
      variant="danger"
      isLoading={deleteMutation.isPending}
    />
  )
}
