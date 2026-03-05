import * as z from "zod"
import type { 
    deleteDoulaResponseSchema, 
    doulaDetailResponseSchema, 
    doulaDetailSchema, 
    doulaListItemSchema, 
    doulaListSchema, 
    doulaParamsSchema, 
    doulaRequestSchema, 
    doulaResponseSchema 
} from "../schema/DoulaSchema";

export type doulaRequest = z.infer<typeof doulaRequestSchema>;

export type doulaParams = z.infer<typeof doulaParamsSchema>;

export type doulaListItem = z.infer<typeof doulaListItemSchema>

export type doulaList = z.infer<typeof doulaListSchema>

export type doulaResponse = z.infer<typeof doulaResponseSchema>

export type deleteDoulaResponse = z.infer<typeof deleteDoulaResponseSchema>

export type doulaDetail = z.infer<typeof doulaDetailSchema>

export type doulaDetailResponse = z.infer<typeof doulaDetailResponseSchema>
