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
}).superRefine((data, ctx) => {
  if (data.password && data.password.length > 0 && data.password.length < 8) {
    ctx.addIssue({
      path: ["password"],
      message: "Password must be at least 8 characters long",
      code: z.ZodIssueCode.custom,
    });
  }
  if(data.username && data.username.length < 3) {
    ctx.addIssue({
      path: ["username"],
      message: "Username must be at least 3 characters long",
      code: z.ZodIssueCode.custom,
    });
  }
});

export const editAdminUserSchema = z.object({
  username: SchemaConstants.StringRequired,
  password: SchemaConstants.StringNullAndOptional,
  email: SchemaConstants.EmailRequired,
  firstName: SchemaConstants.StringRequired,
  lastName: SchemaConstants.StringRequired,
  status: SchemaConstants.StringRequired,
}).superRefine((data, ctx) => {
  if (data.password && data.password.length > 0 && data.password.length < 8) {
    ctx.addIssue({
      path: ["password"],
      message: "Password must be at least 8 characters long",
      code: z.ZodIssueCode.custom,
    });
  }
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