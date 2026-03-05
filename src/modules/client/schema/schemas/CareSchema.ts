import { Metadata, ParamsSchema, StatusRequired } from "@/constants/SchemaConstants";
import * as z from "zod"

export const caresParamsSchema = ParamsSchema.extend({
    f_userId: z.string().optional(),
    f_doulaId: z.string().optional(),
    f_status: z.string().optional(),
});

export const caresListItemSchema = z.object({
    id: z.string().nullable(),
    doulaId: z.string().nullable(),
    userId: z.string().nullable(),
    title: z.string().nullable(),
    doulaPackageId: z.string().nullable(),
    status: StatusRequired,
    startDate: z.string().nullable(),
    createdAt: z.string().nullable(),
    updatedAt: z.string().optional(),
    deletedAt: z.string().optional(),
    endDate: z.string().optional(),
    user: z.object({
        fullName: z.string().nullable(),
        middleName: z.string().nullable(),
        picture: z.string().nullable(),
        firstName: z.string().nullable(),
        lastName: z.string().nullable(),
    }).nullable(),
    doula: z.object({
        title: z.string(),
        user: z.object({
            fullName: z.string(),
            middleName: z.string(),
            picture: z.string(),
            firstName: z.string(),
            lastName: z.string(),
        }).nullable(),
    }).nullable(),
    doulaPackage: z.object({
        name: z.string(),
    }).nullable(),
});

export const caresListSchema = z.object({
    message: z.string(),
    data: z.array(caresListItemSchema),
    metadata: Metadata
})

export const caresResponseSchema = z.object({
    message: z.string(),
    data: caresListItemSchema
})