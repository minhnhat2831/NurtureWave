import * as z from 'zod'
import { StringNullAndOptional, ParamsSchema, Metadata, StringRequired, NumberRequired, NumberRequiredMinZero, VoucherTypeRequired } from '@/constants/SchemaConstants'

export const voucherItemSchema = z.object({
  id: z.string(),
  code: z.string(),
  description: StringNullAndOptional,
  startDate: z.string(),
  endDate: z.string(),
  status: z.enum(['active', 'inactive', 'expired']),
  type: z.enum(['fixed', 'percentage']),
  amount: z.string(), // API returns string
  quantityUse: z.number(), // Total quantity
  minPayAmount: z.string(), // API returns string
  maxDiscountAmount: StringNullAndOptional,
  stripeCouponId: z.string().nullable().optional(),
  createdBy: z.string(),
  updatedBy: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  numOfUsed: z.string(), 
})

export const voucherUsageItemSchema = z.object({
  id: z.string(),
  takenBy: z.string().nullable().optional(),
  takenDate: z.string(),
})

// Schema for doula voucher usage from /admins/doula-vouchers
export const doulaVoucherUsageSchema = z.object({
  id: z.string(),
  doulaId: z.string().optional(),
  voucherId: z.string().optional(),
  usedAt: z.string().optional(),
  createdAt: z.string().optional(),
  doulaUser: z.object({
    id: z.string().optional(),
    fullName: z.string().optional(),
    firstName: z.string().optional(),
  }).optional(),
})

export const doulaVoucherUsageListResponseSchema = z.object({
  message: z.string(),
  data: z.array(doulaVoucherUsageSchema),
  metadata: Metadata,
})

export const voucherListResponseSchema = z.object({
  message: z.string(),
  data: z.array(voucherItemSchema),
  metadata: Metadata,
})

export const voucherDetailResponseSchema = z.object({
  message: z.string(),
  data: voucherItemSchema,
})

export const voucherDetailWithUsageResponseSchema = z.object({
  message: z.string(),
  data: z.object({
    voucher: voucherItemSchema,
    usageHistory: z.array(voucherUsageItemSchema),
    metadata: Metadata,
  }),
})


export const voucherParamsSchema = ParamsSchema.extend({
  f_code: z.string().optional(),
  f_status: z.enum(['active', 'inactive', 'expired']).optional(),
  f_type: z.enum(['fixed', 'percentage']).optional(),
})


export const createVoucherSchema = z.object({
  code: StringRequired.max(50, 'Code must be at most 50 characters'),
  description: z.string().optional(),
  startDate: StringRequired,
  endDate: StringRequired,
  quantityUse: NumberRequired,
  type: VoucherTypeRequired,
  amount: NumberRequiredMinZero,
  minPayAmount: NumberRequiredMinZero,
  maxDiscountAmount: NumberRequiredMinZero,
})
