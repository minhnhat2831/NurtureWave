import type { ColumnDef } from "@tanstack/react-table";
import type { helpDocumentListItem } from "../../schema/HelpDocumentSchema.type";
import { formatDateTime } from "@/utils/formatDateTime";
import { useHelpDocumentStore } from "../../store/useHelpDocumentStore";
import { TableActions } from "@/components/Table";


export const HelpDocumentColumns: ColumnDef<helpDocumentListItem>[] = [
  {
    accessorKey: "id",
    header: () => "ID"
  },
  {
    accessorKey: "title",
    header: () => "Title" 
  },
  {
    accessorKey: "status",
    header: () => "Status",
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
  },
  {
    accessorKey: "createdAt",
    header: () => "Created Date",
    cell: ({ getValue }) => {
      const date = getValue<string>()
      return <div>{formatDateTime(date)}</div>
    }
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => {
      const helpDocument = row.original
      const { setSelectedHelpDocument, setOpen, setTypeMode } = useHelpDocumentStore()
    
      const handleEdit = () => {
        setSelectedHelpDocument(helpDocument)
        setTypeMode("edit")
        setOpen(true)
      }

      const handleDelete = () => {
        setSelectedHelpDocument(helpDocument)
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
  },
]