import { useState, useEffect } from 'react'
import { type ColumnDef } from '@tanstack/react-table'
import { StatusBadge, DataTable, SearchFilterBar, TableActions, ConfirmModal, Button } from '@/components/common'
import { useArticleList } from '../hook/useArticleList'
import { ArticleFormModal } from './ArticleFormModal'
import type { Article } from '../schema/ArticleSchema.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteArticles } from '../api/api'
import { toast, ToastContainer } from 'react-toastify'
import { useHeader } from '@/hooks/useHeaderContext'
import { formatDateTime } from '@/utils/formatDateTime'
import 'react-toastify/dist/ReactToastify.css'

/**
 * ARTICLE LIST PAGE
 * Main page for article management with CRUD operations
 */
export default function ArticleListPage() {
  const queryClient = useQueryClient()
  const { setHeaderContent } = useHeader()

  // Table data & pagination
  const {
    data,
    metadata,
    page,
    limit,
    search,
    setPage,
    setLimit,
    setSearch,
    isLoading,
  } = useArticleList()

  // Modal states
  const [showFormModal, setShowFormModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null)

  // Handlers
  const handleCreate = () => {
    setSelectedArticle(null)
    setShowFormModal(true)
  }

  // Set header content
  useEffect(() => {
    setHeaderContent({
      title: 'Article',
      searchBar: (
        <SearchFilterBar
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search"
          className="flex-1 mb-0"
        />
      ),
      actions: (
        <Button onClick={handleCreate} variant="primary">
          Create Article
        </Button>
      ),
    })

    return () => {
      setHeaderContent({})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, setHeaderContent])

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (ids: string[]) => deleteArticles(ids),
    onSuccess: () => {
      toast.success('Article deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['articles'] })
      setShowDeleteModal(false)
      setArticleToDelete(null)
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } }
      toast.error(err.response?.data?.message || 'Failed to delete article')
    },
  })

  const handleEdit = (article: Article) => {
    setSelectedArticle(article)
    setShowFormModal(true)
  }

  const handleDeleteClick = (id: string) => {
    setArticleToDelete(id)
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = () => {
    if (articleToDelete) {
      deleteMutation.mutate([articleToDelete])
    }
  }

  const handleFormSuccess = () => {
    setShowFormModal(false)
    setSelectedArticle(null)
  }

  // Table columns definition
  const columns: ColumnDef<Article>[] = [
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
          onEdit={() => handleEdit(row.original)}
          onDelete={() => handleDeleteClick(row.original.id)}
        />
      ),
    },
  ]

  return (
    <div className="space-y-4">
      <ToastContainer />

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
        isLoading={isLoading}
      />

      {/* Create/Edit Modal */}
      <ArticleFormModal
        isOpen={showFormModal}
        onClose={() => {
          setShowFormModal(false)
          setSelectedArticle(null)
        }}
        article={selectedArticle}
        onSuccess={handleFormSuccess}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false)
          setArticleToDelete(null)
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Article"
        message="Are you sure you want to delete this article? This action cannot be undone."
        confirmText="Delete"
        variant="danger"
        isLoading={deleteMutation.isPending}
      />
    </div>
  )
}
