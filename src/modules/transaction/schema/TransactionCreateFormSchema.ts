import * as z from "zod"
import { REQUIRED_MESSAGE, StringRequired } from "@/constants/SchemaConstants"
import { getTransactionConfig, isCouponPaymentTransactionType } from "../constants"

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

  if (isCouponPaymentTransactionType(typeof transactionType === "string" ? transactionType : "")) {
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
    ; (value.data.couponPayments || []).forEach((row, idx) => {
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

export const couponPaymentSchema = z.object({
  paymentDate: z.string(),
  amount: z.number()
});

export type cashTransactionList = z.infer<typeof cashTransactionListSchema>
export const cashTransactionListSchema = z.object({
  id: z.number(),
  parentId: z.number().nullable(),

  transactionId: z.string(),
  parentTransactionId: z.string().nullable(),

  cashOrderNum: z.string().nullable(),
  couponOrderNum: z.string().nullable(),

  orderStatus: z.string(),
  orderStatusAlias: z.string(),

  orgNum: z.string(),
  orgName: z.string(),

  subOrgNum: z.string().nullable(),
  subOrgName: z.string().nullable(),

  bankAccountUid: z.string().nullable(),
  bankAccountName: z.string().nullable(),
  bankAccountNum: z.string().nullable(),

  transactionType: z.string(),
  transactionCategory: z.string(),

  createDo: z.string(),
  effectiveDo: z.string().nullable(),

  isin: z.string().nullable(),
  securityName: z.string().nullable(),

  currency: z.string(),
  amount: z.number(),

  description: z.string().nullable(),
  submitType: z.string(),
  referenceNum: z.string().nullable(),

  netAmt: z.number().nullable(),
  feesAmt: z.number().nullable(),
  gstAmt: z.number().nullable(),
  bankChargesAmt: z.number().nullable(),
  cashOrderAmt: z.number().nullable(),

  debit: z.number().nullable(),
  credit: z.number().nullable(),

  runningBal: z.number().nullable(),

  payDt: z.string().nullable(),

  couponPaymentRate: z.number().nullable(),
  valueOfSettledHolding: z.number().nullable(),

  postedTo: z.string().nullable(),

  productOrderableType: z.string().nullable(),
  orderTransactionId: z.string().nullable(),

  bankAccountTxId: z.string().nullable(),
  groupId: z.string().nullable(),

  files: z.array(z.any()).nullable(),
  comments: z.string().nullable(),

  couponPayments: z.array(couponPaymentSchema).nullable(),
  totalCouponAmount: z.number().nullable(),

  inBeneficiaryAccountName: z.string().nullable(),
  inBeneficiaryAccountNumber: z.string().nullable(),

  needToReplaceFloatToCma: z.boolean()
});

export type cashTransactionDetail = z.infer<typeof cashTransactionDetailSchema>
export const cashTransactionDetailSchema = z.object({
  cashOrderData: z.object({
    transactionId: z.string(),
    cashOrderNum: z.string().nullable(),
    couponOrderNum: z.string().nullable(),
    amount: z.number(),
    orderStatus: z.string(),
    orderStatusAlias: z.string(),

    orgNum: z.string(),
    orgName: z.string(),
    subOrgNum: z.string(),
    subOrgName: z.string(),

    bankAccountUid: z.string(),
    bankAccountName: z.string(),
    bankAccountNum: z.string(),

    transactionType: z.string(),
    transactionCategory: z.string(),

    createDo: z.string(),
    effectiveDo: z.string().nullable(),

    isin: z.string().nullable(),
    currency: z.string(),

    description: z.string(),
    submitType: z.string(),

    netAmt: z.number(),
    feesAmt: z.number(),
    gstAmt: z.number(),
    bankChargesAmt: z.number(),

    debit: z.string().nullable(),
    credit: z.string().nullable(),

    files: z.any().nullable(),

    productOrderableType: z.string().nullable(),
    orderTransactionId: z.string().nullable(),
    bankAccountTxId: z.string().nullable(),
    groupId: z.string().nullable(),

    securityName: z.string().nullable(),
    payDt: z.string().nullable(),

    couponPaymentRate: z.number().nullable(),
    valueOfSettledHolding: z.string().nullable(),
    runningBal: z.string().nullable(),

    postedTo: z.string(),
    comments: z.string().nullable(),

    couponPayments: z.any().nullable(),
    totalCouponAmount: z.string().nullable(),

    parentTransactionId: z.string().nullable(),

    inBeneficiaryAccountName: z.string().nullable(),
    inBeneficiaryAccountNumber: z.string().nullable()
  }),
  pendingTaskData: z.any().nullable()


}).superRefine((data, ctx) => {
  const isCoupon = isCouponPaymentTransactionType(data.cashOrderData.transactionType)

    if(!isCoupon){
      if (!data.cashOrderData.amount) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: REQUIRED_MESSAGE,
      path: ["amount"]
    })
  }
  if (!data.cashOrderData.feesAmt) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: REQUIRED_MESSAGE,
      path: ["feesAmt"]
    })
  }
  if (!data.cashOrderData.gstAmt) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: REQUIRED_MESSAGE,
      path: ["gstAmt"]
    })
  }
  if (!data.cashOrderData.bankChargesAmt) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: REQUIRED_MESSAGE,
      path: ["bankChargesAmt"]
    })
  }
}
})
