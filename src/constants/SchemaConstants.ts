import * as z from 'zod'

const required = 'This field is required'

export const StringNullAndOptional = z.string().nullable().optional()
export const NumberNullAndOptional = z.number().nullable().optional()
export const StringRequired = z.string().min(1, required)
export const NumberRequired = z.number().min(1, required)