import { useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { FormInput, FormSelect, Button, ImageUploader, ConfirmModal } from '@/components/common'
import { useCreateCategoryForm, useEditCategoryForm } from '../../hook/useCategoryForm'
import { CATEGORY_STATUS_OPTIONS } from '../../constants/formOptions'
import { getPictureUrl } from '@/utils/imageHelpers'
import { uploadFileToS3 } from '@/services/uploadService'
import type { Category } from '../../schema/CategorySchema.type'
import type { UseFormReturn } from 'react-hook-form'
import ModalWrapper from '@/components/common/FormModal'

interface CategoryFormModalProps {
  isOpen: boolean
  onClose: () => void
  category: Category | null
  onSuccess: () => void
}

export const CategoryFormModal = ({ isOpen, onClose, category, onSuccess }: CategoryFormModalProps) => {
  if (!isOpen) return null
  return category ? <EditForm category={category} onClose={onClose} onSuccess={onSuccess} /> : <CreateForm onClose={onClose} onSuccess={onSuccess} />
}

const CreateForm = ({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) => {
  const { method, onSubmit, isLoading } = useCreateCategoryForm({ onSuccess })
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <>
      <ModalWrapper title="Create Category" onClose={onClose} isLoading={isLoading}>
        <FormProvider {...method}>
          <form onSubmit={(e) => e.preventDefault()} className="p-6 space-y-4">
            <CategoryFormFields method={method} isLoading={isLoading} isEdit={false} />
            <FormActions onClose={onClose} isLoading={isLoading} onClick={async () => (await method.trigger()) && setShowConfirm(true)} label="Create" />
          </form>
        </FormProvider>
      </ModalWrapper>
      <ConfirmModal isOpen={showConfirm} onClose={() => setShowConfirm(false)} onConfirm={() => { setShowConfirm(false); method.handleSubmit((data) => onSubmit(data as never))() }} title="Create Category" message="Are you sure you want to create this category?" confirmText="Create" variant="info" isLoading={isLoading} />
    </>
  )
}

const EditForm = ({ category, onClose, onSuccess }: { category: Category; onClose: () => void; onSuccess: () => void }) => {
  const { method, onSubmit, isLoading } = useEditCategoryForm({ category, onSuccess })
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <>
      <ModalWrapper title="Update Category" onClose={onClose} isLoading={isLoading}>
        <FormProvider {...method}>
          <form onSubmit={(e) => e.preventDefault()} className="p-6 space-y-4">
            <CategoryFormFields method={method} isLoading={isLoading} isEdit category={category} />
            <FormActions onClose={onClose} isLoading={isLoading} onClick={async () => (await method.trigger()) && setShowConfirm(true)} label="Update" />
          </form>
        </FormProvider>
      </ModalWrapper>
      <ConfirmModal isOpen={showConfirm} onClose={() => setShowConfirm(false)} onConfirm={() => { setShowConfirm(false); method.handleSubmit((data) => onSubmit(data as never))() }} title="Update Category" message="Are you sure you want to update this category?" confirmText="Update" variant="info" isLoading={isLoading} />
    </>
  )
}

const FormActions = ({ onClose, isLoading, onClick, label }: { onClose: () => void; isLoading: boolean; onClick: () => void; label: string }) => (
  <div className="flex gap-3 pt-4 border-t border-gray-200">
    <Button type="button" variant="secondary" onClick={onClose} disabled={isLoading} className="flex-1">Cancel</Button>
    <Button type="button" variant="primary" onClick={onClick} disabled={isLoading} className="flex-1">{label}</Button>
  </div>
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CategoryFormFields = ({ method, isLoading, isEdit, category }: { method: UseFormReturn<any>; isLoading: boolean; isEdit: boolean; category?: Category }) => (
  <>
    <FormInput name="title" label="Title" placeholder="Title" required disabled={isLoading} />
    <FormInput name="name" label="Name" placeholder="Name" required disabled={isLoading} />
    <FormSelect name="status" label="Status" options={CATEGORY_STATUS_OPTIONS} placeholder="Select Status" required disabled={isLoading} />
    <ImageUploader label="Image" value={method.watch('picture') || (isEdit && category ? getPictureUrl(category.picture) : '')} onChange={(file, _preview, uploadedUrl) => { if (uploadedUrl) method.setValue('picture', uploadedUrl, { shouldValidate: !isEdit }); else if (!file) method.setValue('picture', '') }} onUpload={uploadFileToS3} required={!isEdit} disabled={isLoading} error={method.formState.errors.picture?.message as string} />
  </>
)

