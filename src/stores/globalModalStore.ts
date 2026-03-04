import { create } from 'zustand'

/**
 * GLOBAL MODAL STORE
 * For common modals used across the application (Sidebar, Header, etc.)
 */

interface ConfirmDialogOptions {
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info'
  onConfirm: () => void
  onCancel?: () => void
  isLoading?: boolean
}

interface GlobalModalState {
  // Change Password Modal
  showChangePasswordModal: boolean
  openChangePasswordModal: () => void
  closeChangePasswordModal: () => void

  // Global Confirm Dialog
  confirmDialog: ConfirmDialogOptions | null
  showConfirm: (options: ConfirmDialogOptions) => void
  closeConfirm: () => void
  setConfirmLoading: (isLoading: boolean) => void
}

export const useGlobalModalStore = create<GlobalModalState>((set) => ({
  // Change Password Modal
  showChangePasswordModal: false,
  
  openChangePasswordModal: () => set({ showChangePasswordModal: true }),
  
  closeChangePasswordModal: () => set({ showChangePasswordModal: false }),

  // Global Confirm Dialog
  confirmDialog: null,
  
  showConfirm: (options) => set({ 
    confirmDialog: { 
      ...options,
      confirmText: options.confirmText || 'Confirm',
      cancelText: options.cancelText || 'Cancel',
      variant: options.variant || 'danger',
      isLoading: false,
    } 
  }),
  
  closeConfirm: () => set({ confirmDialog: null }),
  
  setConfirmLoading: (isLoading) => set((state) => 
    state.confirmDialog 
      ? { confirmDialog: { ...state.confirmDialog, isLoading } }
      : {}
  ),
}))
