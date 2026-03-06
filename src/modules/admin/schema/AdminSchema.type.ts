import * as z from "zod";
import type { adminDetailResponseSchema, adminListItemSchema, adminListSchema, adminResponseSchema, adminsParamsSchema, createAdminUserSchema, editAdminUserSchema } from "./AdminSchema";

export type adminListItem = z.infer<typeof adminListItemSchema>

export type createAdminUser = z.infer<typeof createAdminUserSchema>
export type editAdminUser = z.infer<typeof editAdminUserSchema>
export type adminList = z.infer<typeof adminListSchema>
export type adminResponse = z.infer<typeof adminResponseSchema>

export type adminsParams = z.infer<typeof adminsParamsSchema>
export type adminDetailResponse = z.infer<typeof adminDetailResponseSchema>