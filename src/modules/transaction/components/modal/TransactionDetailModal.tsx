import { Button, FormSelect } from "@/components/common";
import { CREDIT_TRANSACTION_TYPE_OPTION, DEBIT_TRANSACTION_TYPE_OPTION, STATUS_COLORS, TRANSACTION_STATUSES } from "../../constants";
import { useTransactionModalStore } from "../../store/useTransactionModalStore";
import { useContextModalStore } from "../../store/useContextModalStore";

interface TransactionDetailProps {
    showCreate?: boolean;
    showEdit?: boolean;
    showView?: boolean
}

export default function TransactionDetailModal({
    showCreate,
    showEdit,
    showView
}: TransactionDetailProps) {
    const { transactionType } = useTransactionModalStore()
    const { open } = useContextModalStore()
    return (<>
        <div className="z-30 sticky h-auto bg-white border border-gray-200 mx-4 mb-4">
            {showCreate && open && <>
                <div className="p-5 mt-4">
                    <FormSelect
                        containerClassName="flex w-full gap-2 items-center"
                        name="transactionType"
                        label="Transaction Type"
                        options={!transactionType || transactionType === 'debit' ? DEBIT_TRANSACTION_TYPE_OPTION : CREDIT_TRANSACTION_TYPE_OPTION}
                        placeholder="Select Status"
                        required
                    >
                    </FormSelect>

                    <div className="mt-4 flex gap-2 items-center">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Transaction Status
                        </label>
                        {TRANSACTION_STATUSES.map((status) => (
                            <Button
                                type="button"
                                key={status}
                                style={{ backgroundColor: STATUS_COLORS[status] }}
                            >
                                {status}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* render form  */}
            </>}

            {showEdit && <>
                <div>

                </div>
            </>}

            {showView && <>
                <div>

                </div>
            </>}
        </div>
    </>)
}