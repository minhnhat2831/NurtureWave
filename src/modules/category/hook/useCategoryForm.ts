import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { createCategorySchema, editCategorySchema } from '../schema/CategorySchema'
import { createCategory, updateCategory } from '../api/api'
import { getPictureUrl } from '@/utils/imageHelpers'
import type { CreateCategoryData, EditCategoryData, Category } from '../schema/CategorySchema.type'

/**
 * Hook for Category Create Form
 * Usage: const { method, onSubmit, isLoading } = useCreateCategoryForm({ onSuccess: () => closeModal() })
 */
interface UseCreateCategoryFormProps {
  onSuccess?: () => void
}

export const useCreateCategoryForm = ({ onSuccess }: UseCreateCategoryFormProps) => {
  const queryClient = useQueryClient()
  
  const method = useForm<CreateCategoryData>({
    resolver: zodResolver(createCategorySchema),
    mode: 'onTouched',
    defaultValues: {
      title: '',
      name: '',
      picture: '',
      status: 'active',
    } as Partial<CreateCategoryData>
  })

  const mutation = useMutation({
    mutationFn: (data: CreateCategoryData) => createCategory(data),
    onSuccess: () => {
      toast.success('Category created successfully')
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      method.reset()
      onSuccess?.()
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } }
      toast.error(err.response?.data?.message || 'Failed to create category')
    },
  })

  const onSubmit = async (data: CreateCategoryData) => {
    mutation.mutate(data)
  }

  return {
    method,
    onSubmit: method.handleSubmit(onSubmit),
    isLoading: mutation.isPending,
  }
}


interface UseEditCategoryFormProps {
  category: Category
  onSuccess?: () => void
}

export const useEditCategoryForm = ({ category, onSuccess }: UseEditCategoryFormProps) => {
  const queryClient = useQueryClient()
  
  const method = useForm<EditCategoryData>({
    resolver: zodResolver(editCategorySchema),
    mode: 'onTouched',
    defaultValues: {
      title: category.title || '',
      name: category.name || '',
      picture: getPictureUrl(category.picture) || '',
      status: category.status || 'active',
    }
  })

  const mutation = useMutation({
    mutationFn: (data: EditCategoryData) => updateCategory(category.id, data),
    onSuccess: () => {
      toast.success('Category updated successfully')
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      onSuccess?.()
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } }
      toast.error(err.response?.data?.message || 'Failed to update category')
    },
  })

  const onSubmit = async (data: EditCategoryData) => {
    const submitData = { ...data }
    
    // Get original picture URL for comparison
    const originalPictureUrl = getPictureUrl(category.picture)
    
    // Only send picture if it's a new URL (different from original)
    // If picture is unchanged, don't send it to backend
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
