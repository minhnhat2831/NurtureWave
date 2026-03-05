import { create } from "zustand"
import type { doulaListItem } from "../schema/types/DoulaSchema.type"

type Mode = "edit" | "delete"
interface DoulaStore {
    open : boolean,
    setOpen: (value: boolean) => void
    typeMode: Mode
    setTypeMode: (typeMode: Mode) => void
    selectedDoula: doulaListItem | null,
    setSelectedDoula: (doula: doulaListItem) => void
}

export const useDoulaStore = create<DoulaStore>((set) => ({
    open: false,
    typeMode: "edit",
    setOpen: (open) => set({ open }),
    setTypeMode: (typeMode) => set({ typeMode }),
    selectedDoula: null,
    setSelectedDoula: (doula) => set({ selectedDoula: doula }),
}))

