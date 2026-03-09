import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deletePDSessions } from '../../api/api'
import { usePDSessionModalStore } from '../../store'
import { ConfirmModal } from '@/components/common'
import { handleApiError } from '@/utils/errorHandler'

export default function PDSessionDelete() {
  const queryClient = useQueryClient()
  const { showDeleteModal, selectedDeletePDSession, closeDeleteModal } = usePDSessionModalStore()

  const deleteMutation = useMutation({
    mutationFn: (ids: string[]) => deletePDSessions(ids),
    onSuccess: () => {
      toast.success('PD Session deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['pd-sessions'] })
      closeDeleteModal()
    },
    onError: (error) => handleApiError(error, 'Failed to delete PD Session'),
  })

  const handleDelete = () => {
    if (!selectedDeletePDSession) return
    deleteMutation.mutate([selectedDeletePDSession.id])
  }

  return (
    <ConfirmModal
      isOpen={showDeleteModal}
      onClose={closeDeleteModal}
      onConfirm={handleDelete}
      title="Delete PD Session"
      message="Are you sure you want to delete this PD Session? This action cannot be undone."
      confirmText="Delete"
      variant="danger"
      isLoading={deleteMutation.isPending}
    />
  )
}
