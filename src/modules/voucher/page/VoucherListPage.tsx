import { useEffect, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router'
import { DataTable, SearchFilterBar, Button } from '@/components/common'
import { useTableManager } from '@/hooks/useTableManager'
import { getVouchers, deleteVoucher } from '../api/api'
import { VoucherFormModal } from '../components/modal/VoucherFormModal'
import { createVoucherColumns, voucherSortableColumns } from '../components/table/VoucherColumns'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useHeader } from '@/hooks/useHeaderContext'
import { useVoucherModalStore } from '../store/voucherModalStore'
import { useGlobalModalStore } from '@/stores'
import 'react-toastify/dist/ReactToastify.css'

/**
 * VOUCHER LIST PAGE
 * Main page for voucher management with CRUD operations
 */
export default function VoucherListPage() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { setHeaderContent } = useHeader()

  // Table data & pagination
  const {
    data,
    metadata,
    page,
    limit,
    search,
    sort,
    setPage,
    setLimit,
    setSearch,
    setSort,
    isLoading,
  } = useTableManager({
    queryKey: ['vouchers'],
    queryFn: async (params) => {
      const response = await getVouchers(params)
      return {
        data: response.data,
        metadata: response.metadata
      }
    },
    defaultLimit: 10,
  })

  // Modal states from zustand
  const { showConfirm, closeConfirm, setConfirmLoading } = useGlobalModalStore()
  const { showFormModal, openFormModal, closeFormModal } = useVoucherModalStore()

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteVoucher(id),
    onSuccess: () => {
      toast.success('Voucher deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['vouchers'] })
      setConfirmLoading(false)
      closeConfirm()
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } }
      toast.error(err.response?.data?.message || 'Failed to delete voucher')
      setConfirmLoading(false)
      closeConfirm()
    },
  })

  // Handlers with useCallback
  const handleDeleteClick = useCallback(
    (id: string) => {
      showConfirm({
        title: 'Delete Voucher',
        message: 'Are you sure you want to delete this voucher? This action cannot be undone.',
        variant: 'danger',
        confirmText: 'Delete',
        onConfirm: () => {
          setConfirmLoading(true)
          deleteMutation.mutate(id)
        },
      })
    },
    [showConfirm, setConfirmLoading, deleteMutation]
  )

  const handleViewClick = useCallback(
    (id: string) => {
      navigate(`/vouchers/${id}`)
    },
    [navigate]
  )

  // Set header content
  useEffect(() => {
    setHeaderContent({
      title: 'Voucher',
      searchBar: (
        <SearchFilterBar
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search by code"
          className="flex-1 mb-0"
        />
      ),
      actions: (
        <Button onClick={() => openFormModal()} variant="primary">
          Create Voucher
        </Button>
      ),
    })

    return () => {
      setHeaderContent({})
    }
  }, [search, setHeaderContent, setSearch, openFormModal])

  // Table columns definition with useMemo
  const columns = useMemo(
    () => createVoucherColumns({
      onView: handleViewClick,
      onDelete: handleDeleteClick,
    }),
    [handleViewClick, handleDeleteClick]
  )

  return (
    <div className="space-y-4">

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={data}
        pageIndex={page - 1}
        pageSize={limit}
        totalPages={metadata?.totalPages || 0}
        totalItems={metadata?.totalCount || 0}
        onPageChange={(newPage) => setPage(newPage + 1)}
        onPageSizeChange={setLimit}
        currentSort={sort}
        onSortChange={setSort}
        sortableColumns={voucherSortableColumns}
        isLoading={isLoading}
      />

      {/* Create Modal */}
      <VoucherFormModal
        isOpen={showFormModal}
        onClose={closeFormModal}
        onSuccess={closeFormModal}
      />
    </div>
  )
}
