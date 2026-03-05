import z from "zod";

const price = z.object({
    name: z.string(),
    amount: z.number(),
    count: z.number(),
    interval: z.string(),
    description: z.string()
})

export const doulaSubcriptionListItemSchema = z.object({
    id: z.string(),
    subscriptionPlanName: z.string(),
    endTime: z.string().nullable(),
    status: z.enum(["active", "cancelled"]),
    createdAt: z.string(),
    subscription: z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        price: z.array(price)
    }),
    price: z.object({
        name: z.string(),
        amount: z.number(),
        count: z.number(),
        interval: z.string(),
        description: z.string()
    }),
    nextBillingDate: z.string().nullable()
})

export const doulaSubcriptionListSchema = z.object({
    message : z.string(),
    data : doulaSubcriptionListItemSchema
})