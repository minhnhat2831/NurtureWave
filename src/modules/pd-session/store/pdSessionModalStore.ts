import { create } from 'zustand'
import type { PDSession } from '../schema/PDSessionSchema.type'

interface PDSessionModalState {
  // Form Modal
  showFormModal: boolean
  selectedPDSession: PDSession | null
  openFormModal: (pdSession?: PDSession) => void
  closeFormModal: () => void
  
  // Delete Modal
  showDeleteModal: boolean
  selectedDeletePDSession: PDSession | null
  openDeleteModal: (pdSession: PDSession) => void
  closeDeleteModal: () => void
}

export const usePDSessionModalStore = create<PDSessionModalState>((set) => ({
  // Form Modal State
  showFormModal: false,
  selectedPDSession: null,
  
  openFormModal: (pdSession) => set({
    showFormModal: true,
    selectedPDSession: pdSession || null,
  }),
  
  closeFormModal: () => set({
    showFormModal: false,
    selectedPDSession: null,
  }),
  
  // Delete Modal State
  showDeleteModal: false,
  selectedDeletePDSession: null,
  
  openDeleteModal: (pdSession) => set({
    showDeleteModal: true,
    selectedDeletePDSession: pdSession,
  }),
  
  closeDeleteModal: () => set({
    showDeleteModal: false,
    selectedDeletePDSession: null,
  }),
}))
