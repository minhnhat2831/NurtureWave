import type { ColumnDef } from "@tanstack/react-table";
import { formatDateTime } from "@/utils/formatDateTime";
import Avatar from "@mui/material/Avatar";
import type { doulaReviewListItem } from "../../schema/types/DoulaReviewSchema.type";
import { TableActions } from "@/components/Table";

export const DoulaReviewColumns: ColumnDef<doulaReviewListItem>[] = [
    {
        accessorKey: "user?.picture",
        header: "Avatar",
        cell: ({ getValue }) => {
            const avatar = getValue<string>()
            return avatar ? (
                <Avatar
                    src={avatar}
                    className="w-10 h-10 rounded-full"
                />
            ) : (
                <Avatar />
            );
        }
    },
    {
        accessorKey: "user?.fullName",
        header: "Full Name"
    },
    {
        accessorKey: "start",
        header: "Rating"
    },
    {
        accessorKey: "comment",
        header: "Comment"
    },
    {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ getValue }) => {
            const date = getValue<string>()
            return <div>{formatDateTime(date)}</div>
        }
    },
    {
        id: "action",
        header: "Action",
        cell: ({ }) => {
            return (
                <TableActions onView={() => {}} />
            )
        },
    }
]