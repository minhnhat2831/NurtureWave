import { Metadata, ParamsSchema, StatusRequired, StringNullAndOptional, StringRequired } from "@/constants/SchemaConstants"
import * as z from "zod"

export const helpDocumentParamsSchema = ParamsSchema.extend({
})

export const helpDocumentRequestSchema = z.object(
{
    title: StringRequired,
    content: StringRequired,
    status: StringRequired,
})

export const helpDocumentListItemSchema = z.object(
{
    id: z.string(),
    createdAt: z.string(),
    updatedAt: StringNullAndOptional,
    deletedAt: StringNullAndOptional,
    title: z.string(),
    content: z.string(),
    status: StatusRequired,
})

export const helpDocumentListSchema = z.object(
{
    message: z.string(),
    data: z.array(helpDocumentListItemSchema),
    metadata: Metadata
})

export const helpDocumentResponseSchema = z.object(
{
    message : z.string(),
    data : helpDocumentListItemSchema
})

export const deleteHelpDocumentResponseSchema = z.object(
{
    message : z.string(),
    data : z.boolean()
})