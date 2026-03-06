import type { ColumnDef } from "@tanstack/react-table";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router";
import type { clientListItem } from "../../schema/types/ClientSchema.type";
import { formatDate } from "@/utils/formatDate";
import { formatDateTime } from "@/utils/formatDateTime";
import { TableActions } from "@/components/Table";
import { useClientStore } from "../../store/useClientStore";

export const ClientColumns: ColumnDef<clientListItem>[] = [
    {
        accessorFn: (row) => row.picture?.uri ?? null,
        header: "Avatar",
        cell: ({ getValue }) => {
            const src = getValue() as string | null;

            return src ? (
                <Avatar
                    src={src}
                    className="w-10 h-10 rounded-full"
                />
            ) : (
                <Avatar />
            );
        },
    },
    {
        accessorKey: "firstName",
        header: "Full Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phoneNumber",
        header: "Phone",
        cell: ({ getValue, row }) => {
            const client = row.original
            const phone = getValue<string>()
            const countryCode = client.countryCode
            return <div>{countryCode} {phone}</div>
        }
    },
    {
        accessorKey: "birthDate",
        header: "birthDate",
        cell: ({ getValue }) => {
            const birthday = getValue<string>()
            return <div>{formatDate(birthday)}</div>
        }
    },
    {
        accessorFn: (row) => row.address?.fullAddress ?? null,
        header: "Address"
    },
    {
        accessorKey: "createdAt",
        header: "CreatedAt",
        cell: ({ getValue }) => {
            const createdAt = getValue<Date>()
            return <div>{formatDateTime(createdAt)}</div>
        }
    },
    {
        accessorKey: "status",
        header: "status",
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
            const client = row.original;
            const nav = useNavigate();
            const { setSelectedClient, setOpen, setTypeMode } = useClientStore();

            const handleView = () => {
                setSelectedClient(client)
                nav(`/client-management/${client.id}`)
            }

            const handleEdit = () => {
                setSelectedClient(client)
                setTypeMode("edit")
                setOpen(true)
            }

            const handleDelete = () => {
                setSelectedClient(client)
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