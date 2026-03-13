import { useTransactionModalStore } from "../../store/useTransactionModalStore";
import { useContextModalStore } from "../../store/useContextModalStore";
import TransactionStatusSelector from "../form/TransactionStatusSelector";
import TransactionBaseFieldsForm from "../form/TransactionBaseFieldsForm";
import TransactionCouponForm from "../form/TransactionCouponForm";
import TransactionSelectController from "../form/TransactionSelectController";
import { useTransactionDetailForm } from "../../hook/useTransactionDetailForm";

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
    const {
        selectedStatus,
        transactionTypeOptions,
        currencyOptions,
        bankOptions,
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
    } = useTransactionDetailForm(transactionType)

    return (<>
        <div className="z-30 sticky h-auto bg-white border border-gray-200 mx-4 mb-4">
            {showCreate && open && <>
                <div className="p-5 mt-4">
                    <TransactionSelectController
                        name="data.transactionType"
                        label="Transaction Type"
                        options={transactionTypeOptions}
                        required
                        placeholder="Select transaction type"
                        onChange={onTransactionTypeChange}
                    />

                    <TransactionStatusSelector
                        selectedStatus={selectedStatus}
                        statusError={statusError}
                        onSelectStatus={onSelectStatus}
                    />

                    {shouldShowTransactionDetailFields && (
                        <TransactionBaseFieldsForm
                            currencyOptions={currencyOptions}
                            bankOptions={bankOptions}
                            showClientFields={transactionConfig.showClientFields}
                            descriptionEditable={transactionConfig.descriptionEditable}
                            descriptionAutoFill={transactionConfig.descriptionAutoFill}
                            showFees={transactionConfig.showFees}
                            showBankCharges={transactionConfig.showBankCharges}
                            showGstAmount={transactionConfig.showGstAmount}
                            bankDirection={transactionConfig.bankDirection}
                            onCurrencyChange={onCurrencyChange}
                            onBankChange={onBankChange}
                        />
                    )}

                    {shouldShowCouponFields && (
                        <TransactionCouponForm
                            isinOptions={isinOptions}
                            onIsinChange={onIsinChange}
                            holdingsData={holdingsData}
                            isinDetail={isinDetail}
                            bankOptions={bankOptions}
                        />
                    )}
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