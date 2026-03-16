import { isCouponPaymentTransactionType } from "../constants"

export type TransactionModalMode = "Create" | "Edit" | "View"

export const EDITABLE_ORDER_STATUSES = ["draft", "pending-maker"] as const

const normalizeOrderStatus = (orderStatus: string | null | undefined) =>
  (orderStatus || "")
    .toLowerCase()
    .replace(/_/g, "-")
    .replace(/\s+/g, "-")
    .trim()

export const isEditableCashByStatusAndType = (
  orderStatus: string | null | undefined,
  transactionType: string | null | undefined
) =>
  EDITABLE_ORDER_STATUSES.includes(
    normalizeOrderStatus(orderStatus) as (typeof EDITABLE_ORDER_STATUSES)[number]
  ) &&
  !isCouponPaymentTransactionType(transactionType || "")

export const resolveEffectiveTransactionMode = (
  mode: TransactionModalMode,
  orderStatus: string | null | undefined,
  transactionType: string | null | undefined
): TransactionModalMode => {
  if (mode === "View" && isEditableCashByStatusAndType(orderStatus, transactionType)) {
    return "Edit"
  }

  return mode
}
