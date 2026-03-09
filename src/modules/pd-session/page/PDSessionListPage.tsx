import { useEffect, useMemo, useCallback } from 'react'
import { DataTable, SearchFilterBar, Button } from '@/components/common'
import { useTableManager } from '@/hooks/useTableManager'
import { getPDSessions } from '../api/api'
import { PDSessionFormModal } from '../components/modal/PDSessionFormModal'
import PDSessionDelete from '../components/modal/PDSessionDelete'
import { createPDSessionColumns } from '../components/table/PDSessionColumns'
import type { PDSession } from '../schema/PDSessionSchema.type'
import { useHeader } from '@/hooks/useHeaderContext'
import { usePDSessionModalStore } from '../store'
import 'react-toastify/dist/ReactToastify.css'

/**
 * PD SESSION LIST PAGE
 * Main page for PD Session management with CRUD operations
 */
export default function PDSessionListPage() {
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
    queryKey: ['pd-sessions'],
    queryFn: async (params) => {
      const response = await getPDSessions(params)
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
    selectedPDSession,
    openFormModal,
    closeFormModal,
    openDeleteModal,
  } = usePDSessionModalStore()

  // Handlers with useCallback
  const handleEdit = useCallback((pdSession: PDSession) => {
    openFormModal(pdSession)
  }, [openFormModal])

  const handleDeleteClick = useCallback((pdSession: PDSession) => {
    openDeleteModal(pdSession)
  }, [openDeleteModal])

  // Set header content
  useEffect(() => {
    setHeaderContent({
      title: 'PD Session',
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
          Create PD Session
        </Button>
      ),
    })

    return () => {
      setHeaderContent({})
    }
  }, [search, setHeaderContent, setSearch, openFormModal])

  // Table columns definition with useMemo
  const columns = useMemo(() => createPDSessionColumns({
    onEdit: handleEdit,
    onDelete: handleDeleteClick,
  }), [handleEdit, handleDeleteClick])

  // Sortable columns
  const sortableColumns = ['title', 'author', 'status', 'createdAt']

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
      <PDSessionFormModal
        isOpen={showFormModal}
        onClose={closeFormModal}
        pdSession={selectedPDSession}
        onSuccess={closeFormModal}
      />

      {/* Delete Modal */}
      <PDSessionDelete />
    </div>
  )
}
