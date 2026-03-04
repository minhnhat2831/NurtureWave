import * as SchemaConstants from "@/constants/SchemaConstants";
import * as z from "zod";

export const adminListItemSchema = z.object({
  id: SchemaConstants.StringNullAndOptional,
  username: SchemaConstants.StringRequired,
  firstName: SchemaConstants.StringNullAndOptional,
  lastName: SchemaConstants.StringNullAndOptional,
  email: SchemaConstants.EmailRequired,
  role: SchemaConstants.StringNullAndOptional,
  status: SchemaConstants.StatusRequired,
  createdAt: SchemaConstants.StringNullAndOptional,
  updatedAt: SchemaConstants.StringNullAndOptional,
})

export const createAdminUserSchema = z.object({
  username: SchemaConstants.StringRequired,
  password: SchemaConstants.StringRequired,
  email: SchemaConstants.EmailRequired,
  firstName: SchemaConstants.StringRequired,
  lastName: SchemaConstants.StringRequired,
  status: SchemaConstants.StringRequired,
});

export const editAdminUserSchema = z.object({
  username: SchemaConstants.StringRequired,
  password: SchemaConstants.StringNullAndOptional,
  email: SchemaConstants.EmailRequired,
  firstName: SchemaConstants.StringRequired,
  lastName: SchemaConstants.StringRequired,
  status: SchemaConstants.StringRequired,
});

export const adminListSchema = z.object({
  message: z.string(),
  data: z.array(adminListItemSchema),
  metadata: SchemaConstants.Metadata
})

export const adminResponseSchema = z.object({
  message: z.string(),
  data: z.boolean()
})


export const adminDetailResponseSchema = z.object({
  message: z.string(),
  data: adminListItemSchema
})

export const adminsParamsSchema = SchemaConstants.ParamsSchema.extend({
  f_username: SchemaConstants.StringNullAndOptional,
  f_email: SchemaConstants.StringNullAndOptional,
});