import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { createArticleSchema, editArticleSchema } from '../schema/ArticleSchema'
import { createArticle, updateArticle } from '../api/api'
import { getPictureUrl } from '@/utils/imageHelpers'
import { handleApiError } from '@/utils/errorHandler'
import type { CreateArticleData, EditArticleData, Article } from '../schema/ArticleSchema.type'

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
    onError: (error) => handleApiError(error, 'Failed to create article'),
  })

  const onSubmit = (data: CreateArticleData) => mutation.mutate(data)

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
    onError: (error) => handleApiError(error, 'Failed to update article'),
  })

  const onSubmit = (data: EditArticleData) => {
    const submitData = { ...data }
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
