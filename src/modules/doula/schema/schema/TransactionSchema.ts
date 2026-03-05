import { Metadata, ParamsSchema, StatusRequired, StringNullAndOptional } from "@/constants/SchemaConstants";
import * as z from "zod";

export const transactionParamsSchema = ParamsSchema.extend({
    f_doulaId: StringNullAndOptional,
});

export const transactionListItemSchema = z.object({
    id: z.string(),
    stripeInvoiceId: z.string(),
    stripeSubscriptionId:  z.string(),
    stripeCustomerId:  z.string(),
    amount:  z.number(),
    last4: z.number(),
    totalAmount: z.number(),
    type: z.string(),
    brand: z.string(),
    status: z.enum(["active", "failed"]),
    discount: z.number(),
    createdAt: z.string(),
    updatedAt: z.string().nullable(),
    deletedAt: z.string().nullable(),
})

export const transactionListSchema = z.object({
    message: z.string(),
    data: z.array(transactionListItemSchema),
    metadata: Metadata
})

export const transactionDetailSchema = z.object({
    id: z.string(),
    stripeInvoiceId: z.string(),
    doulaId:  z.string(),
    doulaSubscriptionId:  z.string(),
    amount:  z.number(),
    last4: z.number(),
    totalAmount: z.number(),
    type: z.string(),
    brand: z.string(),
    status: z.enum(["active", "failed"]),
    discount: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string(),
    doulaSubscription: z.object({
        id: z.string(),
        subscriptionPlanName: z.string(),
        status: StatusRequired,
        subscription: z.object({
            id: z.string(),
            name: z.string()
        })
    })
})

export const transactionDetailListSchema = z.object({
    message: z.string(),
    data: z.array(transactionDetailSchema),
    metadata: Metadata
})