import * as z from "zod"
import type { caresListItemSchema, caresListSchema, caresResponseSchema, caresParamsSchema } from "../schemas/CareSchema";

export type caresParams = z.infer<typeof caresParamsSchema>;

export type caresListItem = z.infer<typeof caresListItemSchema>;

export type caresList = z.infer<typeof caresListSchema>

export type caresResponse = z.infer<typeof caresResponseSchema>
