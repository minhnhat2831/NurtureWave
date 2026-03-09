import { type ColumnDef } from '@tanstack/react-table'
import { StatusBadge, TableActions } from '@/components/common'
import { formatDateTime } from '@/utils/formatDateTime'
import { getPictureUrl } from '@/utils/imageHelpers'
import type { Category } from '../../schema/CategorySchema.type'

interface CreateCategoryColumnsOptions {
  onEdit: (category: Category) => void
  onDelete: (category: Category) => void
}

export const createCategoryColumns = ({
  onEdit,
  onDelete,
}: CreateCategoryColumnsOptions): ColumnDef<Category>[] => [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <div className="max-w-xs">
        <p className="text-gray-900">{row.original.name}</p>
      </div>
    ),
  },
  {
    accessorKey: 'picture',
    header: 'Image',
    cell: ({ row }) => {
      const pictureUrl = getPictureUrl(row.original.picture)
      return row.original.picture ? (
        <img 
          src={pictureUrl} 
          alt={row.original.name}
          className="w-12 h-12 object-cover rounded"
        />
      ) : (
        <span className="text-gray-400">-</span>
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    accessorKey: 'createdAt',
    header: 'Created Date',
    cell: ({ row }) => (
      <span className="text-gray-700">{formatDateTime(row.original.createdAt)}</span>
    ),
  },
  {
    id: 'actions',
    header: 'Action',
    cell: ({ row }) => (
      <TableActions
        showView={false}
        onEdit={() => onEdit(row.original)}
        onDelete={() => onDelete(row.original)}
      />
    ),
  },
]
