import { create } from 'zustand'
import type { Article } from '../schema/ArticleSchema.type'

interface ArticleModalState {
  // Form Modal
  showFormModal: boolean
  selectedArticle: Article | null
  openFormModal: (article?: Article) => void
  closeFormModal: () => void
}

export const useArticleModalStore = create<ArticleModalState>((set) => ({
  // Form Modal State
  showFormModal: false,
  selectedArticle: null,
  
  openFormModal: (article) => set({
    showFormModal: true,
    selectedArticle: article || null,
  }),
  
  closeFormModal: () => set({
    showFormModal: false,
    selectedArticle: null,
  }),
}))
