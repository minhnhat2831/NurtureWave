import { FormProvider } from 'react-hook-form'
import { FormTextArea, FormSelect, FormNumberInput, Button } from '@/components/common'
import { BaseDatePicker } from '@/components/Form/BaseDatePicker'
import { useCreateVoucherForm } from '../hook/useVoucherForm'
import { VOUCHER_TYPE_OPTIONS } from '../constants/formOptions'

interface VoucherFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

/**
 * VOUCHER FORM MODAL
 * Create voucher form
 */
export const VoucherFormModal = ({
  isOpen,
  onClose,
  onSuccess,
}: VoucherFormModalProps) => {
  if (!isOpen) return null

  return <CreateVoucherForm onClose={onClose} onSuccess={onSuccess} />
}

/**
 * CREATE VOUCHER FORM
 */
const CreateVoucherForm = ({
  onClose,
  onSuccess,
}: {
  onClose: () => void
  onSuccess: () => void
}) => {
  const { method, onSubmit, isLoading } = useCreateVoucherForm({ onSuccess })
  const codeValue = method.watch('code') || ''
  const codeLength = codeValue.length

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={isLoading ? undefined : onClose} />
      <div className="relative bg-white shadow-xl w-full max-w-xl h-full overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Create Voucher</h2>
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

        {/* Form */}
        <FormProvider {...method}>
          <form onSubmit={onSubmit} className="p-6 space-y-4">
            {/* Code with character counter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Code <span className="text-red-500 ml-0.5">*</span>
              </label>
              <div className="relative">
                <input
                  {...method.register('code')}
                  maxLength={50}
                  placeholder="Code"
                  disabled={isLoading}
                  className="w-full px-3 py-2.5 border rounded-lg text-sm outline-none transition-all text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 border-gray-300 hover:border-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                  {codeLength}/50
                </span>
              </div>
              {method.formState.errors.code && (
                <p className="mt-1 text-xs text-red-500">{method.formState.errors.code.message}</p>
              )}
            </div>

            {/* Description */}
            <FormTextArea
              name="description"
              label="Description"
              placeholder="Description"
              rows={4}
              disabled={isLoading}
            />

            {/* Start Date and End Date - Side by side */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Start Date
                </label>
                <BaseDatePicker
                  {...method.register('startDate')}
                  disabled={isLoading}
                  error={method.formState.errors.startDate?.message}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  End Date
                </label>
                <BaseDatePicker
                  {...method.register('endDate')}
                  disabled={isLoading}
                  error={method.formState.errors.endDate?.message}
                />
              </div>
            </div>

            {/* Quantity */}
            <FormNumberInput
              name="quantityUse"
              label="Quantity"
              placeholder="Description"
              min={1}
              required
              disabled={isLoading}
            />

            {/* Type of coupon */}
            <FormSelect
              name="type"
              label="Type of coupon"
              options={VOUCHER_TYPE_OPTIONS}
              placeholder="Select"
              required
              disabled={isLoading}
            />

            {/* Amount with $ suffix - Custom wrapper for suffix */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Amount <span className="text-red-500 ml-0.5">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  {...method.register('amount', { 
                    setValueAs: (v) => {
                      if (v === '' || v === null || v === undefined) return undefined
                      const num = Number(v)
                      return isNaN(num) ? undefined : num
                    }
                  })}
                  placeholder="Amount"
                  min={0}
                  step="0.01"
                  disabled={isLoading}
                  className={`w-full px-3 py-2.5 pr-10 border rounded-lg text-sm outline-none transition-all text-gray-900 placeholder:text-gray-400 focus:ring-2 disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 ${
                    method.formState.errors.amount 
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 hover:border-gray-400 focus:ring-violet-500 focus:border-violet-500'
                  }`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-900 font-medium">
                  $
                </span>
              </div>
              {method.formState.errors.amount && (
                <p className="mt-1 text-xs text-red-500">{method.formState.errors.amount.message}</p>
              )}
            </div>

            {/* Condition - Min of payment */}
            <FormNumberInput
              name="minPayAmount"
              label="Condition"
              placeholder="Min of payment"
              min={0}
              step="0.01"
              required
              disabled={isLoading}
            />

            {/* Condition max of discount */}
            <FormNumberInput
              name="maxDiscountAmount"
              label="Condition max of discount"
              placeholder="Max of discount"
              min={0}
              step="0.01"
              required
              disabled={isLoading}
            />

            {/* Create Button */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                disabled={isLoading}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating...' : 'Create'}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
