import type {
  CashTransactionPayload,
  CouponPaymentRow,
} from "../types"
import type {
  TransactionCreateFormInput,
  TransactionCreateFormValues,
} from "../schema/TransactionCreateFormSchema"

type CouponRowInput = NonNullable<TransactionCreateFormInput["data"]["couponPayments"]>[number]

export const toApiTransactionType = (value: string) => {
  return value
    .toLowerCase()
    .replace(/[()]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

const mapCouponRow = (row: CouponRowInput): CouponPaymentRow => ({
  clientName: typeof row.clientName === "string" ? row.clientName : "",
  organizationNum: typeof row.organizationNum === "string" ? row.organizationNum : "",
  subOrganizationNum: typeof row.subOrganizationNum === "string" ? row.subOrganizationNum : "",
  subAccountNum: typeof row.subAccountNum === "string" ? row.subAccountNum : null,
  effectiveValueAmt: typeof row.effectiveValueAmt === "number" ? row.effectiveValueAmt : 0,
  cashOrderAmt: typeof row.cashOrderAmt === "number" ? row.cashOrderAmt : 0,
  currency: typeof row.currency === "string" ? row.currency : "",
  bankAccountTo: typeof row.bankAccountTo === "string" ? row.bankAccountTo : "",
})

export const buildCashTransactionPayload = (
  values: TransactionCreateFormInput | TransactionCreateFormValues,
  action: CashTransactionPayload["action"]
): CashTransactionPayload => {
  const { data } = values
  const transactionType = typeof data.transactionType === "string" ? data.transactionType : ""

  const sharedBase = {
    transactionType: transactionType ? toApiTransactionType(transactionType) : "",
    createdDo: typeof data.createdDo === "string" ? data.createdDo : "",
    comments: typeof data.comments === "string" ? data.comments : "",
    files: data.files?.map((file) => file.name) ?? [],
    description: typeof data.description === "string" ? data.description : "",
  }

  if (transactionType === "Coupon Payment") {
    const couponPayments = (data.couponPayments ?? []).map(mapCouponRow)

    return {
      action,
      data: {
        ...sharedBase,
        currency: "",
        amount: 0,
        effectiveDo: "",
        isin: typeof data.isin === "string" ? data.isin : "",
        couponPercentageRate:
          typeof data.couponPaymentRate === "number" ? data.couponPaymentRate : 0,
        paymentDo: typeof data.paymentDo === "string" ? data.paymentDo : "",
        couponPayments,
        totalCouponAmount: couponPayments.reduce((sum, row) => sum + row.cashOrderAmt, 0),
      },
    }
  }

  return {
    action,
    data: {
      ...sharedBase,
      orgNum: data.clientName === "-" ? "" : data.clientName,
      subOrgNum: data.subOrgName === "-" ? "" : data.subOrgName,
      currency: typeof data.currency === "string" ? data.currency : "",
      amount: typeof data.amount === "number" ? data.amount : 0,
      effectiveDo: typeof data.effectiveDo === "string" ? data.effectiveDo : "",
      feesAmt: typeof data.feesAmt === "number" ? data.feesAmt : null,
      gstAmt: typeof data.gstAmt === "number" ? data.gstAmt : null,
      bankChargesAmt: typeof data.bankChargesAmt === "number" ? data.bankChargesAmt : null,
      bankAccountUid: typeof data.bankAccountUid === "string" ? data.bankAccountUid : "",
    },
  }
}
