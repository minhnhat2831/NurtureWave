import { useEffect, useMemo } from "react"
import { Controller, useFieldArray, useFormContext, useWatch } from "react-hook-form"
import { NumericFormat } from "react-number-format"
import { BaseInput, FormDatePicker, FormInput } from "@/components/common"
import { cn } from "@/lib/cn"
import type { SelectOption } from "@/components/Form"
import type { Isin, IsinHolding } from "../../types/transaction.type"
import type { TransactionCreateFormInput } from "../../schema/TransactionCreateFormSchema"
import TransactionSelectController from "./TransactionSelectController"
import { useCouponSync } from "../../hook/useCouponSync"

const MONEY_INPUT_CLASS =
  "w-full px-3 py-2.5 border rounded-lg text-sm text-right outline-none border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"

const RATE_INPUT_CLASS = (
  hasError: boolean
) => cn(
  "flex-1 px-3 py-2.5 border rounded-lg text-sm outline-none transition-all",
  "text-gray-900 placeholder:text-gray-400",
  "focus:ring-2 focus:ring-violet-500 focus:border-violet-500",
  hasError
    ? "border-red-500 focus:ring-red-500"
    : "border-gray-300 hover:border-gray-400"
)

const formatMoney = (value: number | null | undefined) => (
  <NumericFormat
    value={value ?? 0}
    displayType="text"
    thousandSeparator="," 
    decimalScale={2}
    fixedDecimalScale
  />
)

interface TransactionCouponFormProps {
  isinOptions: SelectOption[]
  onIsinChange: (value: string | number | null) => void
  holdingsData: IsinHolding[]
  isinDetail: Isin | null
  bankOptions: SelectOption[]
}

export default function TransactionCouponForm({
  isinOptions,
  onIsinChange,
  holdingsData,
  isinDetail,
  bankOptions,
}: TransactionCouponFormProps) {
  const { control, formState: { errors } } = useFormContext<TransactionCreateFormInput>()
  const { syncCashOrderAmountsByRate, syncRateByCashOrderAmount } = useCouponSync(holdingsData)
  const selectedIsin = useWatch({ control, name: "data.isin" }) || ""
  const hasSelectedIsin = Boolean(selectedIsin)
  const { fields, replace } = useFieldArray<TransactionCreateFormInput, "data.couponPayments">({
    control,
    name: "data.couponPayments",
  })
  const couponRate = useWatch({ control, name: "data.couponPaymentRate" })
  const couponPayments = useWatch({ control, name: "data.couponPayments" })

  // When holdings change: reset rows (also resets bank account selections)
  useEffect(() => {
    const rate = typeof couponRate === "number" ? couponRate : 0
    replace(
      holdingsData.map((h) => ({
        bankAccountTo: "",
        cashOrderAmt: h.effectiveValueAmt * (rate / 100),
        clientName: h.clientName,
        organizationNum: h.organizationNum,
        subOrganizationNum: h.subOrganizationNum,
        subAccountNum: h.subAccountNum,
        effectiveValueAmt: h.effectiveValueAmt,
        currency: h.currency,
      }))
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [holdingsData])

  const rows = useMemo(
    () => (Array.isArray(couponPayments) ? couponPayments : []),
    [couponPayments]
  )
  const totalPaymentAmount = useMemo(
    () => rows.reduce(
      (sum: number, row: Record<string, unknown>) =>
        sum + (typeof row?.cashOrderAmt === "number" ? row.cashOrderAmt : 0),
      0
    ),
    [rows]
  )
  const currency = isinDetail?.currency ?? ""
  const couponErrors = errors.data?.couponPayments ?? []

  return (
    <div className="mt-6 flex flex-col gap-4">
      {/* ISIN */}
      <TransactionSelectController
        name="data.isin"
        label="ISIN"
        options={isinOptions}
        required
        isSearchable
        isClearable
        placeholder="Select ISIN"
        onChange={onIsinChange}
      />

      {hasSelectedIsin && (
        <>
          <BaseInput
            label="Security Name"
            value={isinDetail?.securityName ?? "-"}
            disabled
            required
          />

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Coupon Payment Rate <span className="text-red-500 ml-0.5">*</span>
            </label>
            <Controller
              name="data.couponPaymentRate"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <div className="flex items-center gap-2">
                    <NumericFormat
                      value={field.value ?? ""}
                      onValueChange={(values) => {
                        syncCashOrderAmountsByRate(values.floatValue ?? 0)
                      }}
                      thousandSeparator="," 
                      decimalSeparator="."
                      decimalScale={2}
                      fixedDecimalScale
                      allowNegative={false}
                      placeholder="0.00"
                      className={RATE_INPUT_CLASS(Boolean(fieldState.error))}
                    />
                    <span className="text-sm font-medium text-gray-600 shrink-0">%</span>
                  </div>
                  {fieldState.error && (
                    <p className="mt-1 text-xs text-red-500">{fieldState.error.message}</p>
                  )}
                </>
              )}
            />
          </div>

          {fields.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-2">Payment Details</p>
              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-3 py-2.5 text-left font-medium text-gray-700 whitespace-nowrap">
                        Client Name / Sub-org Name
                      </th>
                      <th className="px-3 py-2.5 text-left font-medium text-gray-700 whitespace-nowrap">
                        Bank Account (To) <span className="text-red-500">*</span>
                      </th>
                      <th className="px-3 py-2.5 text-right font-medium text-gray-700 whitespace-nowrap">
                        Value of Settled Holdings
                      </th>
                      <th className="px-3 py-2.5 text-right font-medium text-gray-700 whitespace-nowrap">
                        Net Payment Amount{currency ? ` (${currency})` : ""}{" "}
                        <span className="text-red-500">*</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {fields.map((field, idx) => {
                      const holding = holdingsData[idx]
                      if (!holding) return null
                      const rowCashOrderError = couponErrors?.[idx]?.cashOrderAmt?.message
                        ? String(couponErrors[idx]?.cashOrderAmt?.message)
                        : undefined
                      return (
                        <tr key={field.id} className="hover:bg-gray-50">
                          <td className="px-3 py-3 align-top">
                            <p className="font-semibold text-gray-900 leading-snug">
                              {holding.organizationName || holding.clientName}
                            </p>
                            <p className="text-xs text-gray-500">{holding.subOrganizationName}</p>
                          </td>
                          <td className="px-3 py-3 min-w-45 align-top">
                            <TransactionSelectController
                              name={`data.couponPayments.${idx}.bankAccountTo`}
                              options={bankOptions}
                              placeholder="Select bank"
                              isSearchable
                              isClearable
                            />
                          </td>
                          <td className="px-3 py-3 text-right text-gray-900 align-top pt-4">
                            {formatMoney(holding.effectiveValueAmt)}
                          </td>
                          <td className="px-3 py-3 min-w-37.5 align-top">
                            <NumericFormat
                              value={rows[idx]?.cashOrderAmt ?? 0}
                              onValueChange={(values) => {
                                syncRateByCashOrderAmount(idx, values.floatValue ?? 0)
                              }}
                              thousandSeparator=","
                              decimalSeparator="."
                              decimalScale={2}
                              fixedDecimalScale
                              allowNegative={false}
                              placeholder="0.00"
                              className={cn(
                                MONEY_INPUT_CLASS,
                                rowCashOrderError && "border-red-500 focus:ring-red-500 focus:border-red-500"
                              )}
                            />
                            {rowCashOrderError && (
                              <p className="mt-1 text-xs text-red-500">{rowCashOrderError}</p>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Total Payment Amount</span>
            <span className="text-sm font-bold text-gray-900">
              {currency && `${currency} `}
              {formatMoney(totalPaymentAmount)}
            </span>
          </div>

          <FormDatePicker name="data.paymentDo" label="Payment Date" required />

          <FormInput name="data.description" label="Description" required />
        </>
      )}
    </div>
  )
}
