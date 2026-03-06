import { useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { FormInput, FormTextArea, FormSelect, FormNumberInput, Button, ImageUploader, ConfirmModal } from '@/components/common'
import { useCreateArticleForm, useEditArticleForm } from '../hook/useArticleForm'
import { useArticleFormOptions, ARTICLE_STATUS_OPTIONS } from '../constants/formOptions'
import { getPictureUrl } from '@/utils/imageHelpers'
import { uploadFileToS3 } from '@/services/uploadService'
import type { Article } from '../schema/ArticleSchema.type'
import type { UseFormReturn } from 'react-hook-form'

interface ArticleFormModalProps {
  isOpen: boolean
  onClose: () => void
  article: Article | null
  onSuccess: () => void
}

/**
 * ARTICLE FORM MODAL
 * Handles both Create and Edit modes
 */
export const ArticleFormModal = ({
  isOpen,
  onClose,
  article,
  onSuccess,
}: ArticleFormModalProps) => {
  if (!isOpen) return null

  return article ? (
    <EditArticleForm article={article} onClose={onClose} onSuccess={onSuccess} />
  ) : (
    <CreateArticleForm onClose={onClose} onSuccess={onSuccess} />
  )
}

/**
 * SHARED: Modal Wrapper
 */
const ModalWrapper = ({
  title,
  onClose,
  isLoading,
  children,
}: {
  title: string
  onClose: () => void
  isLoading: boolean
  children: React.ReactNode
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-end">
    <div className="absolute inset-0 bg-black/50" onClick={isLoading ? undefined : onClose} />
    <div className="relative bg-white shadow-xl w-full max-w-xl h-full overflow-y-auto">
      <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <button
          onClick={onClose}
          disabled={isLoading}
          className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 rounded-md transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      {children}
    </div>
  </div>
)

/**
 * SHARED: Form Fields
 */
const ArticleFormFields = ({
  method,
  isLoading,
  isEdit,
  article,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  method: UseFormReturn<any>
  isLoading: boolean
  isEdit: boolean
  article?: Article
}) => {
  const { categoryOptions, loadingCategories } = useArticleFormOptions()

  return (
    <>
      <FormInput name="title" label="Title" placeholder="Title" required disabled={isLoading} />
      
      {!isEdit && (
        <FormInput name="author" label="Author" placeholder="Author" required disabled={isLoading} />
      )}

      <FormSelect
        name="status"
        label="Status"
        options={ARTICLE_STATUS_OPTIONS}
        placeholder="Select Status"
        required
        disabled={isLoading}
      />

      <FormSelect
        name="categoryId"
        label="Category"
        options={categoryOptions}
        placeholder="Select"
        required
        disabled={isLoading || loadingCategories}
      />

      <FormNumberInput
        name="timeToRead"
        label="Duration (Ex: 3 mins)"
        placeholder="Time to read"
        min={1}
        required
        disabled={isLoading}
      />

      <ImageUploader
        label="Image"
        value={method.watch('picture') || (isEdit && article ? getPictureUrl(article.picture) : '')}
        onChange={(file, _preview, uploadedUrl) => {
          if (uploadedUrl) {
            method.setValue('picture', uploadedUrl, { shouldValidate: !isEdit })
          } else if (!file) {
            method.setValue('picture', '')
          }
        }}
        onUpload={uploadFileToS3}
        required={!isEdit}
        disabled={isLoading}
        error={method.formState.errors.picture?.message as string}
      />

      <FormTextArea
        name="content"
        label="Content"
        placeholder="Write article content here..."
        rows={8}
        required
        disabled={isLoading}
      />
    </>
  )
}

/**
 * CREATE FORM
 */
const CreateArticleForm = ({
  onClose,
  onSuccess,
}: {
  onClose: () => void
  onSuccess: () => void
}) => {
  const { method, onSubmit, isLoading } = useCreateArticleForm({ onSuccess })
  const [showConfirm, setShowConfirm] = useState(false)

  const handleCreateClick = async () => {
    // Validate form first
    const isValid = await method.trigger()
    if (isValid) {
      setShowConfirm(true)
    }
  }

  const handleConfirm = () => {
    setShowConfirm(false)
    method.handleSubmit((data) => {
      onSubmit(data as never)
    })()
  }

  return (
    <>
      <ModalWrapper title="Create Article" onClose={onClose} isLoading={isLoading}>
        <FormProvider {...method}>
          <form onSubmit={(e) => e.preventDefault()} className="p-6 space-y-4">
            <input type="hidden" {...method.register('type')} value="article" />
            <ArticleFormFields method={method} isLoading={isLoading} isEdit={false} />
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <Button type="button" variant="secondary" onClick={onClose} disabled={isLoading} className="flex-1">
                Cancel
              </Button>
              <Button type="button" variant="primary" onClick={handleCreateClick} disabled={isLoading} className="flex-1">
                Create
              </Button>
            </div>
          </form>
        </FormProvider>
      </ModalWrapper>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
        title="Create Article"
        message="Are you sure you want to create this article?"
        confirmText="Create"
        variant="info"
        isLoading={isLoading}
      />
    </>
  )
}

/**
 * EDIT FORM
 */
const EditArticleForm = ({
  article,
  onClose,
  onSuccess,
}: {
  article: Article
  onClose: () => void
  onSuccess: () => void
}) => {
  const { method, onSubmit, isLoading } = useEditArticleForm({ article, onSuccess })
  const [showConfirm, setShowConfirm] = useState(false)

  const handleUpdateClick = async () => {
    // Validate form first
    const isValid = await method.trigger()
    if (isValid) {
      setShowConfirm(true)
    }
  }

  const handleConfirm = () => {
    setShowConfirm(false)
    method.handleSubmit((data) => {
      onSubmit(data as never)
    })()
  }

  return (
    <>
      <ModalWrapper title="Edit Article" onClose={onClose} isLoading={isLoading}>
        <FormProvider {...method}>
          <form onSubmit={(e) => e.preventDefault()} className="p-6 space-y-4">
            <input type="hidden" {...method.register('type')} />
            <ArticleFormFields method={method} isLoading={isLoading} isEdit={true} article={article} />
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <Button type="button" variant="secondary" onClick={onClose} disabled={isLoading} className="flex-1">
                Cancel
              </Button>
              <Button type="button" variant="primary" onClick={handleUpdateClick} disabled={isLoading} className="flex-1">
                Update
              </Button>
            </div>
          </form>
        </FormProvider>
      </ModalWrapper>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
        title="Update Article"
        message="Are you sure you want to update this article?"
        confirmText="Update"
        variant="info"
        isLoading={isLoading}
      />
    </>
  )
}
