import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { createPDSessionSchema, editPDSessionSchema } from '../schema/PDSessionSchema'
import { createPDSession, updatePDSession } from '../api/api'
import { getPictureUrl } from '@/utils/imageHelpers'
import { handleApiError } from '@/utils/errorHandler'
import type { CreatePDSessionData, EditPDSessionData, PDSession } from '../schema/PDSessionSchema.type'

/**
 * Hook for PD Session Create Form
 * Usage: const { method, onSubmit, isLoading } = useCreatePDSessionForm({ onSuccess: () => closeModal() })
 */
interface UseCreatePDSessionFormProps {
  onSuccess?: () => void
}

export const useCreatePDSessionForm = ({ onSuccess }: UseCreatePDSessionFormProps) => {
  const queryClient = useQueryClient()
  
  const method = useForm<CreatePDSessionData>({
    resolver: zodResolver(createPDSessionSchema),
    mode: 'onTouched',
    defaultValues: {
      title: '',
      content: '',
      picture: '',
      status: '' as PDSession['status'],
      type: 'pd',
      timeToRead: undefined,
      categoryId: '',
      author: '',
    } as Partial<CreatePDSessionData>
  })

  const mutation = useMutation({
    mutationFn: (data: CreatePDSessionData) => createPDSession(data),
    onSuccess: () => {
      toast.success('PD Session created successfully')
      queryClient.invalidateQueries({ queryKey: ['pd-sessions'] })
      method.reset()
      onSuccess?.()
    },
    onError: (error) => handleApiError(error, 'Failed to create PD Session'),
  })

  const onSubmit = (data: CreatePDSessionData) => mutation.mutate(data)

  return {
    method,
    onSubmit: method.handleSubmit(onSubmit),
    isLoading: mutation.isPending,
  }
}

/**
 * Hook for PD Session Edit Form
 */
interface UseEditPDSessionFormProps {
  pdSession: PDSession
  onSuccess?: () => void
}

export const useEditPDSessionForm = ({ pdSession, onSuccess }: UseEditPDSessionFormProps) => {
  const queryClient = useQueryClient()
  
  const method = useForm<EditPDSessionData>({
    resolver: zodResolver(editPDSessionSchema),
    mode: 'onTouched',
    defaultValues: {
      title: pdSession.title,
      content: pdSession.content,
      picture: getPictureUrl(pdSession.picture),
      status: pdSession.status,
      type: 'pd',
      timeToRead: pdSession.timeToRead,
      categoryId: pdSession.categoryId || '',
    }
  })

  const mutation = useMutation({
    mutationFn: (data: EditPDSessionData) => updatePDSession(pdSession.id, data),
    onSuccess: () => {
      toast.success('PD Session updated successfully')
      queryClient.invalidateQueries({ queryKey: ['pd-sessions'] })
      onSuccess?.()
    },
    onError: (error) => handleApiError(error, 'Failed to update PD Session'),
  })

  const onSubmit = (data: EditPDSessionData) => {
    const submitData = { ...data }
    const originalPictureUrl = getPictureUrl(pdSession.picture)
    
    if (submitData.picture === originalPictureUrl) {
      delete submitData.picture
    }
    
    mutation.mutate(submitData)
  }

  return {
    method,
    onSubmit: method.handleSubmit(onSubmit),
    isLoading: mutation.isPending,
  }
}
