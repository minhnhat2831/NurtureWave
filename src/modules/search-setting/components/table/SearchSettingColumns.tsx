import type { ColumnDef } from "@tanstack/react-table";
import type { searchSettingListItem } from "../../schema/SearchSettingSchema.type";
import { formatDateTime } from "@/utils/formatDateTime";
import { useSearchSettingStore } from "../../store/useSearchSettingStore";
import { TableActions } from "@/components/Table";

export const SearchSettingColumns: ColumnDef<searchSettingListItem>[] = [
    {
        accessorKey: "id",
        header: "ID"
    },
    {
        accessorKey: "keyword",
        header: "Text"
    },
    {
        accessorKey: "count",
        header: "Times"
    },
    {
        accessorKey: "createdAt",
        header: "Created Date",
        cell: ({ getValue }) => {
            const date = getValue<string>()
            return <div>{formatDateTime(date)}</div>
        }
    },
    {
        id: "action",
        header: "Action",
        cell: ({ row }) => {
            const searchSetting = row.original
            const { setSelectedSearchSetting, setOpen, setTypeMode } = useSearchSettingStore()

            const handleEdit = () => {
                setSelectedSearchSetting(searchSetting)
                setTypeMode("edit")
                setOpen(true)
            }

            const handleDelete = () => {
                setSelectedSearchSetting(searchSetting)
                setTypeMode("delete")
                setOpen(true)
            }

            return (
                <TableActions 
                    onEdit={() => handleEdit()}
                    onDelete={() => handleDelete()}
                />
            )
        },
    }
]