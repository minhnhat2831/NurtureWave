import type { ColumnDef } from "@tanstack/react-table";
import type { caresListItem } from "../../schema/types/CareSchema.type";
import { formatDateTime } from "@/utils/formatDateTime";
import { useNavigate } from "react-router";

export const CareColumns: ColumnDef<caresListItem>[] = [
    {
        accessorFn: (row) => row.doula?.title ?? null,
        header: "Package Name"
    },
    {
        accessorFn: (row) => row.doula?.user?.fullName ?? null,
        header: "Doulas Full Name",
        cell: ({ getValue, row }) => {
            const id = row.original.doulaId
            const nav = useNavigate()
            const link = getValue<string>()
            return (
                <div>
                    <p className="text-blue-500 cursor-pointer" onClick={() => nav(`/doula-management/${id}`)}>{link}</p>
                </div>)
        }
    },
    {
        accessorKey: "startDate",
        header: "StartDate",
        cell: ({ getValue }) => {
            const date = getValue<string>()
            return <div>{formatDateTime(date)}</div>
        }
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
        }
    }
]