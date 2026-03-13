import { Button } from "@/components/common"
import { STATUS_COLORS, TRANSACTION_STATUSES } from "../../constants"

interface TransactionStatusSelectorProps {
  selectedStatus: string
  statusError?: string
  onSelectStatus: (status: string) => void
}

export default function TransactionStatusSelector({
  selectedStatus,
  statusError,
  onSelectStatus,
}: TransactionStatusSelectorProps) {
  return (
    <>
      <div className="mt-4 flex gap-2 items-center">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Transaction Status <span className="text-red-500 ml-0.5">*</span>
        </label>
        {TRANSACTION_STATUSES.map((status) => (
          <Button
            type="button"
            key={status}
            style={{ backgroundColor: STATUS_COLORS[status] }}
            className={selectedStatus === status ? "ring-2 ring-offset-1 ring-gray-700" : ""}
            onClick={() => onSelectStatus(status)}
          >
            {status}
          </Button>
        ))}
      </div>
      {statusError && <p className="mt-1 text-xs text-red-500">{statusError}</p>}
    </>
  )
}
