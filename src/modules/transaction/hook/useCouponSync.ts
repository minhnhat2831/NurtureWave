import { useFormContext } from "react-hook-form"
import type { TransactionCreateFormInput } from "../schema/TransactionCreateFormSchema"
import type { IsinHolding } from "../types/transaction.type"

export const useCouponSync = (holdingsData: IsinHolding[]) => {
  const { setValue } = useFormContext<TransactionCreateFormInput>()

  const syncCashOrderAmountsByRate = (rate: number | null | undefined) => {
    const normalizedRate = typeof rate === "number" ? rate : 0

    setValue("data.couponPaymentRate", normalizedRate, { shouldDirty: true, shouldValidate: true })

    holdingsData.forEach((holding, idx) => {
      setValue(
        `data.couponPayments.${idx}.cashOrderAmt` as `data.couponPayments.${number}.cashOrderAmt`,
        holding.effectiveValueAmt * (normalizedRate / 100),
        { shouldDirty: true, shouldValidate: true }
      )
    })
  }

  const syncRateByCashOrderAmount = (rowIndex: number, amount: number | null | undefined) => {
    const holding = holdingsData[rowIndex]
    const normalizedAmount = typeof amount === "number" ? amount : 0

    if (!holding?.effectiveValueAmt) {
      setValue(
        `data.couponPayments.${rowIndex}.cashOrderAmt` as `data.couponPayments.${number}.cashOrderAmt`,
        normalizedAmount,
        { shouldDirty: true, shouldValidate: true }
      )
      return
    }

    const nextRate = (normalizedAmount / holding.effectiveValueAmt) * 100
    syncCashOrderAmountsByRate(nextRate)
  }

  return { syncCashOrderAmountsByRate, syncRateByCashOrderAmount }
}
