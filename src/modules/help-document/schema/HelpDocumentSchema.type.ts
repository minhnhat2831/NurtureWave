import * as z from "zod"
import type { deleteHelpDocumentResponseSchema, helpDocumentListItemSchema, helpDocumentListSchema, helpDocumentParamsSchema, helpDocumentRequestSchema, helpDocumentResponseSchema } from "./HelpDocumentSchema";

export type helpDocumentParams = z.infer<typeof helpDocumentParamsSchema>
export type helpDocumentRequest = z.infer<typeof helpDocumentRequestSchema>;
export type helpDocumentListItem = z.infer<typeof helpDocumentListItemSchema>;
export type helpDocumentList = z.infer<typeof helpDocumentListSchema>;
export type helpDocumentResponse= z.infer<typeof helpDocumentResponseSchema>;
export type deleteHelpDocumentResponse= z.infer<typeof deleteHelpDocumentResponseSchema>;