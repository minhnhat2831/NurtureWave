import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { createVoucherSchema } from '../schema/VoucherSchema'
import { createVoucher } from '../api/api'
import type { CreateVoucherData } from '../schema/VoucherSchema.type'

/**
 * Hook for Voucher Create Form
 * Usage: const { method, onSubmit, isLoading } = useCreateVoucherForm({ onSuccess: () => closeModal() })
 */
interface UseCreateVoucherFormProps {
  onSuccess?: () => void
}

export const useCreateVoucherForm = ({ onSuccess }: UseCreateVoucherFormProps) => {
  const queryClient = useQueryClient()
  
  // Get today and tomorrow dates in YYYY-MM-DD format
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  const formatDate = (date: Date) => date.toISOString().split('T')[0]
  
  const method = useForm<CreateVoucherData>({
    resolver: zodResolver(createVoucherSchema),
    mode: 'onTouched',
    defaultValues: {
      code: '',
      description: '',
      startDate: formatDate(today),
      endDate: formatDate(tomorrow),
      quantityUse: undefined,
      type: undefined,
      amount: undefined,
      minPayAmount: undefined,
      maxDiscountAmount: undefined,
    } as Partial<CreateVoucherData>
  })

  const mutation = useMutation({
    mutationFn: (data: CreateVoucherData) => createVoucher(data),
    onSuccess: () => {
      toast.success('Voucher created successfully')
      queryClient.invalidateQueries({ queryKey: ['vouchers'] })
      method.reset()
      onSuccess?.()
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } }
      toast.error(err.response?.data?.message || 'Failed to create voucher')
    },
  })

  const onSubmit = async (data: CreateVoucherData) => {
    mutation.mutate(data)
  }

  return {
    method,
    onSubmit: method.handleSubmit(onSubmit),
    isLoading: mutation.isPending,
  }
}
