import type { ColumnDef } from '@tanstack/react-table'
import type { VoucherUsage } from '../../schema/VoucherSchema.type'
import { formatDate } from '@/utils/formatDate'

export const createVoucherUsageColumns = (): ColumnDef<VoucherUsage>[] => [
  {
    accessorKey: 'takenBy',
    header: 'Take by',
    cell: ({ row }) => (
      <span className="text-gray-900">
        {row.original.takenBy || '-'}
      </span>
    ),
  },
  {
    accessorKey: 'takenDate',
    header: 'Date',
    cell: ({ row }) => (
      <span className="text-gray-900">
        {formatDate(row.original.takenDate)}
      </span>
    ),
  },
]

export const voucherUsageSortableColumns = ['takenBy']
