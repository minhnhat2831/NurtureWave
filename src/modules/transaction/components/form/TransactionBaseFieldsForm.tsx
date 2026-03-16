import { FormCurrencyInput, FormDatePicker, FormInput } from "@/components/common"
import type { SelectOption } from "@/components/Form"
import TransactionSelectController from "./TransactionSelectController"

interface TransactionBaseFieldsFormProps {
  orgOptions: SelectOption[]
  subOrgOptions: SelectOption[]
  currencyOptions: SelectOption[]
  bankOptions: SelectOption[]
  showClientFields: boolean
  descriptionEditable: boolean
  descriptionAutoFill: string
  showFees: boolean
  showBankCharges: boolean
  showGstAmount: boolean
  bankDirection: "from" | "to" | null
  onCurrencyChange: (value: string | number | null) => void
  onBankChange: (value: string | number | null) => void
  onOrgChange: (value: string | number | null) => void
  onSubOrgChange: (value: string | number | null) => void
}

export default function TransactionBaseFieldsForm({
  orgOptions,
  subOrgOptions,
  currencyOptions,
  bankOptions,
  showClientFields,
  descriptionEditable,
  descriptionAutoFill,
  showFees,
  showBankCharges,
  showGstAmount,
  bankDirection,
  onOrgChange,
  onSubOrgChange,
  onCurrencyChange,
  onBankChange,
}: TransactionBaseFieldsFormProps) {
  const bankLabel = bankDirection === "from" ? "Bank Details (From)" : "Bank Details (To)"

  return (
    <div className="mt-6 flex flex-col gap-4">
      {showClientFields && (
        <TransactionSelectController
          name="data.clientName"
          label="Client Name"
          options={orgOptions}
          required
          placeholder="Select currency"
          onChange={onSubOrgChange}
        />
      )}

      {showClientFields && (
        <TransactionSelectController
          name="data.subOrgName"
          label="Sub-org Name"
          options={subOrgOptions}
          required
          placeholder="Select currency"
          onChange={onOrgChange}
        />
      )}

      <FormInput
        name="data.transactionId"
        label="Transaction ID"
        disabled
      />

      <TransactionSelectController
        name="data.currency"
        label="Currency"
        options={currencyOptions}
        required
        placeholder="Select currency"
        onChange={onCurrencyChange}
      />

      <FormCurrencyInput
        name="data.amount"
        label="Amount"
        required
      />

      {showFees && (
        <FormCurrencyInput
          name="data.feesAmt"
          label="Fees"
          placeholder="0.00"
        />
      )}

      {showGstAmount && (
        <FormCurrencyInput
          name="data.gstAmt"
          label="GST"
        />
      )}

      {showBankCharges && (
        <FormCurrencyInput
          name="data.bankChargesAmt"
          label="Bank Charges"
          placeholder="0.00"
        />
      )}

      <FormDatePicker
        name="data.effectiveDo"
        label="Effective Date"
        required
      />

      <TransactionSelectController
        name="data.bankAccountUid"
        label={bankLabel}
        options={bankOptions}
        placeholder="Select bank account"
        onChange={onBankChange}
      />

      <FormInput
        name="data.description"
        label="Description"
        required
        disabled={!descriptionEditable}
        placeholder={descriptionAutoFill || "Description"}
      />

      <FormDatePicker
        name="data.createdDo"
        label="Created Date"
        required
        disabled
      />
    </div>
  )
}
