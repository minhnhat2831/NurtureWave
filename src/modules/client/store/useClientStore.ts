import { create } from "zustand"
import type { clientListItem } from "../schema/types/ClientSchema.type"

type Mode = "edit" | "delete"
interface DoulaStore {
    open : boolean,
    setOpen: (value: boolean) => void
    typeMode: Mode
    setTypeMode: (typeMode: Mode) => void
    selectedClient: clientListItem | null,
    setSelectedClient: (client: clientListItem) => void
}

export const useClientStore = create<DoulaStore>((set) => ({
    open: false,
    typeMode: "edit",
    setOpen: (open) => set({ open }),
    setTypeMode: (typeMode) => set({ typeMode }),
    selectedClient: null,
    setSelectedClient: (client) => set({ selectedClient: client }),
}))

