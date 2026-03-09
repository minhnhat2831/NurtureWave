import type { ColumnDef } from '@tanstack/react-table'
import type { Voucher } from '../../schema/VoucherSchema.type'
import { StatusBadge, TableActions } from '@/components/common'
import { formatDateTime } from '@/utils/formatDateTime'

interface VoucherColumnsProps {
  onView: (id: string) => void
  onDelete: (id: string) => void
}

export const createVoucherColumns = ({
  onView,
  onDelete,
}: VoucherColumnsProps): ColumnDef<Voucher>[] => [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => (
      <div className="max-w-50">
        <span className="text-sm text-gray-600 font-mono break-all">
          {row.original.id}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'code',
    header: 'Code',
    cell: ({ row }) => (
      <div className="max-w-xs">
        <p className="text-gray-900">{row.original.code}</p>
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
    cell: ({ row }) => (
      <span className="text-gray-700">
        {formatDateTime(row.original.startDate)}
      </span>
    ),
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
    cell: ({ row }) => (
      <span className="text-gray-700">
        {formatDateTime(row.original.endDate)}
      </span>
    ),
  },
  {
    id: 'usage',
    header: 'Number Of Use',
    cell: ({ row }) => (
      <span className="text-gray-700">
        {row.original.numOfUsed}/{row.original.quantityUse}
      </span>
    ),
  },
  {
    id: 'actions',
    header: 'Action',
    cell: ({ row }) => (
      <TableActions
        onView={() => onView(row.original.id)}
        onDelete={() => onDelete(row.original.id)}
      />
    ),
  },
]

export const voucherSortableColumns = ['code', 'status', 'startDate', 'endDate']
