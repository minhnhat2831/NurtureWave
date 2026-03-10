import { create } from 'zustand'

interface ContextModalState {
  open: boolean
  openModal: (type: boolean) => void
  closeModal: () => void
}

export const useContextModalStore = create<ContextModalState>((set) => ({
  open: false,
  openModal: (open) => set({ open }),
  closeModal: () => set({ open: false}),
}))
