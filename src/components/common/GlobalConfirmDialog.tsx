import { useGlobalModalStore } from '@/stores'
import { ConfirmModal } from './ConfirmModal'

export const GlobalConfirmDialog = () => {
  const { confirmDialog, closeConfirm } = useGlobalModalStore()

  if (!confirmDialog) return null

  const handleConfirm = () => {
    confirmDialog.onConfirm()
  }

  const handleCancel = () => {
    confirmDialog.onCancel?.()
    closeConfirm()
  }

  return (
    <ConfirmModal
      isOpen={true}
      onClose={handleCancel}
      onConfirm={handleConfirm}
      title={confirmDialog.title}
      message={confirmDialog.message}
      confirmText={confirmDialog.confirmText}
      cancelText={confirmDialog.cancelText}
      variant={confirmDialog.variant}
      isLoading={confirmDialog.isLoading}
    />
  )
}
