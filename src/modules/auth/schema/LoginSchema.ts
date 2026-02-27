import * as z from 'zod'
import { StringRequired, StringNullAndOptional } from '@/constants/SchemaConstants'

export const loginSchema = z.object({
    username : StringRequired,
    password : StringRequired
})

export const loginResponseSchema = z.object({
    message: z.string(),
    data: z.object({
        admin: z.object({
            id: z.string(),
            username: z.string(),
            firstName: z.string(),
            lastName: z.string(),
            role: z.string(),
            status: z.enum(["active", "inactive"]),
            email: z.email(),
            picture: StringNullAndOptional,
            createAt: z.string(),
            deletedAt: StringNullAndOptional,
            updatedAt: StringNullAndOptional,
        }),
        tokens: z.object({
            accessToken: z.string(),
            refreshToken: z.string(),
        })
    })
})