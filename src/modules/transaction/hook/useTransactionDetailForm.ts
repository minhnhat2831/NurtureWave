import { useCallback, useEffect } from "react"
import { useFormContext, type Path, type PathValue } from "react-hook-form"
import { getTransactionConfig, isCouponPaymentTransactionType } from "../constants"
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
  typeof value === "string" ? value : typeof value === "number" ? String(value) : ""

const getWatchedString = (value: unknown) =>
  typeof value === "string" ? value : typeof value === "number" ? String(value) : ""

export const useTransactionDetailForm = (transactionType: "debit" | "credit" | null) => {
  const { watch, setValue, reset, formState: { errors } } = useFormContext<TransactionCreateFormInput>()

  const setFormValue = useCallback(
    <TName extends Path<TransactionCreateFormInput>>(
      name: TName,
      value: PathValue<TransactionCreateFormInput, TName>
    ) => {
      setValue(name, value, FIELD_UPDATE_OPTIONS)
    },
    [setValue]
  )

  const selectedTransactionType = getWatchedString(watch("data.transactionType"))
  const selectedStatus = getWatchedString(watch("data.status"))
  const selectedCurrency = getWatchedString(watch("data.currency"))
  const selectedBankAccountUid = getWatchedString(watch("data.bankAccountUid"))
  const selectedIsin = getWatchedString(watch("data.isin"))
  const selectedOrgNum = getWatchedString(watch("data.clientName"))
  const selectedSubOrgNum = getWatchedString(watch("data.subOrgName"))

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
  const isCouponPayment = isCouponPaymentTransactionType(selectedTransactionType)
  const shouldShowTransactionDetailFields =
    !!selectedTransactionType && !isCouponPayment && transactionConfig.bankDirection !== null
  const shouldShowCouponFields = isCouponPayment
  const statusError = (errors as StatusErrors)?.data?.status?.message

  useEffect(() => {
    if (!selectedOrgNum || selectedSubOrgNum || subOrgOptions.length !== 1) {
      return
    }

    const nextSubOrg = getStringValue(subOrgOptions[0].value)
    if (!nextSubOrg) {
      return
    }

    setFormValue("data.subOrgName", nextSubOrg)
  }, [selectedOrgNum, selectedSubOrgNum, setFormValue, subOrgOptions])

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
          description: isCouponPaymentTransactionType(typeValue) ? "Coupon Payment" : nextConfig.descriptionAutoFill || "",
        },
      },
      { keepErrors: false }
    )
  }

  const onCurrencyChange = (nextCurrency: string | number | null) => {
    const currencyValue = getStringValue(nextCurrency)

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
    void nextOrg
    setFormValue("data.subOrgName", "")
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
  }
}
