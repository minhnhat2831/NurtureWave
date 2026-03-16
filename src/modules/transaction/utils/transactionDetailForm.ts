import type { TransactionCreateFormInput } from "../schema/TransactionCreateFormSchema"
import type { cashTransactionDetail } from "../schema/TransactionCreateFormSchema"

export const mapTransactionDetailToForm = (
  detail: cashTransactionDetail
): TransactionCreateFormInput => {

  const d = detail.cashOrderData

  return {
    data: {
      transactionType: d.transactionType ?? "",
      status: d.orderStatus ?? "",
      clientName: d.orgName ?? "",
      subOrgName: d.subOrgName ?? "",
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
}