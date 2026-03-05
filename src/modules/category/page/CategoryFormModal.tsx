import { useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { FormInput, FormSelect, Button, ImageUploader, ConfirmModal } from '@/components/common'
import { useCreateCategoryForm, useEditCategoryForm } from '../hook/useCategoryForm'
import { CATEGORY_STATUS_OPTIONS } from '../constants/formOptions'
import { getPictureUrl } from '@/utils/imageHelpers'
import { uploadFileToS3 } from '@/services/uploadService'
import type { Category } from '../schema/CategorySchema.type'
import type { UseFormReturn } from 'react-hook-form'

interface CategoryFormModalProps {
  isOpen: boolean
  onClose: () => void
  category: Category | null
  onSuccess: () => void
}

export const CategoryFormModal = ({
  isOpen,
  onClose,
  category,
  onSuccess,
}: CategoryFormModalProps) => {
  if (!isOpen) return null

  return category ? (
    <EditCategoryForm category={category} onClose={onClose} onSuccess={onSuccess} />
  ) : (
    <CreateCategoryForm onClose={onClose} onSuccess={onSuccess} />
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
          className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
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
const CategoryFormFields = ({
  method,
  isLoading,
  isEdit,
  category,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  method: UseFormReturn<any>
  isLoading: boolean
  isEdit: boolean
  category?: Category
}) => {
  return (
    <>
      <FormInput name="title" label="Title" placeholder="Title" required disabled={isLoading} />
      
      <FormInput name="name" label="Name" placeholder="Name" required disabled={isLoading} />

      <FormSelect
        name="status"
        label="Status"
        options={CATEGORY_STATUS_OPTIONS}
        placeholder="Select Status"
        required
        disabled={isLoading}
      />

      <ImageUploader
        label="Image"
        value={method.watch('picture') || (isEdit && category ? getPictureUrl(category.picture) : '')}
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
    </>
  )
}

/**
 * CREATE FORM
 */
const CreateCategoryForm = ({
  onClose,
  onSuccess,
}: {
  onClose: () => void
  onSuccess: () => void
}) => {
  const { method, onSubmit, isLoading } = useCreateCategoryForm({ onSuccess })
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
      <ModalWrapper title="Create Category" onClose={onClose} isLoading={isLoading}>
        <FormProvider {...method}>
          <form onSubmit={(e) => e.preventDefault()} className="p-6 space-y-4">
            <CategoryFormFields method={method} isLoading={isLoading} isEdit={false} />
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
        title="Create Category"
        message="Are you sure you want to create this category?"
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
const EditCategoryForm = ({
  category,
  onClose,
  onSuccess,
}: {
  category: Category
  onClose: () => void
  onSuccess: () => void
}) => {
  const { method, onSubmit, isLoading } = useEditCategoryForm({ category, onSuccess })
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
      <ModalWrapper title="Update Category" onClose={onClose} isLoading={isLoading}>
        <FormProvider {...method}>
          <form onSubmit={(e) => e.preventDefault()} className="p-6 space-y-4">
            <CategoryFormFields method={method} isLoading={isLoading} isEdit={true} category={category} />
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
        title="Update Category"
        message="Are you sure you want to update this category?"
        confirmText="Update"
        variant="info"
        isLoading={isLoading}
      />
    </>
  )
}
