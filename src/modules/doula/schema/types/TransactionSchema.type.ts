import * as z from "zod";
import type { transactionDetailListSchema, transactionDetailSchema, transactionListItemSchema, transactionListSchema, transactionParamsSchema } from "../schema/TransactionSchema";

export type transactionParams = z.infer<typeof transactionParamsSchema>;

export type transactionListItem = z.infer<typeof transactionListItemSchema>

export type transactionList = z.infer<typeof transactionListSchema>

export type transactionDetail = z.infer<typeof transactionDetailSchema>

export type transactionDetailList = z.infer<typeof transactionDetailListSchema>
