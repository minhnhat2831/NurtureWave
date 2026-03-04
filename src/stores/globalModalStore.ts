import { create } from 'zustand'

/**
 * GLOBAL MODAL STORE
 * For common modals used across the application (Sidebar, Header, etc.)
 */
interface GlobalModalState {
  // Change Password Modal
  showChangePasswordModal: boolean
  openChangePasswordModal: () => void
  closeChangePasswordModal: () => void
}

export const useGlobalModalStore = create<GlobalModalState>((set) => ({
  // Change Password Modal
  showChangePasswordModal: false,
  
  openChangePasswordModal: () => set({ showChangePasswordModal: true }),
  
  closeChangePasswordModal: () => set({ showChangePasswordModal: false }),
}))
