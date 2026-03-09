import type { z } from 'zod'
import type {
  pdSessionItemSchema,
  createPDSessionSchema,
  editPDSessionSchema,
  pdSessionListResponseSchema,
  pdSessionDetailResponseSchema,
  pdSessionParamsSchema,
} from './PDSessionSchema'

/**
 * PD SESSION MODULE TYPES
 * TypeScript types inferred from Zod schemas
 */

// ============================================
// Core Types
// ============================================
export type PDSession = z.infer<typeof pdSessionItemSchema>

export type CreatePDSessionData = z.infer<typeof createPDSessionSchema>
export type EditPDSessionData = z.infer<typeof editPDSessionSchema>

// ============================================
// API Request/Response Types
// ============================================
export type CreatePDSessionRequest = CreatePDSessionData
export type UpdatePDSessionRequest = EditPDSessionData

export type PDSessionListResponse = z.infer<typeof pdSessionListResponseSchema>
export type PDSessionDetailResponse = z.infer<typeof pdSessionDetailResponseSchema>

export type PDSessionQueryParams = z.infer<typeof pdSessionParamsSchema>

// ============================================
// Helper Types
// ============================================
export type PDSessionStatus = 'draft' | 'published' | 'unpublished'
