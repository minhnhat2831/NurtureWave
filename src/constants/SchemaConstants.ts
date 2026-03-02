import * as z from 'zod'

const required = 'This field is required'

export const StringNullAndOptional = z.string().nullable().optional()
export const NumberNullAndOptional = z.number().nullable().optional()
export const StringRequired = z.string().min(1, required)
export const NumberRequired = z.number().min(1, required)
export const EmailRequired = z.string().email({ message: 'Invalid email address' }).min(1, required)
export const StatusRequired = z.enum(['active', 'inactive'])

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