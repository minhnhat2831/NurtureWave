import type { z } from 'zod'
import type {
  articleItemSchema,
  createArticleSchema,
  editArticleSchema,
  articleListResponseSchema,
  articleDetailResponseSchema,
  articleParamsSchema,
} from './ArticleSchema'

/**
 * ARTICLE MODULE TYPES
 * TypeScript types inferred from Zod schemas
 */

// ============================================
// Core Types
// ============================================
export type Article = z.infer<typeof articleItemSchema>

export type CreateArticleData = z.infer<typeof createArticleSchema>
export type EditArticleData = z.infer<typeof editArticleSchema>

// ============================================
// API Request/Response Types
// ============================================
export type CreateArticleRequest = CreateArticleData
export type UpdateArticleRequest = EditArticleData

export type ArticleListResponse = z.infer<typeof articleListResponseSchema>
export type ArticleDetailResponse = z.infer<typeof articleDetailResponseSchema>

export type ArticleQueryParams = z.infer<typeof articleParamsSchema>

// ============================================
// Helper Types
// ============================================
export type ArticleStatus = 'draft' | 'published' | 'unpublished'
