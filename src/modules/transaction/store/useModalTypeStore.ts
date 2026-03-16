import { create } from "zustand"
import type { cashTransactionList } from "../schema/TransactionCreateFormSchema"

type Type = "Create" | "View" | 'Edit'
interface ModalStoreState {
    open: boolean
    setOpen: (value: boolean) => void
    typeOpen: Type
    setTypeOpen:(typeOpen: Type) => void
    selectedData: cashTransactionList  | null,
    setSelectedData: (cashTransaction: cashTransactionList) => void
}

export const useModalTypeStore = create<ModalStoreState>((set) => ({
    open: true,
    typeOpen: "Create",
    setOpen: (open) => set({ open }),
    setTypeOpen: (typeOpen) => set({ typeOpen }),
    selectedData: null,
    setSelectedData: (cashTransaction) => set(() => ({ selectedData: cashTransaction }))
}))