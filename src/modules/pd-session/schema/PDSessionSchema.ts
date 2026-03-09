import * as z from 'zod'
import { StringRequired, StringNullAndOptional, ParamsSchema, NumberRequired, ArticleStatusRequired, Metadata } from '@/constants/SchemaConstants'

// ============================================
// 1. ITEM SCHEMA - Single PD Session
// ============================================

export const pdSessionItemSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  content: z.string(),
  picture: StringNullAndOptional,
  status: z.enum(['draft', 'published', 'unpublished']),
  type: z.enum(['article', 'pd']),
  author: z.string(),
  categoryId: StringNullAndOptional,
  timeToRead: z.number(),
  createdAt: z.string(),
  updatedAt: StringNullAndOptional,
  deletedAt: StringNullAndOptional,
})

// ============================================
// 2. FORM SCHEMAS - Create & Edit
// ============================================

/**
 * Schema for creating PD Session
 * All fields required
 */
export const createPDSessionSchema = z.object({
  title: StringRequired,
  content: StringRequired,
  picture: StringRequired,
  status: ArticleStatusRequired,
  type: z.literal('pd'), // Always 'pd' for PD Session
  timeToRead: NumberRequired,
  categoryId: StringRequired,
  author: StringRequired,
})

/**
 * Schema for editing PD Session
 * All fields optional (partial update)
 */
export const editPDSessionSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  picture: z.any().optional(),
  status: z.enum(['draft', 'published', 'unpublished']).optional(),
  type: z.literal('pd').optional(),
  timeToRead: z.number().optional(),
  categoryId: z.string().optional(),
})

// ============================================
// 3. RESPONSE SCHEMAS - API responses
// ============================================

/**
 * Response schema for GET /admins/articles?f_type=pd (list)
 */
export const pdSessionListResponseSchema = z.object({
  message: z.string(),
  data: z.array(pdSessionItemSchema),
  metadata: Metadata,
})

/**
 * Response schema for GET /admins/articles/:id (detail)
 * and POST/PUT operations
 */
export const pdSessionDetailResponseSchema = z.object({
  message: z.string(),
  data: pdSessionItemSchema,
})

export const pdSessionParamsSchema = ParamsSchema.extend({
  f_type: z.literal('pd'), // Always filter by type='pd'
  f_categoryId: StringNullAndOptional,
  f_status: z.enum(['published', 'unpublished', 'draft']).optional(),
})
