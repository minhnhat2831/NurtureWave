import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchListBankAccount, fetchListCurrency, fetchListIsin, fetchIsinHolding, fetchListOrg, fetchListSubOrg } from "../api"
import {
  CREDIT_TRANSACTION_TYPE_OPTION,
  DEBIT_TRANSACTION_TYPE_OPTION,
} from "../constants"
import type { Isin, IsinHolding } from "../types/transaction.type"

const normalizeLabel = (label: string) => label.replace(/\s{2,}/g, " ").trim()

const stripNumberInParentheses = (label: string) =>
  // Hide phone/account number patterns like "(007-890123-007)" from dropdown labels.
  label.replace(/\s*\((?:\+?\d[\d\s-]{5,})\)\s*/g, " ")

const buildUniqueBankOptions = (
  bankAccounts: Array<{ bankAccountUid?: string; displayName?: string; accountName?: string }>
) => {
  const rawOptions = bankAccounts
    .map((item) => ({
      value: item.bankAccountUid || "",
      label: normalizeLabel(stripNumberInParentheses(item.displayName || item.accountName || "-")),
    }))
    .filter((item) => item.value)

  const labelCount = rawOptions.reduce<Record<string, number>>((acc, option) => {
    acc[option.label] = (acc[option.label] || 0) + 1
    return acc
  }, {})

  return rawOptions.map((option) => {
    if ((labelCount[option.label] || 0) <= 1) {
      return option
    }

    return {
      ...option,
      label: `${option.label} - ${option.value}`,
    }
  })
}

interface UseTransactionFormOptionsParams {
  transactionType: "debit" | "credit" | null
  selectedCurrency: string
  selectedIsin: string,
  selectedOrgNum?: string
}

export const useTransactionFormOptions = ({
  transactionType,
  selectedCurrency,
  selectedIsin,
  selectedOrgNum
}: UseTransactionFormOptionsParams) => {
  const shouldFetchCouponData = transactionType === "credit"

  const { data: currencies = [] } = useQuery({
    queryKey: ["transaction", "currencies"],
    queryFn: fetchListCurrency,
  })

  const { data: orgResponse } = useQuery({
    queryKey: ["transaction", "org"],
    queryFn: fetchListOrg,
  })

  const { data: subOrgResponse } = useQuery({
    queryKey: ["transaction", "subOrg", selectedOrgNum],
    queryFn: () => fetchListSubOrg(selectedOrgNum),
    enabled: !!selectedOrgNum,
  })

  const { data: isinResponse } = useQuery({
    queryKey: ["transaction", "isins"],
    queryFn: fetchListIsin,
    enabled: shouldFetchCouponData,
    retry: false,
  })

  const { data: holdingsResponse } = useQuery({
    queryKey: ["transaction", "isin-holdings", selectedIsin],
    queryFn: () => fetchIsinHolding(selectedIsin || undefined),
    enabled: shouldFetchCouponData && !!selectedIsin,
    retry: false,
  })

  const { data: bankAccountsResponse } = useQuery({
    queryKey: ["transaction", "bank-accounts", selectedCurrency || "all"],
    queryFn: () => fetchListBankAccount({
      currency: selectedCurrency || undefined,
    }),
  })

  const bankAccounts = useMemo(
    () => bankAccountsResponse?.data || [],
    [bankAccountsResponse]
  )

  const transactionTypeOptions = useMemo(() => {
    if (!transactionType || transactionType === "debit") {
      return DEBIT_TRANSACTION_TYPE_OPTION
    }

    return CREDIT_TRANSACTION_TYPE_OPTION
  }, [transactionType])

  const isinOptions = useMemo(() => {
    const isins = isinResponse?.data || []
    return isins.map((item) => ({
      value: item.isin,
      label: `${item.isin} - ${item.securityName} (${item.currency})`,
    }))
  }, [isinResponse])

  const isinList = useMemo(() => isinResponse?.data || [], [isinResponse])

  const holdingsData = useMemo<IsinHolding[]>(
    () => holdingsResponse?.data || [],
    [holdingsResponse]
  )

  const isinDetail = useMemo<Isin | null>(
    () => isinList.find((item) => item.isin === selectedIsin) ?? null,
    [isinList, selectedIsin]
  )

  const currencyOptions = useMemo(
    () => currencies.map((currency) => ({ value: currency, label: currency })),
    [currencies]
  )

  const orgOptions = useMemo(() => {
    const orgs = orgResponse?.data || []

    return orgs.map((org) => ({
      value: String(org.id),
      label: org.name,
    }))
  }, [orgResponse])

  const subOrgOptions = useMemo(() => {
    const subOrgs = subOrgResponse?.data || []

    return subOrgs.map((sub) => ({
      value: String(sub.subOrgId),
      label: sub.name,
    }))
  }, [subOrgResponse])

  const bankOptions = useMemo(() => buildUniqueBankOptions(bankAccounts), [bankAccounts])

  return {
    bankAccounts,
    transactionTypeOptions,
    isinOptions,
    isinList,
    holdingsData,
    isinDetail,
    currencyOptions,
    bankOptions,
    orgOptions,
    subOrgOptions
  }
}