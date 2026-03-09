import type { ColumnDef } from '@tanstack/react-table'
import type { PDSession } from '../../schema/PDSessionSchema.type'
import { StatusBadge, TableActions } from '@/components/common'
import { formatDateTime } from '@/utils/formatDateTime'

interface PDSessionColumnsProps {
  onEdit: (pdSession: PDSession) => void
  onDelete: (pdSession: PDSession) => void
}

export const createPDSessionColumns = ({
  onEdit,
  onDelete,
}: PDSessionColumnsProps): ColumnDef<PDSession>[] => [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => (
      <div className="max-w-50">
        <span className="text-sm text-gray-600 font-mono break-all">{row.original.id}</span>
      </div>
    ),
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => (
      <div className="max-w-xs">
        <p className="text-gray-900">{row.original.title}</p>
      </div>
    ),
  },
  {
    accessorKey: 'author',
    header: 'Author',
    cell: ({ row }) => <span className="text-gray-700">{row.original.author}</span>,
  },
  {
    accessorKey: 'categoryId',
    header: 'Category',
    cell: ({ row }) => (
      <span className="text-gray-700">
        {row.original.categoryId || '-'}
      </span>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Created Date',
    cell: ({ row }) => (
      <span className="text-gray-700">{formatDateTime(row.original.createdAt)}</span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    id: 'actions',
    header: 'Action',
    cell: ({ row }) => (
      <TableActions
        onEdit={() => onEdit(row.original)}
        onDelete={() => onDelete(row.original)}
      />
    ),
  },
]
