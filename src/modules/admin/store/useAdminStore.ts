import { create } from "zustand"
import type { adminListItem } from "../schema/AdminSchema.type"

type Mode = "create" | "edit" | "delete"
interface AdminStore {
    open : boolean,
    setOpen: (value: boolean) => void
    typeMode: Mode
    setTypeMode: (typeMode: Mode) => void
    selectedAdmin: adminListItem | null,
    setSelectedAdmin: (admin: adminListItem) => void
}

export const useAdminStore = create<AdminStore>((set) => ({
    open: false,
    typeMode: "create",
    setOpen: (open) => set({ open }),
    setTypeMode: (typeMode) => set({ typeMode }),
    selectedAdmin: null,
    setSelectedAdmin: (admin) => set({ selectedAdmin: admin }),
}))

