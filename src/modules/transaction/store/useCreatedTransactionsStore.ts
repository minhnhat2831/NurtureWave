import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CashTransactionPayload } from "../types"

export interface CreatedTransactionRecord {
  id: string
  createdAt: string
  payload: CashTransactionPayload
}

interface CreatedTransactionsState {
  transactions: CreatedTransactionRecord[]
  addTransaction: (payload: CashTransactionPayload) => CreatedTransactionRecord
  clearTransactions: () => void
}

export const useCreatedTransactionsStore = create<CreatedTransactionsState>()(
  persist(
    (set) => ({
      transactions: [],
      addTransaction: (payload) => {
        const record: CreatedTransactionRecord = {
          id: `LOCAL_${Date.now()}`,
          createdAt: new Date().toISOString(),
          payload,
        }

        set((state) => ({
          transactions: [record, ...state.transactions],
        }))

        return record
      },
      clearTransactions: () => set({ transactions: [] }),
    }),
    {
      name: "created-transactions-store",
    }
  )
)
