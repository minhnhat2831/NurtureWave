import { useFormContext, type Path, type PathValue } from "react-hook-form"
import { getTransactionConfig } from "../constants"
import {
  getTransactionCreateDefaultValues,
  type TransactionCreateFormInput,
} from "../schema/TransactionCreateFormSchema"
import { useTransactionFormOptions } from "./useTransactionFormOptions"

interface StatusErrors {
  data?: {
    status?: {
      message?: string
    }
  }
}

const FIELD_UPDATE_OPTIONS = { shouldValidate: false, shouldDirty: true } as const

const getStringValue = (value: string | number | null) =>
  typeof value === "string" ? value : ""

export const useTransactionDetailForm = (transactionType: "debit" | "credit" | null) => {
  const { watch, setValue, reset, formState: { errors } } = useFormContext<TransactionCreateFormInput>()

  const setFormValue = <TName extends Path<TransactionCreateFormInput>>(
    name: TName,
    value: PathValue<TransactionCreateFormInput, TName>
  ) => {
    setValue(name, value, FIELD_UPDATE_OPTIONS)
  }

  const selectedTransactionType = (watch("data.transactionType") as string | undefined) || ""
  const selectedStatus = (watch("data.status") as string | undefined) || ""
  const selectedCurrency = (watch("data.currency") as string | undefined) || ""
  const selectedBankAccountUid = (watch("data.bankAccountUid") as string | undefined) || ""
  const selectedIsin = (watch("data.isin") as string | undefined) || ""
  const selectedOrgNum = (watch("data.clientName") as string | undefined) || ""

  const {
    bankAccounts,
    transactionTypeOptions,
    isinOptions,
    isinList,
    holdingsData,
    isinDetail,
    currencyOptions,
    orgOptions,
    subOrgOptions,
    bankOptions,
  } = useTransactionFormOptions({
    transactionType,
    selectedCurrency,
    selectedIsin,
    selectedOrgNum
  })

  const transactionConfig = getTransactionConfig(selectedTransactionType)
  const isCouponPayment = selectedTransactionType === "Coupon Payment"
  const shouldShowTransactionDetailFields =
    !!selectedTransactionType && !isCouponPayment && transactionConfig.bankDirection !== null
  const shouldShowCouponFields = isCouponPayment
  const statusError = (errors as StatusErrors)?.data?.status?.message

  const onTransactionTypeChange = (nextType: string | number | null) => {
    const typeValue = typeof nextType === "string" ? nextType : ""
    const nextConfig = getTransactionConfig(typeValue)
    const defaults = getTransactionCreateDefaultValues()

    reset(
      {
        ...defaults,
        data: {
          ...defaults.data,
          transactionType: typeValue,
          description: typeValue === "Coupon Payment" ? "Coupon Payment" : nextConfig.descriptionAutoFill || "",
        },
      },
      { keepErrors: false }
    )
  }

  const onCurrencyChange = (nextCurrency: string | number | null) => {
    const currencyValue = getStringValue(nextCurrency)

    setFormValue("data.currency", currencyValue)

    if (!currencyValue) {
      setFormValue("data.bankAccountUid", "")
      return
    }

    if (!selectedBankAccountUid) {
      return
    }

    const selectedBank = bankAccounts.find((item) => item.bankAccountUid === selectedBankAccountUid)
    if (selectedBank && selectedBank.currency !== currencyValue) {
      setFormValue("data.bankAccountUid", "")
    }
  }

  const onBankChange = (nextBankUid: string | number | null) => {
    const bankValue = getStringValue(nextBankUid)

    setFormValue("data.bankAccountUid", bankValue)

    if (!bankValue) {
      setFormValue("data.currency", "")
      return
    }

    const selectedBank = bankAccounts.find((item) => item.bankAccountUid === bankValue)
    if (selectedBank?.currency) {
      setFormValue("data.currency", selectedBank.currency)
    }
  }

  const onIsinChange = (nextIsin: string | number | null) => {
    const isinValue = getStringValue(nextIsin)
    const selectedIsinDetail = isinList.find((item) => item.isin === isinValue)

    setFormValue("data.isin", isinValue)
    setFormValue("data.currency", selectedIsinDetail?.currency || "")
    setFormValue(
      "data.description",
      isinValue ? `Coupon Payment ${isinValue}` : "Coupon Payment"
    )
  }

  const onSelectStatus = (status: string) => {
    setFormValue("data.status", status)
  }

  const onClientChange = (nextOrg: string | number | null) => {
    const orgValue = getStringValue(nextOrg)

    setFormValue("data.clientName", orgValue)

    setFormValue("data.subOrgName", "")

    if (!orgValue) return

    if (subOrgOptions.length === 1) {
      setFormValue("data.subOrgName", subOrgOptions[0].value)
    }
  }

  const onSubOrgChange = (nextSubOrg: string | number | null) => {
    const subOrgValue = getStringValue(nextSubOrg)

    setFormValue("data.subOrgName", subOrgValue)
  }

  return {
    selectedStatus,
    transactionTypeOptions,
    currencyOptions,
    bankOptions,
    orgOptions,
    subOrgOptions,
    isinOptions,
    holdingsData,
    isinDetail,
    shouldShowTransactionDetailFields,
    shouldShowCouponFields,
    transactionConfig,
    statusError,
    onTransactionTypeChange,
    onCurrencyChange,
    onBankChange,
    onIsinChange,
    onSelectStatus,
    onClientChange,
    onSubOrgChange
  }
}
