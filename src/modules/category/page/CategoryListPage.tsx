import { useEffect, useMemo, useCallback } from 'react'
import { DataTable, SearchFilterBar, Button } from '@/components/common'
import { useTableManager } from '@/hooks/useTableManager'
import { getCategories } from '../api/api'
import { CategoryFormModal } from '../components/modal/CategoryFormModal'
import CategoryDelete from '../components/modal/CategoryDelete'
import { createCategoryColumns } from '../components/table/CategoryColumns'
import type { Category } from '../schema/CategorySchema.type'
import { useHeader } from '@/hooks/useHeaderContext'
import { useCategoryModalStore } from '../store'
import 'react-toastify/dist/ReactToastify.css'

/**
 * CATEGORY LIST PAGE
 * Main page for category management with CRUD operations
 */
export default function CategoryListPage() {
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
    queryKey: ['categories'],
    queryFn: async (params) => {
      const response = await getCategories(params)
      return {
        data: response.data,
        metadata: response.metadata
      }
    },
    defaultLimit: 10,
  })

  // Modal states from zustand
  const {
    showFormModal,
    selectedCategory,
    openFormModal,
    closeFormModal,
    openDeleteModal,
  } = useCategoryModalStore()

  // Handlers with useCallback
  const handleEdit = useCallback((category: Category) => {
    openFormModal(category)
  }, [openFormModal])

  const handleDeleteClick = useCallback((category: Category) => {
    openDeleteModal(category)
  }, [openDeleteModal])

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
  const columns = useMemo(() => createCategoryColumns({
    onEdit: handleEdit,
    onDelete: handleDeleteClick,
  }), [handleEdit, handleDeleteClick])

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

      {/* Delete Modal */}
      <CategoryDelete />
    </div>
  )
}
