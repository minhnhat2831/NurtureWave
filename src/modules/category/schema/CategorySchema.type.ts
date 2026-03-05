import type { z } from 'zod'
import type {
  categoryItemSchema,
  createCategorySchema,
  editCategorySchema,
  categoryListResponseSchema,
  categoryDetailResponseSchema,
  categoryParamsSchema,
} from './CategorySchema'

// Core Types

export type Category = z.infer<typeof categoryItemSchema>

export type CreateCategoryData = z.infer<typeof createCategorySchema>
export type EditCategoryData = z.infer<typeof editCategorySchema>
// API Request/Response Types

export type CreateCategoryRequest = CreateCategoryData
export type UpdateCategoryRequest = EditCategoryData

export type CategoryListResponse = z.infer<typeof categoryListResponseSchema>
export type CategoryDetailResponse = z.infer<typeof categoryDetailResponseSchema>

export type CategoryQueryParams = z.infer<typeof categoryParamsSchema>

// Helper Types
export type CategoryStatus = 'active' | 'inactive'
