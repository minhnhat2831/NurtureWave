import { useEffect, useMemo, useCallback } from 'react'
import { type ColumnDef } from '@tanstack/react-table'
import { StatusBadge, DataTable, SearchFilterBar, TableActions, Button } from '@/components/common'
import { useCategoryList } from '../hook/useCategoryList'
import { CategoryFormModal } from './CategoryFormModal'
import type { Category } from '../schema/CategorySchema.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCategories } from '../api/api'
import { toast } from 'react-toastify'
import { useHeader } from '@/hooks/useHeaderContext'
import { formatDateTime } from '@/utils/formatDateTime'
import { useCategoryModalStore } from '../store'
import { useGlobalModalStore } from '@/stores'
import { getPictureUrl } from '@/utils/imageHelpers'
import 'react-toastify/dist/ReactToastify.css'

/**
 * CATEGORY LIST PAGE
 * Main page for category management with CRUD operations
 */
export default function CategoryListPage() {
  const queryClient = useQueryClient()
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
  } = useCategoryList()

  // Modal states from zustand
  const {
    showFormModal,
    selectedCategory,
    openFormModal,
    closeFormModal,
  } = useCategoryModalStore()

  const { showConfirm, closeConfirm, setConfirmLoading } = useGlobalModalStore()

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (ids: string[]) => deleteCategories(ids),
    onSuccess: () => {
      toast.success('Category deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      setConfirmLoading(false)
      closeConfirm()
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } }
      toast.error(err.response?.data?.message || 'Failed to delete category')
      setConfirmLoading(false)
      closeConfirm()
    },
  })

  // Handlers with useCallback
  const handleEdit = useCallback((category: Category) => {
    openFormModal(category)
  }, [openFormModal])

  const handleDeleteClick = useCallback((id: string) => {
    showConfirm({
      title: 'Delete Category',
      message: 'Are you sure you want to delete this category? This action cannot be undone.',
      variant: 'danger',
      confirmText: 'Delete',
      onConfirm: () => {
        setConfirmLoading(true)
        deleteMutation.mutate([id])
      },
    })
  }, [showConfirm, setConfirmLoading, deleteMutation])

  // Set header content
  useEffect(() => {
    setHeaderContent({
      title: 'Category',
      searchBar: (
        <SearchFilterBar
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search"
          className="flex-1 mb-0"
        />
      ),
      actions: (
        <Button onClick={() => openFormModal()} variant="primary">
          Create Category
        </Button>
      ),
    })

    return () => {
      setHeaderContent({})
    }
  }, [search, setHeaderContent, setSearch, openFormModal])

  // Table columns definition with useMemo
  const columns = useMemo<ColumnDef<Category>[]>(() => [
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
          onEdit={() => handleEdit(row.original)}
          onDelete={() => handleDeleteClick(row.original.id)}
        />
      ),
    },
  ], [handleEdit, handleDeleteClick])

  // Sortable columns
  const sortableColumns = ['name', 'status', 'createdAt']

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

      {/* Create/Edit Modal */}
      <CategoryFormModal
        isOpen={showFormModal}
        onClose={closeFormModal}
        category={selectedCategory}
        onSuccess={closeFormModal}
      />
    </div>
  )
}
