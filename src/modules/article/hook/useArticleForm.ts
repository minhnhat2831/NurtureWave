import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { createArticleSchema, editArticleSchema } from '../schema/ArticleSchema'
import { createArticle, updateArticle } from '../api/api'
import { getPictureUrl } from '@/utils/imageHelpers'
import type { CreateArticleData, EditArticleData, Article } from '../schema/ArticleSchema.type'

/**
 * Hook for Article Create Form
 * Usage: const { method, onSubmit, isLoading } = useCreateArticleForm({ onSuccess: () => closeModal() })
 */
interface UseCreateArticleFormProps {
  onSuccess?: () => void
}

export const useCreateArticleForm = ({ onSuccess }: UseCreateArticleFormProps) => {
  const queryClient = useQueryClient()
  
  const method = useForm<CreateArticleData>({
    resolver: zodResolver(createArticleSchema),
    mode: 'onTouched',
    defaultValues: {
      title: '',
      content: '',
      picture: '',
      status: '' as Article['status'],
      type: 'article',
      timeToRead: undefined,
      categoryId: '',
      author: '',
    } as Partial<CreateArticleData>
  })

  const mutation = useMutation({
    mutationFn: (data: CreateArticleData) => createArticle(data),
    onSuccess: () => {
      toast.success('Article created successfully')
      queryClient.invalidateQueries({ queryKey: ['articles'] })
      method.reset()
      onSuccess?.()
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } }
      toast.error(err.response?.data?.message || 'Failed to create article')
    },
  })

  const onSubmit = async (data: CreateArticleData) => {
    mutation.mutate(data)
  }

  return {
    method,
    onSubmit: method.handleSubmit(onSubmit),
    isLoading: mutation.isPending,
  }
}

interface UseEditArticleFormProps {
  article: Article
  onSuccess?: () => void
}

export const useEditArticleForm = ({ article, onSuccess }: UseEditArticleFormProps) => {
  const queryClient = useQueryClient()
  
  const method = useForm<EditArticleData>({
    resolver: zodResolver(editArticleSchema),
    mode: 'onTouched',
    defaultValues: {
      title: article.title,
      content: article.content,
      picture: getPictureUrl(article.picture),
      status: article.status,
      type: article.type,
      timeToRead: article.timeToRead,
      categoryId: article.categoryId || '',
    }
  })

  const mutation = useMutation({
    mutationFn: (data: EditArticleData) => updateArticle(article.id, data),
    onSuccess: () => {
      toast.success('Article updated successfully')
      queryClient.invalidateQueries({ queryKey: ['articles'] })
      onSuccess?.()
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } }
      toast.error(err.response?.data?.message || 'Failed to update article')
    },
  })

  const onSubmit = async (data: EditArticleData) => {
    const submitData = { ...data }
    
    // Get original picture URL for comparison
    const originalPictureUrl = getPictureUrl(article.picture)
    
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
