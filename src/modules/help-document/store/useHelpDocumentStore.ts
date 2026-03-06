import { create } from "zustand"
import type { helpDocumentListItem } from "../schema/HelpDocumentSchema.type"

type Mode = "create" | "edit" | "delete"
interface HelpDocumentStore {
    open : boolean,
    setOpen: (value: boolean) => void
    typeMode: Mode
    setTypeMode: (typeMode: Mode) => void
    selectedHelpDocument: helpDocumentListItem | null,
    setSelectedHelpDocument: (hd: helpDocumentListItem) => void
}

export const useHelpDocumentStore = create<HelpDocumentStore>((set) => ({
    open: false,
    typeMode: "create",
    setOpen: (open) => set({ open }),
    setTypeMode: (typeMode) => set({ typeMode }),
    selectedHelpDocument: null,
    setSelectedHelpDocument: (hd) => set({ selectedHelpDocument: hd }),
}))

