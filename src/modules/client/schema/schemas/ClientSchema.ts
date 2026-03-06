import { Metadata, ParamsSchema, PictureSchema, StatusRequired, StringNullAndOptional } from "@/constants/SchemaConstants";
import * as z from "zod"

export const clientParamsSchema = ParamsSchema.extend({
    f_email: z.string().optional(),
    f_firstName: z.string().optional(),
    f_lastName: z.string().optional(),
    embed: z.string()
});

export const clientRequestSchema = z.object({
    countryCode: StringNullAndOptional,
    phoneNumber: z.string(),
    status: z.string()
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

export const clientListItemSchema = z.object({
    fullName: z.string(),
    id: z.string(),
    firstName: z.string(),
    middleName: z.string(),
    lastName: z.string(),
    birthDate: z.string(),
    email: z.email(),
    phoneNumber: z.string(),
    googleId: z.string(),
    appleId: z.string(),
    status: StatusRequired,
    verifiedEmail: z.boolean(),
    countryCode: z.string(),
    verifiedPhoneNumber: z.boolean(),
    updatedBy: StringNullAndOptional,
    deletedBy: StringNullAndOptional,
    deActiveAt: StringNullAndOptional,
    isExternal: z.boolean(),
    createdAt: z.string(),
    updatedAt: StringNullAndOptional,
    address: z.object({
        fullAddress: StringNullAndOptional
    }),
    picture: PictureSchema
})

export const clientListSchema = z.object({
    message: z.string(),
    data: z.array(clientListItemSchema),
    metadata: Metadata
})

export const clientResponseSchema = z.object({
    message: z.string(),
    data: clientListItemSchema
})
