import * as z from 'zod'
import { StringRequired, StringNullAndOptional, ParamsSchema, StatusRequired, Metadata } from '@/constants/SchemaConstants'

// 1. ITEM SCHEMA - Single category object
export const categoryItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  name: z.string(),
  slug: StringNullAndOptional,
  picture: StringNullAndOptional,
  index: z.number().optional(),
  status: z.enum(['active', 'inactive']),
  createdAt: z.string(),
  updatedAt: StringNullAndOptional,
})

// 2. FORM SCHEMAS - Create & Edit validation

export const createCategorySchema = z.object({
  title: StringRequired,
  name: StringRequired,
  picture: StringRequired,
  status: StatusRequired,
})

export const editCategorySchema = z.object({
  title: z.string().optional(),
  name: z.string().optional(),
  picture: z.any().optional(),
  status: z.enum(['active', 'inactive']).optional(),
})

// 3. RESPONSE SCHEMAS - API responses

export const categoryListResponseSchema = z.object({
  message: z.string(),
  data: z.array(categoryItemSchema),
  metadata: Metadata,
})

export const categoryDetailResponseSchema = z.object({
  message: z.string(),
  data: categoryItemSchema,
})
// 4. QUERY PARAMS SCHEMA - List filters
export const categoryParamsSchema = ParamsSchema.extend({
  f_status: z.enum(['active', 'inactive']).optional(),
})
