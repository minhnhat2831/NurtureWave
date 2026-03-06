import * as z from 'zod'

// Validation message constant
export const REQUIRED_MESSAGE = 'This field is required.'

export const StringNullAndOptional = z.string().nullable().optional()
export const StringRequired = z.string().min(1, REQUIRED_MESSAGE)
export const NumberRequired = z.union([z.number(), z.undefined()])
  .refine((val) => val !== undefined && val >= 1, {
    message: REQUIRED_MESSAGE,
  })
export const NumberRequiredMinZero = z.union([z.number(), z.undefined()])
  .refine((val) => val !== undefined && val >= 0, {
    message: REQUIRED_MESSAGE,
  })
export const EmailRequired = z.string().email({ message: REQUIRED_MESSAGE }).min(1, REQUIRED_MESSAGE)
export const StatusRequired = z.enum(['active', 'inactive'])
export const ArticleStatusRequired = z.enum(['draft', 'published', 'unpublished'], { message: REQUIRED_MESSAGE })
export const VoucherTypeRequired = z.enum(['fixed', 'percentage'], { message: REQUIRED_MESSAGE })
export const VoucherStatusRequired = z.enum(['active', 'inactive', 'expired'], { message: REQUIRED_MESSAGE })

export const ParamsSchema = z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
    offset: z.number().optional(),
    search: z.string().optional(),
    sort: z.string().optional(),
});

export const Metadata = z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
    totalPages: z.number().optional(),
    totalCount: z.number().optional(),
    hasNextPage: z.boolean()
})

export type ParamsType = z.infer<typeof ParamsSchema>
export type MetadataType = z.infer<typeof Metadata>