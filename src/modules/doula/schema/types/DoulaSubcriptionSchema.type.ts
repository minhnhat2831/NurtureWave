import z from "zod";
import type { doulaSubcriptionListItemSchema, doulaSubcriptionListSchema } from "../schema/DoulaSubcriptionSchema";

export type doulaSubcriptionListItem = z.infer<typeof doulaSubcriptionListItemSchema>

export type doulaSubcriptionList = z.infer<typeof doulaSubcriptionListSchema>
