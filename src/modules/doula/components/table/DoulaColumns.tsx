import type { ColumnDef } from "@tanstack/react-table";
import { formatDateTime } from '@/utils/formatDateTime';
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router";
import type { doulaListItem } from "../../schema/types/DoulaSchema.type";
import { useDoulaStore } from "../../store/useDoulaStore";
import { TableActions } from "@/components/Table";
import { formatDate } from "@/utils/formatDate";

export const DoulaColumns: ColumnDef<doulaListItem>[] = [
    {
        accessorFn: (row) => row.picture?.uri ?? null,
        header: "Avatar",
        cell: ({ getValue }) => {
            const src = getValue<string | null>();
            return src ? (
                <Avatar src={src} className="w-10 h-10 rounded-full" />
            ) : (
                <Avatar />
            );
        },
    },
    {
        accessorKey: "user.fullName",
        header: "Full Name"
    },
    {
        accessorKey: "user.email",
        header: "Email"
    },
    {
        accessorKey: "user.phoneNumber",
        header: "Phone",
        cell: ({ getValue, row }) => {
            const phone = getValue<string>()
            const countryCode = row.original.user.countryCode
            return <div>{countryCode} {phone}</div>
        }
    },
    {
        accessorKey: "user.birthDate",
        header: "birthDate",
        cell: ({ getValue }) => {
            const bd = getValue<string>()
            return <div>{formatDate(bd)}</div>
        }
    },
    {
        accessorKey: "address.fullAddress",
        header: "Address"
    },
    {
        accessorKey: "createdAt",
        header: () => "CreatedAt",
        cell: ({ getValue }) => {
            const createdAt = getValue<Date>()
            return <div>{formatDateTime(createdAt)}</div>
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
        },
    },
    {
        id: "action",
        header: "Action",
        cell: ({ row }) => {
            const doula = row.original
            const nav = useNavigate()
            const { setSelectedDoula, setOpen, setTypeMode } = useDoulaStore()

            const handleView = () => {
                setSelectedDoula(doula)
                nav(`/doula-management/${doula.id}`)
            }

            const handleEdit = () => {
                setSelectedDoula(doula)
                setTypeMode("edit")
                setOpen(true)
            }

            const handleDelete = () => {
                setSelectedDoula(doula)
                setTypeMode("delete")
                setOpen(true)
            }

            return (
                <TableActions
                    onView={() => handleView()}
                    onEdit={() => handleEdit()}
                    onDelete={() => handleDelete()}
                />
            )
        },
    },
]