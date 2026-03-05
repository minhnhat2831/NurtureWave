import type { ColumnDef } from "@tanstack/react-table";
import { formatDateTime } from "@/utils/formatDateTime";
import type { doulaPackageListItem } from "../../schema/types/DoulaPackageSchema.type";
import { TableActions } from "@/components/Table";
import { useNavigate } from "react-router";

export const DoulaPackageColumns: ColumnDef<doulaPackageListItem>[] = [
  {
    accessorKey: "name",
    header: "Package Name",
    cell: ({ getValue }) => {
      const name = getValue<string>()
      return <div
        dangerouslySetInnerHTML={{
          __html: name || ""
        }}
      />
    }
  },
  {
    accessorKey: "picture.uri",
    header: "Cover photo",
    cell: ({ getValue }) => {
      const img = getValue<string>()
      return <div><img className="w-10 h-10" src={img} alt={"Pic" + { img }}></img></div>
    }
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ getValue }) => {
      const price = getValue<string>()
      return <div
        dangerouslySetInnerHTML={{
          __html: price || ""
        }}
      />
    }
  },
  {
    accessorKey: "createdAt",
    header: "Created date",
    cell: ({ getValue }) => {
      const createdAt = getValue<string>()
      return <div>{formatDateTime(createdAt)}</div>
    }
  },
  {
    accessorKey: "numberOfClients",
    header: "Number of Clients"
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => {
      const doula = row.original
      const nav = useNavigate()
      const handledView = () => {
         nav(`/package/${doula.id}`)
      }
      return (
        <TableActions onView={() => handledView()} />
      )
    },
  }
]