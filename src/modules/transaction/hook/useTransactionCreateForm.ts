import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  getTransactionCreateDefaultValues,
  transactionCreateFormSchema,
  type TransactionCreateFormInput,
  type TransactionCreateFormValues,
} from "../schema/TransactionCreateFormSchema"
import type { CashTransactionPayload } from "../types"
import { buildCashTransactionPayload } from "../utils/payloadBuilder"

interface UseTransactionCreateFormProps {
  onClose?: () => void
}

const actionByStatus: Record<string, CashTransactionPayload["action"]> = {
  Draft: "request-draft",
  Pending: "request-pending",
  Complete: "request-complete",
}

export const getTransactionActionByStatus = (
  status: string
): CashTransactionPayload["action"] => actionByStatus[status] || "request-pending"

export const useTransactionCreateForm = ({ onClose }: UseTransactionCreateFormProps) => {
  const defaultValues = useMemo(() => getTransactionCreateDefaultValues(), [])

  const method = useForm<TransactionCreateFormInput, unknown, TransactionCreateFormValues>({
    resolver: zodResolver(transactionCreateFormSchema),
    defaultValues,
    mode: "onSubmit",
    reValidateMode: "onChange",
  })

  const buildTransactionPayload = (
    values: TransactionCreateFormInput | TransactionCreateFormValues,
    action: CashTransactionPayload["action"]
  ) => buildCashTransactionPayload(values, action)

  const resetToDefault = () => method.reset(getTransactionCreateDefaultValues())

  return {
    method,
    buildTransactionPayload,
    isSubmitting: false,
    resetForm: resetToDefault,
    closeAfterCreate: () => {
      resetToDefault()
      onClose?.()
    },
  }
}
