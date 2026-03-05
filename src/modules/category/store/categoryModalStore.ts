import { create } from 'zustand'
import type { Category } from '../schema/CategorySchema.type'

interface CategoryModalState {
  // Form Modal
  showFormModal: boolean
  selectedCategory: Category | null
  openFormModal: (category?: Category) => void
  closeFormModal: () => void
}

export const useCategoryModalStore = create<CategoryModalState>((set) => ({
  showFormModal: false,
  selectedCategory: null,
  
  openFormModal: (category) => set({
    showFormModal: true,
    selectedCategory: category || null,
  }),
  
  closeFormModal: () => set({
    showFormModal: false,
    selectedCategory: null,
  }),
}))
