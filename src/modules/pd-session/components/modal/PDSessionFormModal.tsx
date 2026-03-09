import { useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { FormInput, FormTextArea, FormSelect, FormNumberInput, Button, ImageUploader, ConfirmModal } from '@/components/common'
import { useCreatePDSessionForm, useEditPDSessionForm } from '../../hook/usePDSessionForm'
import { usePDSessionFormOptions, PD_SESSION_STATUS_OPTIONS } from '../../constants/formOptions'
import { getPictureUrl } from '@/utils/imageHelpers'
import { uploadFileToS3 } from '@/services/uploadService'
import type { PDSession } from '../../schema/PDSessionSchema.type'
import type { UseFormReturn } from 'react-hook-form'
import ModalWrapper from '@/components/common/FormModal'

interface PDSessionFormModalProps {
  isOpen: boolean
  onClose: () => void
  pdSession: PDSession | null
  onSuccess: () => void
}

export const PDSessionFormModal = ({ isOpen, onClose, pdSession, onSuccess }: PDSessionFormModalProps) => {
  if (!isOpen) return null
  return pdSession ? <EditForm pdSession={pdSession} onClose={onClose} onSuccess={onSuccess} /> : <CreateForm onClose={onClose} onSuccess={onSuccess} />
}

const CreateForm = ({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) => {
  const { method, onSubmit, isLoading } = useCreatePDSessionForm({ onSuccess })
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <>
      <ModalWrapper title="Create PD Session" onClose={onClose} isLoading={isLoading}>
        <FormProvider {...method}>
          <form onSubmit={(e) => e.preventDefault()} className="p-6 space-y-4">
            <input type="hidden" {...method.register('type')} value="pd" />
            <PDSessionFormFields method={method} isLoading={isLoading} isEdit={false} />
            <FormActions onClose={onClose} isLoading={isLoading} onClick={async () => (await method.trigger()) && setShowConfirm(true)} label="Create" />
          </form>
        </FormProvider>
      </ModalWrapper>
      <ConfirmModal isOpen={showConfirm} onClose={() => setShowConfirm(false)} onConfirm={() => { setShowConfirm(false); method.handleSubmit((data) => onSubmit(data as never))() }} title="Create PD Session" message="Are you sure you want to create this PD Session?" confirmText="Create" variant="info" isLoading={isLoading} />
    </>
  )
}

const EditForm = ({ pdSession, onClose, onSuccess }: { pdSession: PDSession; onClose: () => void; onSuccess: () => void }) => {
  const { method, onSubmit, isLoading } = useEditPDSessionForm({ pdSession, onSuccess })
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <>
      <ModalWrapper title="Edit PD Session" onClose={onClose} isLoading={isLoading}>
        <FormProvider {...method}>
          <form onSubmit={(e) => e.preventDefault()} className="p-6 space-y-4">
            <input type="hidden" {...method.register('type')} />
            <PDSessionFormFields method={method} isLoading={isLoading} isEdit pdSession={pdSession} />
            <FormActions onClose={onClose} isLoading={isLoading} onClick={async () => (await method.trigger()) && setShowConfirm(true)} label="Update" />
          </form>
        </FormProvider>
      </ModalWrapper>
      <ConfirmModal isOpen={showConfirm} onClose={() => setShowConfirm(false)} onConfirm={() => { setShowConfirm(false); method.handleSubmit((data) => onSubmit(data as never))() }} title="Update PD Session" message="Are you sure you want to update this PD Session?" confirmText="Update" variant="info" isLoading={isLoading} />
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
const PDSessionFormFields = ({ method, isLoading, isEdit, pdSession }: { method: UseFormReturn<any>; isLoading: boolean; isEdit: boolean; pdSession?: PDSession | null }) => {
  const { categoryOptions, loadingCategories } = usePDSessionFormOptions()
  
  return (
    <>
      <FormInput name="title" label="Title" placeholder="Title" required disabled={isLoading} />
      {!isEdit && <FormInput name="author" label="Author" placeholder="Author" required disabled={isLoading} />}
      <FormSelect name="status" label="Status" options={PD_SESSION_STATUS_OPTIONS} placeholder="Select Status" required disabled={isLoading} />
      <FormSelect name="categoryId" label="Category" options={categoryOptions} placeholder="Select" required disabled={isLoading || loadingCategories} />
      <FormNumberInput name="timeToRead" label="Duration (Ex: 3 mins)" placeholder="Time to read" min={1} required disabled={isLoading} />
      <ImageUploader label="Image" value={method.watch('picture') || (isEdit && pdSession ? getPictureUrl(pdSession.picture) : '')} onChange={(file, _preview, uploadedUrl) => { if (uploadedUrl) method.setValue('picture', uploadedUrl, { shouldValidate: !isEdit }); else if (!file) method.setValue('picture', '') }} onUpload={uploadFileToS3} required={!isEdit} disabled={isLoading} error={method.formState.errors.picture?.message as string} />
      <FormTextArea name="content" label="Content" placeholder="Write PD Session content here..." rows={8} required disabled={isLoading} />
    </>
  )
}
