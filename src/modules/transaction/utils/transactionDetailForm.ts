import type { TransactionCreateFormInput } from "../schema/TransactionCreateFormSchema"
import type { cashTransactionDetail } from "../schema/TransactionCreateFormSchema"

const toFormStatus = (orderStatus: string | null | undefined): string => {
  if (orderStatus === "draft") return "Draft"
  if (orderStatus === "pending" || orderStatus === "pending-maker") return "Pending"
  if (orderStatus === "complete") return "Complete"
  return orderStatus ?? ""
}

const createBaseFormData = (detail: cashTransactionDetail) => {
  const d = detail.cashOrderData

  return {
    transactionType: d.transactionType ?? "",
    status: toFormStatus(d.orderStatus),
    transactionId: d.transactionId ?? "",
    isin: d.isin ?? "",
    currency: d.currency ?? "",
    amount: d.amount ?? undefined,
    feesAmt: d.feesAmt ?? undefined,
    gstAmt: d.gstAmt ?? undefined,
    bankChargesAmt: d.bankChargesAmt ?? undefined,
    effectiveDo: d.effectiveDo ?? "",
    bankAccountUid: d.bankAccountUid ?? "",
    description: d.description ?? "",
    createdDo: d.createDo,
    comments: d.comments ?? "",
    files: [],
    couponPaymentRate: d.couponPaymentRate ?? undefined,
    paymentDo: d.payDt ?? "",
    couponPayments: d.couponPayments ?? [],
  }
}

export const mapTransactionDetailToEditForm = (
  detail: cashTransactionDetail
): TransactionCreateFormInput => {
  const d = detail.cashOrderData

  return {
    data: {
      ...createBaseFormData(detail),
      clientName: d.orgNum ?? "",
      subOrgName: d.subOrgNum ?? "",
    }
  }
}

export const mapTransactionDetailToForm = (
  detail: cashTransactionDetail
): TransactionCreateFormInput => {
  const d = detail.cashOrderData

  return {
    data: {
      ...createBaseFormData(detail),
      clientName: d.orgName ?? "",
      subOrgName: d.subOrgName ?? "",
    }
  }
}