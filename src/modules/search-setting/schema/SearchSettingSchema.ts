import { Metadata, ParamsSchema, StringRequired } from "@/constants/SchemaConstants";
import * as z from "zod";

export const searchSettingRequestScheme = z.object({
    keyword: StringRequired,
})

export const searchSettingParamsScheme = ParamsSchema.extend({
})

export const searchSettingListItemScheme = z.object({
    id: z.string(),
    keyword: z.string(),
    count: z.number(),
    isSuggestion: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string().nullable()
})

export const searchSettingListScheme = z.object({
    message: z.string(),
    data: z.array(searchSettingListItemScheme),
    metadata: Metadata
})

export const searchSettingResponseScheme = z.object({
    message : z.string(),
    data : z.boolean()
})