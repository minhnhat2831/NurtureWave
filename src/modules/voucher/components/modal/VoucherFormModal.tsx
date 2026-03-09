import { useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { FormTextArea, FormSelect, FormNumberInput, FormDatePicker, Button, ConfirmModal } from '@/components/common'
import { useCreateVoucherForm } from '../../hook/useVoucherForm'
import { VOUCHER_TYPE_OPTIONS } from '../../constants/formOptions'
import ModalWrapper from '@/components/common/FormModal'
import type { UseFormReturn } from 'react-hook-form'
import type { CreateVoucherData } from '../../schema/VoucherSchema.type'

interface VoucherFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export const VoucherFormModal = ({ isOpen, onClose, onSuccess }: VoucherFormModalProps) => {
  if (!isOpen) return null
  return <CreateVoucherForm onClose={onClose} onSuccess={onSuccess} />
}

const CreateVoucherForm = ({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) => {
  const { method, onSubmit, isLoading } = useCreateVoucherForm({ onSuccess })
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <>
      <ModalWrapper title="Create Voucher" onClose={onClose} isLoading={isLoading}>
        <FormProvider {...method}>
          <form onSubmit={(e) => e.preventDefault()} className="p-6 space-y-4">
            <VoucherFormFields method={method} isLoading={isLoading} />
            <FormActions onClose={onClose} isLoading={isLoading} onClick={async () => (await method.trigger()) && setShowConfirm(true)} label="Create" />
          </form>
        </FormProvider>
      </ModalWrapper>
      <ConfirmModal isOpen={showConfirm} onClose={() => setShowConfirm(false)} onConfirm={() => { setShowConfirm(false); method.handleSubmit((data) => onSubmit(data as never))() }} title="Create Voucher" message="Are you sure you want to create this voucher?" confirmText="Create" variant="info" isLoading={isLoading} />
    </>
  )
}

const FormActions = ({ onClose, isLoading, onClick, label }: { onClose: () => void; isLoading: boolean; onClick: () => void; label: string }) => (
  <div className="flex gap-3 pt-4 border-t border-gray-200">
    <Button type="button" variant="secondary" onClick={onClose} disabled={isLoading} className="flex-1">Cancel</Button>
    <Button type="button" variant="primary" onClick={onClick} disabled={isLoading} className="flex-1">{label}</Button>
  </div>
)

const VoucherFormFields = ({ method, isLoading }: { method: UseFormReturn<CreateVoucherData>; isLoading: boolean }) => {
  const codeValue = method.watch('code') || ''
  const codeLength = codeValue.length

  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Code <span className="text-red-500 ml-0.5">*</span></label>
        <div className="relative">
          <input {...method.register('code')} maxLength={50} placeholder="Code" disabled={isLoading} className="w-full px-3 py-2.5 border rounded-lg text-sm outline-none transition-all text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 border-gray-300 hover:border-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60" />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">{codeLength}/50</span>
        </div>
        {method.formState.errors.code && <p className="mt-1 text-xs text-red-500">{String(method.formState.errors.code.message)}</p>}
      </div>
      <FormTextArea name="description" label="Description" placeholder="Description" rows={4} disabled={isLoading} />
      <div className="grid grid-cols-2 gap-4">
        <FormDatePicker name="startDate" label="Start Date" required disabled={isLoading} />
        <FormDatePicker name="endDate" label="End Date" required disabled={isLoading} />
      </div>
      <FormNumberInput name="quantityUse" label="Quantity" placeholder="Quantity" min={1} required disabled={isLoading} />
      <FormSelect name="type" label="Type of coupon" options={VOUCHER_TYPE_OPTIONS} placeholder="Select" required disabled={isLoading} />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Amount <span className="text-red-500 ml-0.5">*</span></label>
        <div className="relative">
          <input type="number" {...method.register('amount', { setValueAs: (v) => { if (v === '' || v === null || v === undefined) return undefined; const num = Number(v); return isNaN(num) ? undefined : num } })} value={method.watch('amount') ?? ''} placeholder="Amount" min={0} step="0.01" disabled={isLoading} className={`w-full px-3 py-2.5 pr-10 border rounded-lg text-sm outline-none transition-all text-gray-900 placeholder:text-gray-400 focus:ring-2 disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 ${method.formState.errors.amount ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 hover:border-gray-400 focus:ring-violet-500 focus:border-violet-500'}`} />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-900 font-medium">$</span>
        </div>
        {method.formState.errors.amount && <p className="mt-1 text-xs text-red-500">{String(method.formState.errors.amount.message)}</p>}
      </div>
      <FormNumberInput name="minPayAmount" label="Condition" placeholder="Min of payment" min={0} step="0.01" required disabled={isLoading} />
      <FormNumberInput name="maxDiscountAmount" label="Condition max of discount" placeholder="Max of discount" min={0} step="0.01" required disabled={isLoading} />
    </>
  )
}
