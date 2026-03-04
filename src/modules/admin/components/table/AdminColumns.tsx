import type { ColumnDef } from "@tanstack/react-table"
import type { adminListItem } from "../../schema/AdminSchema.type"
import { TableActions } from "@/components/Table/TableActions"
import { useAdminStore } from "../../store/useAdminStore"

export const AdminColumns: ColumnDef<adminListItem>[] = [
    {
        accessorKey: "username",
        header: "Username",
    },
    {
        accessorKey: "firstName",
        header: "First Name",
    },
    {
        accessorKey: "lastName",
        header: "Last Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "role",
        header: "Role"
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
            const status = getValue<string>()
            return (
                <div className="flex items-center gap-2">
                    <span
                        className={`h-2 w-2 rounded-full ${status === "active" ? "bg-green-400" : "bg-gray-400"
                            }`}
                    ></span>
                    {status === "active" ? "Active" : "Inactive"}
                </div>
            )
        },
    },
    {
        id: "action",
        header: "Action",
        cell: ({ row }) => {
            const data = row.original
            const { setSelectedAdmin, setOpen, setTypeMode } = useAdminStore()
            const handleEdit = () => {
                setSelectedAdmin(data)
                setTypeMode('edit')
                setOpen(true)
            }
            const handleDelete = () => {
                setTypeMode('delete')
                setOpen(true)
                setSelectedAdmin(data)
            }
            return (
                <TableActions
                    onEdit={() => handleEdit()}
                    onDelete={() => handleDelete()}
                />
            )
        }
    }
]