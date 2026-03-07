import { create } from "zustand"
import type { searchSettingListItem } from "../schema/SearchSettingSchema.type"

type Mode = "create" | "edit" | "delete"
interface SearchSettingStore {
    open : boolean,
    setOpen: (value: boolean) => void
    typeMode: Mode
    setTypeMode: (typeMode: Mode) => void
    selectedSearchSetting: searchSettingListItem | null,
    setSelectedSearchSetting: (ss: searchSettingListItem) => void
}

export const useSearchSettingStore = create<SearchSettingStore>((set) => ({
    open: false,
    typeMode: "create",
    setOpen: (open) => set({ open }),
    setTypeMode: (typeMode) => set({ typeMode }),
    selectedSearchSetting: null,
    setSelectedSearchSetting: (ss) => set({ selectedSearchSetting: ss }),
}))

