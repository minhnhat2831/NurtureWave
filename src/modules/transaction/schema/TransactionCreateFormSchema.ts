import * as z from "zod"
import { REQUIRED_MESSAGE, StringRequired } from "@/constants/SchemaConstants"
import { getTransactionConfig } from "../constants"

const RequiredSelectString = z.preprocess(
  (value) => (value === null || value === undefined ? "" : value),
  StringRequired
)

export const transactionCreateFormSchema = z.object({
  data: z.object({
    transactionType: RequiredSelectString,
    status: RequiredSelectString,
    clientName: z.string().optional(),
    subOrgName: z.string().optional(),
    transactionId: z.string().optional(),
    isin: z.string().optional(),
    currency: z.string().optional().default(""),
    amount: z.number().optional(),
    feesAmt: z.number().nullable().optional(),
    gstAmt: z.number().nullable().optional(),
    bankChargesAmt: z.number().nullable().optional(),
    effectiveDo: z.string().optional().default(""),
    bankAccountUid: z.string().optional().default(""),
    description: z.string().optional().default(""),
    createdDo: StringRequired,
    comments: z.string().nullable().optional(),
    files: z.array(z.instanceof(File)).optional(),
    couponPaymentRate: z.number().optional(),
    paymentDo: z.string().optional().default(""),
    couponPayments: z.array(z.object({
      bankAccountTo: z.string().optional().default(""),
      cashOrderAmt: z.number().nullable().optional(),
      clientName: z.string().optional().default(""),
      organizationNum: z.string().optional().default(""),
      subOrganizationNum: z.string().optional().default(""),
      subAccountNum: z.string().nullable().optional(),
      effectiveValueAmt: z.number().optional().default(0),
      currency: z.string().optional().default(""),
    })).optional().default([]),
  }),
}).superRefine((value, ctx) => {
  const { transactionType } = value.data
  const req = (path: string) =>
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: REQUIRED_MESSAGE, path: ["data", path] })

  if (transactionType === "Coupon Payment") {
    if (!value.data.isin) req("isin")
    if (value.data.couponPaymentRate == null || value.data.couponPaymentRate <= 0) req("couponPaymentRate")
    if (!value.data.paymentDo) req("paymentDo")
    if (!value.data.description) req("description")
    if ((value.data.couponPayments || []).length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: REQUIRED_MESSAGE,
        path: ["data", "couponPayments"],
      })
    }
    ;(value.data.couponPayments || []).forEach((row, idx) => {
      if (!row.bankAccountTo)
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: REQUIRED_MESSAGE, path: ["data", "couponPayments", idx, "bankAccountTo"] })
      if (row.cashOrderAmt == null || row.cashOrderAmt <= 0)
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: REQUIRED_MESSAGE, path: ["data", "couponPayments", idx, "cashOrderAmt"] })
    })
    return
  }

  if (!value.data.currency) req("currency")
  if (value.data.amount === undefined) req("amount")
  if (!value.data.effectiveDo) req("effectiveDo")
  if (!value.data.bankAccountUid) req("bankAccountUid")
  if (!value.data.description) req("description")

  const config = getTransactionConfig(transactionType)
  if (config.showFees && value.data.feesAmt == null) req("feesAmt")
  if (config.showGstAmount && value.data.gstAmt == null) req("gstAmt")
  if (config.showBankCharges && value.data.bankChargesAmt == null) req("bankChargesAmt")
})

export type TransactionCreateFormInput = z.input<typeof transactionCreateFormSchema>
export type TransactionCreateFormValues = z.output<typeof transactionCreateFormSchema>

const formatDateForInput = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export const getTransactionCreateDefaultValues = (): TransactionCreateFormInput => ({
  data: {
    transactionType: "",
    status: "",
    clientName: "-",
    subOrgName: "-",
    transactionId: "-",
    isin: "",
    currency: "",
    amount: undefined,
    feesAmt: undefined,
    gstAmt: undefined,
    bankChargesAmt: undefined,
    effectiveDo: formatDateForInput(new Date()),
    bankAccountUid: "",
    description: "",
    createdDo: formatDateForInput(new Date()),
    comments: "",
    files: [],
    couponPaymentRate: undefined,
    paymentDo: formatDateForInput(new Date()),
    couponPayments: [],
  },
})
