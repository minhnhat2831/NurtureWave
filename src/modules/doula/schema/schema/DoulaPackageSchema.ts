import { Metadata, ParamsSchema, PictureSchema, StatusRequired, StringNullAndOptional } from "@/constants/SchemaConstants";
import z from "zod";

export const doulaPackageParamsSchema = ParamsSchema.extend({
    f_doulaId: StringNullAndOptional,
})

export const doulaPackageListItemSchema = z.object({
    id: z.string(),
    doulaId: z.string(),
    name: z.string(),
    price: z.string(),
    numberOfClients: z.number(),
    createdAt: z.string(),
    doula: {
        id: z.string(),
        user: z.object({
            fullName: z.string(),
            middleName: z.string(),
            id: z.string(),
            firstName: z.string(),
            lastName: z.string(),
        }).nullable(),
    },
    picture: PictureSchema
})

export const doulaPackageListSchema = z.object({
    message: z.string(),
    data: z.array(doulaPackageListItemSchema),
    metadata: Metadata
})

export const caresListItemSchema = z.object({
    id: z.string().nullable(),
    createdAt: z.string(),
    status: StatusRequired,
    user: z.object({
        fullName: StringNullAndOptional,
        lastName: StringNullAndOptional,
        firstName: StringNullAndOptional,
        middleName: StringNullAndOptional,
        email: StringNullAndOptional,
        status: StatusRequired,
        picture2: StringNullAndOptional,
        picture: PictureSchema
    })
})

export const doulaPackageDetailSchema = z.object({
    id: z.string(),
    doulaId: z.string(),
    name: z.string(),
    price: z.string(),
    description: z.string(),
    shortDescription: z.string(),
    image: z.string().nullable(),
    qualifications: z.number(),
    createdAt: z.string(),
    updatedAt: StringNullAndOptional,
    deletedAt: StringNullAndOptional,
    cares: z.array(caresListItemSchema),
    doula: z.object({
    id: z.string(),
    user: z.object({
        fullName: z.string(),
        middleName: z.string(),
        id: z.string(),
        firstName: z.string(),
        lastName: z.string(),
    }).nullable(),
    }),
    picture: PictureSchema
})

export const doulaPackageDetailResponseSchema  = z.object({
    message: z.string(),
    data: doulaPackageDetailSchema
})