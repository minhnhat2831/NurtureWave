import { Metadata, ParamsSchema, StatusRequired, StringNullAndOptional } from "@/constants/SchemaConstants";
import * as z from "zod";

export const doulaReviewParamsSchema = ParamsSchema.extend({
    f_doulaId: StringNullAndOptional,
});

export const doulaReviewListItemSchema = z.object({
    id: z.string(),
    doulaId: z.string(),
    userId:  z.string(),
    comment:  z.string(),
    start:  z.number(),
    expertiseStar: z.number(),
    communicationStar: z.number(),
    punctualityStar: z.number(),
    supportStar: z.number(),
    createdAt: z.string(),
    updatedAt: z.string().nullable(),
    user: z.object({
        fullName: z.string(),
        firstName: z.string(),
        middleName: z.string(),
        lastName: z.string(),
        picture: z.string()
    })
})

export const doulaReviewListSchema = z.object({
    message: z.string(),
    data: z.array(doulaReviewListItemSchema),
    metadata: Metadata
})

export const doulaOverReviewParamsSchema = z.object({
    doulaId : StringNullAndOptional
});

export const doulaOverReviewListItemSchema = z.object({
    id:  z.string(),
    title:  z.string(),
    description:  z.string(),
    businessName:  z.string(),
    starAvg:  z.number(),
    status: StatusRequired,
    qualifications: z.string().array(),
    stripeCustomerId: z.string(),
    isTrialed: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string().nullable(),
    avgStart: z.string(),
    avgExpertiseStar: z.string(),
    avgCommunicationStar: z.string(),
    avgPunctualityStar: z.string(),
    avgSupportStar: z.string(),
    totalReview: z.number(),
})

export const doulaOverReviewResponseSchema = z.object({
    message : z.string(),
    data : doulaOverReviewListItemSchema
});