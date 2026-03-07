import { useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { type ColumnDef } from '@tanstack/react-table';
import {
  StatusBadge,
  DataTable,
  SearchFilterBar,
  TableActions,
  Button,
} from '@/components/common';
import { useVoucherList } from '../hook/useVoucherList';
import { VoucherFormModal } from './VoucherFormModal';
import type { Voucher } from '../schema/VoucherSchema.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteVouchers } from '../api/api';
import { toast } from 'react-toastify';
import { useHeader } from '@/hooks/useHeaderContext';
import { formatDateTime } from '@/utils/formatDateTime';
import { useVoucherModalStore } from '../store/voucherModalStore';
import { useGlobalModalStore } from '@/stores';
import 'react-toastify/dist/ReactToastify.css';

/**
 * VOUCHER LIST PAGE
 * Main page for voucher management with CRUD operations
 */
export default function VoucherListPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setHeaderContent } = useHeader();

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
  } = useVoucherList();

  // Modal states from zustand
  const { showConfirm, closeConfirm, setConfirmLoading } =
    useGlobalModalStore();

  const {
    showFormModal,
    openFormModal,
    closeFormModal,
  } = useVoucherModalStore();

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (ids: string[]) => deleteVouchers(ids),
    onSuccess: () => {
      toast.success('Voucher deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['vouchers'] });
      setConfirmLoading(false);
      closeConfirm();
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Failed to delete voucher');
      setConfirmLoading(false);
      closeConfirm();
    },
  });

  // Handlers with useCallback
  const handleDeleteClick = useCallback(
    (id: string) => {
      showConfirm({
        title: 'Delete Voucher',
        message:
          'Are you sure you want to delete this voucher? This action cannot be undone.',
        variant: 'danger',
        confirmText: 'Delete',
        onConfirm: () => {
          setConfirmLoading(true);
          deleteMutation.mutate([id]);
        },
      });
    },
    [showConfirm, setConfirmLoading, deleteMutation]
  );

  const handleViewClick = useCallback(
    (id: string) => {
      navigate(`/vouchers/${id}`);
    },
    [navigate]
  );

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
    });

    return () => {
      setHeaderContent({});
    };
  }, [search, setHeaderContent, setSearch, openFormModal]);

  // Table columns definition with useMemo
  const columns = useMemo<ColumnDef<Voucher>[]>(
    () => [
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
            onView={() => handleViewClick(row.original.id)}
            onDelete={() => handleDeleteClick(row.original.id)}
          />
        ),
      },
    ],
    [handleViewClick, handleDeleteClick]
  );

  // Sortable columns
  const sortableColumns = ['code', 'status', 'startDate', 'endDate'];

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
        sortableColumns={sortableColumns}
        isLoading={isLoading}
      />

      {/* Create Modal */}
      <VoucherFormModal
        isOpen={showFormModal}
        onClose={closeFormModal}
        onSuccess={closeFormModal}
      />
    </div>
  );
}
