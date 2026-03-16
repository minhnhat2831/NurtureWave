import { formatDate } from "@/utils/formatDate"
import type { TransactionCreateFormInput } from "../../schema/TransactionCreateFormSchema"

const val = (v: string | null | undefined): string => {
  if (v === null || v === undefined || v === "") return "-"
  return v
}

const num = (v: number | null | undefined): string => {
  if (v === null || v === undefined) return "-"
  return v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

interface ConfirmRowProps {
  label: string
  value: string
}

const ConfirmRow = ({ label, value }: ConfirmRowProps) => (
  <div className="flex py-2 border-b border-gray-100 last:border-0">
    <span className="w-48 shrink-0 text-sm font-medium text-gray-500">{label}</span>
    <span className="text-sm text-gray-900">{value}</span>
  </div>
)

interface TransactionConfirmViewProps {
  values: TransactionCreateFormInput
}

export default function TransactionConfirmView({ values }: TransactionConfirmViewProps) {
  const d = values.data
  const isCoupon = d.transactionType === "Coupon Payment" || d.transactionType === "coupon-payment"

  return (
    <div className="px-6 py-4">
      <p className="text-sm text-gray-500 mb-4">Please review the details below before confirming.</p>

      <div className="rounded border border-gray-200 px-4 py-2 mb-4">
        <ConfirmRow label="Transaction Type" value={val(d.transactionType as string)} />
        <ConfirmRow label="Status" value={val(d.status as string)} />
        <ConfirmRow label="Created Date" value={formatDate(d.createdDo)} />

        {!isCoupon && (
          <>
            <ConfirmRow label="Client Name" value={val(d.clientName)} />
            <ConfirmRow label="Sub Organisation" value={val(d.subOrgName)} />
            <ConfirmRow label="Transaction ID" value={val(d.transactionId)} />
            <ConfirmRow label="Currency" value={val(d.currency)} />
            <ConfirmRow label="Amount" value={num(d.amount)} />
            <ConfirmRow label="Fees" value={num(d.feesAmt)} />
            <ConfirmRow label="GST" value={num(d.gstAmt)} />
            <ConfirmRow label="Bank Charges" value={num(d.bankChargesAmt)} />
            <ConfirmRow label="Effective Date" value={formatDate(d.effectiveDo)} />
            <ConfirmRow label="Bank Account" value={val(d.bankAccountUid)} />
          </>
        )}

        {isCoupon && (
          <>
            <ConfirmRow label="ISIN" value={val(d.isin)} />
            <ConfirmRow
              label="Coupon Payment Rate"
              value={d.couponPaymentRate !== undefined && d.couponPaymentRate !== null ? `${d.couponPaymentRate}%` : "-"}
            />
            <ConfirmRow label="Payment Date" value={formatDate(d.paymentDo)} />
          </>
        )}

        <ConfirmRow label="Description" value={val(d.description)} />
        <ConfirmRow label="Comments" value={val(d.comments)} />
      </div>

      {isCoupon && d.couponPayments && d.couponPayments.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">Coupon Payments</p>
          <table className="w-full text-sm border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left py-2 px-3 font-medium text-gray-600 border border-gray-200">Client</th>
                <th className="text-right py-2 px-3 font-medium text-gray-600 border border-gray-200">Amount</th>
                <th className="text-left py-2 px-3 font-medium text-gray-600 border border-gray-200">Bank Account</th>
              </tr>
            </thead>
            <tbody>
              {d.couponPayments.map((row, i) => (
                <tr key={i}>
                  <td className="py-2 px-3 border border-gray-200">{val(row.clientName)}</td>
                  <td className="py-2 px-3 text-right border border-gray-200">{num(row.cashOrderAmt)}</td>
                  <td className="py-2 px-3 border border-gray-200">{val(row.bankAccountTo)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
