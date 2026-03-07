import type { z } from 'zod'
import type {
  voucherItemSchema,
  voucherListResponseSchema,
  voucherDetailResponseSchema,
  voucherDetailWithUsageResponseSchema,
  voucherUsageItemSchema,
  doulaVoucherUsageSchema,
  doulaVoucherUsageListResponseSchema,
  voucherParamsSchema,
  createVoucherSchema,
} from './VoucherSchema'

/**
 * VOUCHER MODULE TYPES
 * TypeScript types inferred from Zod schemas
 */

// ============================================
// Core Types
// ============================================
export type Voucher = z.infer<typeof voucherItemSchema>
export type VoucherUsage = z.infer<typeof voucherUsageItemSchema>
export type DoulaVoucherUsage = z.infer<typeof doulaVoucherUsageSchema>

// ============================================
// API Request/Response Types
// ============================================
export type VoucherListResponse = z.infer<typeof voucherListResponseSchema>
export type VoucherDetailResponse = z.infer<typeof voucherDetailResponseSchema>
export type VoucherDetailWithUsageResponse = z.infer<typeof voucherDetailWithUsageResponseSchema>
export type DoulaVoucherUsageListResponse = z.infer<typeof doulaVoucherUsageListResponseSchema>

export type VoucherQueryParams = z.infer<typeof voucherParamsSchema>

// ============================================
// Form Data Types
// ============================================
export type CreateVoucherData = z.infer<typeof createVoucherSchema>

// ============================================
// Helper Types
// ============================================
export type VoucherStatus = 'active' | 'inactive' | 'expired'
export type VoucherType = 'fixed' | 'percentage'
