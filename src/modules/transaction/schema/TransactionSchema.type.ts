import * as z from 'zod'
import type { 
    cashTransactionCouponPayloadListSchema, 
    cashTransactionCouponPayloadSchema, 
    cashTransactionDebitPayloadListSchema, 
    cashTransactionDebitPayloadSchema, 
    cashTransactionFormListSchema, 
    cashTransactionFormSchema, 
    cashTransactionDetailListSchema, 
    cashTransactionDetailSchema, 
    cashTransactionDetailPayloadSchema 
} from './TransactionSchema'

//Debit
export type cashTransactionDebitPayload = z.infer<typeof cashTransactionDebitPayloadSchema>
export type cashTransactionDebitList = z.infer<typeof cashTransactionDebitPayloadListSchema>

//Coupon
export type cashTransactionCouponPayload = z.infer<typeof cashTransactionCouponPayloadSchema>
export type cashTransactionCouponList = z.infer<typeof cashTransactionCouponPayloadListSchema>

//Form
export type cashTransactionForm = z.infer<typeof cashTransactionFormSchema>
export type cashTransactionFormList = z.infer<typeof cashTransactionFormListSchema>

//Detail
export type cashTransactionDetailList = z.infer<typeof cashTransactionDetailListSchema>
export type cashTransactionDetail = z.infer<typeof cashTransactionDetailSchema>
export type cashTransactionDetailPayload =  z.infer<typeof cashTransactionDetailPayloadSchema>