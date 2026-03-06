import * as z from 'zod'
import { StringRequired, StringNullAndOptional, ParamsSchema, NumberRequired, ArticleStatusRequired, Metadata } from '@/constants/SchemaConstants'


export const articleItemSchema = z.object({
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


export const createArticleSchema = z.object({
  title: StringRequired,
  content: StringRequired,
  picture: StringRequired,
  status: ArticleStatusRequired,
  type: z.enum(['article', 'pd']),
  timeToRead: NumberRequired,
  categoryId: StringRequired,
  author: StringRequired,
})


export const editArticleSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  picture: z.any().optional(),
  status: z.enum(['draft', 'published', 'unpublished']).optional(),
  type: z.enum(['article', 'pd']).optional(),
  timeToRead: z.number().optional(),
  categoryId: z.string().optional(),
})

// ============================================
// 3. RESPONSE SCHEMAS - API responses
// ============================================

/**
 * Response schema for GET /admins/articles (list)
 */
export const articleListResponseSchema = z.object({
  message: z.string(),
  data: z.array(articleItemSchema),
  metadata: Metadata,
})

/**
 * Response schema for GET /admins/articles/:id (detail)
 * and POST/PUT operations
 */
export const articleDetailResponseSchema = z.object({
  message: z.string(),
  data: articleItemSchema,
})

// ============================================
// 4. QUERY PARAMS SCHEMA - List filters
// ============================================

/**
 * Query params for GET /admins/articles
 * Extends base ParamsSchema with article-specific filters
 */
export const articleParamsSchema = ParamsSchema.extend({
  f_type: z.enum(['article', 'pd']).optional(),
  f_categoryId: StringNullAndOptional,
  f_status: z.enum(['published', 'unpublished', 'draft']).optional(),
})
