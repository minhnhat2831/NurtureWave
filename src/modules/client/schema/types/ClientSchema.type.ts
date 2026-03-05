import * as z from "zod"
import type { clientListItemSchema, clientListSchema, clientRequestSchema, clientResponseSchema, clientParamsSchema } from "../schemas/ClientSchema";


export type clientParams = z.infer<typeof clientParamsSchema>;

export type clientRequest = z.infer<typeof clientRequestSchema>;

export type clientListItem = z.infer<typeof clientListItemSchema>

export type clientList = z.infer<typeof clientListSchema>

export type clientResponse = z.infer<typeof clientResponseSchema>
