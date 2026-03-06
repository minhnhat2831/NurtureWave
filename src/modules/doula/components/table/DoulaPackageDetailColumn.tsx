import type { ColumnDef } from "@tanstack/react-table"
import Avatar from "@mui/material/Avatar"
import { formatDateTime } from "@/utils/formatDateTime"
import type { caresListItem } from "../../schema/types/DoulaPackageSchema.type"

export const DoulaPackageDetailColumns: ColumnDef<caresListItem>[] = [
  {
    header: "Avatar",
    accessorKey: "user.picture.uri",
    cell: ({ getValue }) => {
      const img = getValue<string>()
      return img ? (
        <Avatar src={img} className="w-10 h-10" />
      ) : (
        <Avatar />
      )
    }
  },
  {
    header: "Full Name",
    accessorKey: "user.fullName"
  },
  {
    header: "Email",
    accessorKey: "user.email"
  },
  {
    header: "Start Day",
    accessorKey: "createdAt",
    cell: ({ getValue }) => {
      const date = getValue<string>()
      return <div>{formatDateTime(date)}</div>
    }
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ getValue }) => {
      const status = getValue<"active" | "inactive">()
      return (
        <div className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              status === "active" ? "bg-green-400" : "bg-gray-400"
            }`}
          />
          {status === "active" ? "Active" : "Inactive"}
        </div>
      )
    }
  }
]
