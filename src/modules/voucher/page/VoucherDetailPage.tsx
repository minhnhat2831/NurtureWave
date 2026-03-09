import { useParams, useNavigate } from 'react-router'
import { useEffect, useState, useMemo } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useVoucherDetail } from '../hook/useVoucherDetail'
import { Button, InfoField, DataTable } from '@/components/common'
import { useHeader } from '@/hooks/useHeaderContext'
import { createVoucherUsageColumns, voucherUsageSortableColumns } from '../components/table/VoucherUsageColumns'
import { formatDate } from '@/utils/formatDate'

/**
 * VOUCHER DETAIL PAGE
 * Displays voucher information
 */
export default function VoucherDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { setHeaderContent } = useHeader()
  const [usageSort, setUsageSort] = useState('takenBy')

  const {
    voucher,
    usageHistory,
    metadata,
    page,
    limit,
    setPage,
    setLimit,
    isLoading,
    error,
  } = useVoucherDetail(id!)

  // Set header
  useEffect(() => {
    setHeaderContent({
      title: `Voucher / ${voucher?.code || id}`,
      actions: (
        <Button
          onClick={() => navigate(-1)}
          variant="secondary"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      ),
    })

    return () => {
      setHeaderContent({})
    }
  }, [voucher?.code, id, navigate, setHeaderContent])

  // Usage history table columns with useMemo
  const usageColumns = useMemo(() => createVoucherUsageColumns(), [])

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">Error loading voucher details</div>
      </div>
    )
  }

  // Show not found only after loading is complete and no voucher
  if (!isLoading && !voucher) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Voucher not found</div>
      </div>
    )
  }

  // Don't render if still no data
  if (!voucher) return null

  return (
    <div className="space-y-6">
      {/* Voucher Information Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Voucher Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <InfoField label="Code" value={voucher.code} />
          <InfoField label="Start Date" value={formatDate(voucher.startDate)} />
          <InfoField label="End Date" value={formatDate(voucher.endDate)} />
          <InfoField label="Number Of Use" value={`${voucher.numOfUsed}/${voucher.quantityUse}`} />
          <InfoField label="Type of coupon" value={voucher.type} />
          <InfoField 
            label="Amount" 
            value={voucher.type === 'percentage' ? `%${voucher.amount}` : `$${voucher.amount}`}
          />
          <InfoField label="Condition" value={`$${voucher.minPayAmount}`} />
          <InfoField 
            label="Max Discount Amount" 
            value={voucher.maxDiscountAmount ? `$${voucher.maxDiscountAmount}` : undefined}
          />
        </div>

        {/* Description */}
        <InfoField label="Description" value={voucher.description} className="mt-6" />
      </div>

      {/* Usage History Table */}
      <DataTable
        columns={usageColumns}
        data={usageHistory}
        pageIndex={page - 1}
        pageSize={limit}
        totalPages={metadata?.totalPages || 1}
        totalItems={metadata?.totalCount || usageHistory.length}
        onPageChange={(newPage) => setPage(newPage + 1)}
        onPageSizeChange={setLimit}
        currentSort={usageSort}
        onSortChange={setUsageSort}
        sortableColumns={voucherUsageSortableColumns}
        isLoading={isLoading}
      />
    </div>
  )
}
