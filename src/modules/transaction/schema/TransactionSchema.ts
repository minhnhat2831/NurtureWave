import * as z from "zod"
import { NumberRequiredMinZero, StringNullAndOptional, StringRequired } from "@/constants/SchemaConstants"
import { CREDIT_TRANSACTION_ENUM } from "../constants"

export const bankAccountListSchema = z.object({
    bankAccountUid: z.string(),
    currency: z.string(),
    beneficiaryName: z.string(),
    beneficiaryBankName: z.string(),
    beneficiaryBankAccountNumber: z.string(),
    beneficiaryBankSwift: z.string(),
    correspondentBankName: z.string(),
    correspondentBankSwift: z.string(),
    displayName: z.string()
})

export const currencyListSchema = z.string().array()

export const isinsListSchema = z.object({
    isin: z.string(),
    securityName: z.string(),
    currency: z.string(),
})

export const isinHoldingListSchema = z.object({
    clientName: StringNullAndOptional,
    subOrganizationName: StringNullAndOptional,
    effectiveValueAmt: NumberRequiredMinZero,
    organizationNum: StringNullAndOptional,
    subOrganizationNum: StringNullAndOptional,
    subAccountNum: StringNullAndOptional
})

export const isinHoldingListItemSchema = z.array(isinHoldingListSchema)

export const orgsSchema = z.object({
    id: z.string(),
    name: z.string(),
    shortName: z.string(),
    countryCode: z.string(),
})

export const orgsListSchema = z.array(orgsSchema)

export const subOrgSchema = z.object({
    name: z.string(),
    orgId: z.string(),
    subOrgId: z.string(),
    description: z.string(),
})

export const subOrgsListSchema = z.record(
    z.string(),
    z.array(subOrgSchema)
)

export const couponPaymentsSchema = z.object({
    clientName: StringNullAndOptional,
    organizationNum: StringNullAndOptional,
    subOrganizationNum: StringNullAndOptional,
    subAccountNum: StringNullAndOptional,
    cashOrderAmt: NumberRequiredMinZero,
    bankAccountTo: StringNullAndOptional,
})

export const cashTransactionDebitPayloadSchema = z.object({
    orgNum: StringNullAndOptional,
    subOrgNum: StringNullAndOptional,
    transactionType: StringNullAndOptional,
    currency: StringNullAndOptional,
    amount: NumberRequiredMinZero,
    effectiveDo: StringNullAndOptional,
    description: StringNullAndOptional,
    feesAmt: NumberRequiredMinZero,
    gstAmt: NumberRequiredMinZero,
    bankChargesAmt: NumberRequiredMinZero,
    bankAccountUid: StringNullAndOptional,
    createdDo: StringNullAndOptional,
    comments: StringNullAndOptional,
    files: z.array(z.instanceof(File)).optional(),
})

export const cashTransactionDebitPayloadListSchema = z.object({
    action: z.string(),
    data: cashTransactionDebitPayloadSchema
})

export const cashTransactionCouponPayloadSchema = z.object({
    transactionType: StringNullAndOptional,
    currency: StringNullAndOptional,
    description: StringNullAndOptional,
    feesAmt: NumberRequiredMinZero,
    gstAmt: NumberRequiredMinZero,
    bankChargesAmt: NumberRequiredMinZero,
    comments: StringNullAndOptional,
    files: z.array(z.instanceof(File)).optional(),
    couponPayments: z.array(couponPaymentsSchema),
    totalCouponAmount: NumberRequiredMinZero,
    isin: StringNullAndOptional,
    couponPercentageRate: NumberRequiredMinZero,
    paymentDo: StringNullAndOptional
})

export const cashTransactionCouponPayloadListSchema = z.object({
    action: z.string(),
    data: cashTransactionCouponPayloadSchema
})

export const cashTransactionFormSchema = z.object({
    orgNum: orgsSchema,
    subOrgNum: subOrgSchema,
    transactionType: StringRequired.optional(),
    currency: StringNullAndOptional,
    amount: NumberRequiredMinZero,
    effectiveDo: StringNullAndOptional,
    description: StringRequired.optional(),
    feesAmt: NumberRequiredMinZero,
    gstAmt: NumberRequiredMinZero,
    bankChargesAmt: NumberRequiredMinZero,
    bankAccountUid: bankAccountListSchema,
    createdDo: StringNullAndOptional,
    comments: StringNullAndOptional,
    files: z.array(z.instanceof(File)).optional(),
    couponPayments: z.array(couponPaymentsSchema),
    totalCouponAmount: NumberRequiredMinZero,
    isin: StringNullAndOptional,
    couponPercentageRate: NumberRequiredMinZero,
    paymentDo: StringNullAndOptional
}).superRefine((data, ctx) => {
    const isCoupon = data.transactionType === CREDIT_TRANSACTION_ENUM[0]

    if (isCoupon) {
        if (!data.isin) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Isin is required',
                path: ["isin"]
            })
        }
        if (!data.paymentDo) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Payment date is required',
                path: ["paymentDo"]
            })
        }
        data.couponPayments?.forEach((item, index) => {
            if (!item.bankAccountTo) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'This field is required',
                    path: ["couponPayments", index, "bankAccountTo"]
                })
            }
        })
    } else {
        if (!data.currency) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Currency is required',
                path: ["currency"]
            })
        }
        if (!data.effectiveDo) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Effective date is required',
                path: ["effectiveDo"]
            })
        }
    }
})

export const cashTransactionFormListSchema = z.object({
    action: z.string(),
    data: cashTransactionFormSchema
})

export const couponPaymentSchema = z.object({
  paymentDate: z.string(),
  amount: z.number()
});

export const cashTransactionDetailListSchema = z.object({
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
  amount : z.number(),

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

export const cashTransactionDetailSchema = z.object({
  transactionId: z.string(),
  cashOrderNum: z.string().nullable(),
  couponOrderNum: z.string().nullable(),
  amount : z.number(),
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

  couponPaymentRate: z.string().nullable(),
  valueOfSettledHolding: z.string().nullable(),
  runningBal: z.string().nullable(),

  postedTo: z.string(),                 
  comments : z.string().nullable(),
  
  couponPayments: z.any().nullable(),
  totalCouponAmount: z.string().nullable(),

  parentTransactionId: z.string().nullable(),

  inBeneficiaryAccountName: z.string().nullable(),
  inBeneficiaryAccountNumber: z.string().nullable()
}).superRefine((data, ctx) => {
    const isCoupon = data.transactionType === CREDIT_TRANSACTION_ENUM[0]

    if(!isCoupon){
        if (!data.amount) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'amount is required',
                path: ["amount"]
            })
        }
        if (!data.feesAmt) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'feesAmt is required',
                path: ["feesAmt"]
            })
        }
        if (!data.gstAmt) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'gstAmt is required',
                path: ["gstAmt"]
            })
        }
        if (!data.bankChargesAmt) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'bankChargesAmt is required',
                path: ["bankChargesAmt"]
            })
        }
    }
})

export const cashTransactionDetailPayloadSchema = z.object({
  cashOrderData: cashTransactionDetailSchema,
  pendingTaskData: z.any().nullable()
});