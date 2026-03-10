import { create } from 'zustand'

type TransactionType = 'debit' | 'credit'

interface TransactionModalState {
  isOpen: boolean
  transactionType: TransactionType | null
  openModal: (type: TransactionType) => void
  closeModal: () => void
}

export const useTransactionModalStore = create<TransactionModalState>((set) => ({
  isOpen: false,
  transactionType: null,
  openModal: (type) => set({ isOpen: true, transactionType: type }),
  closeModal: () => set({ isOpen: false, transactionType: null }),
}))
