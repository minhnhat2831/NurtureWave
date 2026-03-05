import { Metadata, ParamsSchema, PictureSchema, StringNullAndOptional } from "@/constants/SchemaConstants";
import * as z from "zod"

const userSchema = z.object({
    countryCode: StringNullAndOptional,
    phoneNumber: z.string()
}).superRefine((data, ctx) => {
    console.log(data.phoneNumber && data.phoneNumber.length > 8 && data.phoneNumber.length < 20)
    if(data.phoneNumber && data.phoneNumber.length < 8 && data.phoneNumber.length < 20){
        ctx.addIssue({
            path : ["phoneNumber"],
            message : "Phone number must be from 8 to 20 characters",
            code : z.ZodIssueCode.custom
        })
    }
})

export const doulaRequestSchema = z.object(
    {
        user: userSchema,
        status: z.string(),
    })

export const doulaParamsSchema = ParamsSchema.extend({
    f_title: StringNullAndOptional,
});

export const doulaListItemSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    businessName: z.string(),
    status: z.string(),
    createdAt: z.string(),
    updatedAt: StringNullAndOptional,
    deletedAt: StringNullAndOptional,
    cometChatUid: z.string(),
    user: z.object({
        fullName: z.string(),
        firstName: z.string(),
        middleName: z.string(),
        lastName: z.string(),
        birthDate: z.string(),
        email: z.string(),
        phoneNumber: z.string(),
        countryCode: z.string(),
    }),
    address: z.object({
        id: z.string().optional(),
        fullAddress: z.string().optional()
    }),
    picture: PictureSchema
})

export const doulaListSchema = z.object({
    message: z.string(),
    data: z.array(doulaListItemSchema),
    metadata: Metadata
})

export const doulaResponseSchema = z.object({
    message: z.string(),
    data: doulaListItemSchema
})

export const deleteDoulaResponseSchema = z.object({
    message: z.string(),
    data: z.boolean()
})

const categories = z.object({
    id: z.string(),
    image: z.string(),
    name: z.string(),
    title: z.string()
})

const photo = z.object({
    id : z.string(),
    media : PictureSchema
})

export const doulaDetailSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    businessName: z.string(),
    status: z.string(),
    createdAt: z.string(),
    isTrialed: z.boolean(),
    stripeCustomerId: z.string(),
    photos: z.array(photo),
    picture: PictureSchema,
    qualifications: z.string().array(),
    updatedAt: z.string().nullable(),
    deletedAt: z.string().nullable(),
    deletedBy: z.string().nullable(),
    cometChatUid: z.string(),
    starAvg : z.number(),
    user: z.object({
        fullName: z.string(),
        firstName: z.string(),
        middleName: z.string(),
        lastName: z.string(),
        birthDate: z.string(),
        phoneNumber: z.string(),
        email: z.email(),
        countryCode: z.string(),
        id: z.string()
    }),
    address: z.object({
        id: z.string().optional(),
        fullAddress: z.string().optional()
    }),
    categories: z.array(categories)
})

export const doulaDetailResponseSchema = z.object({
    message: z.string(),
    data: doulaDetailSchema
})