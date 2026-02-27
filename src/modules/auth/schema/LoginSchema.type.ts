import * as z from "zod";
import type { loginSchema, loginResponseSchema } from "./LoginSchema";

export type loginRequest = z.infer<typeof loginSchema>;
export type loginResponse = z.infer<typeof loginResponseSchema>