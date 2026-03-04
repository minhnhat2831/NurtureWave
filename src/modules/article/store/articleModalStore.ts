import { create } from 'zustand'
import type { Article } from '../schema/ArticleSchema.type'

interface ArticleModalState {
  // Form Modal
  showFormModal: boolean
  selectedArticle: Article | null
  openFormModal: (article?: Article) => void
  closeFormModal: () => void

  // Delete Modal
  showDeleteModal: boolean
  articleToDelete: string | null
  openDeleteModal: (articleId: string) => void
  closeDeleteModal: () => void
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

  // Delete Modal State
  showDeleteModal: false,
  articleToDelete: null,
  
  openDeleteModal: (articleId) => set({
    showDeleteModal: true,
    articleToDelete: articleId,
  }),
  
  closeDeleteModal: () => set({
    showDeleteModal: false,
    articleToDelete: null,
  }),
}))
