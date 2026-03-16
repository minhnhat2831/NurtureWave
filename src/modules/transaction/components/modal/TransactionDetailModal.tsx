import { useTransactionModalStore } from "../../store/useTransactionModalStore"
import { useContextModalStore } from "../../store/useContextModalStore"
import { useModalTypeStore } from "../../store/useModalTypeStore"
import TransactionStatusSelector from "../form/TransactionStatusSelector"
import TransactionBaseFieldsForm from "../form/TransactionBaseFieldsForm"
import TransactionCouponForm from "../form/TransactionCouponForm"
import TransactionSelectController from "../form/TransactionSelectController"
import TransactionConfirmView from "./TransactionConfirmView"
import { useTransactionDetailForm } from "../../hook/useTransactionDetailForm"
import { useTransactionDetail } from "../../hook/useTransactionDetail"
import { mapTransactionDetailToForm } from "../../utils/transactionDetailForm"

interface TransactionDetailProps {
    mode: "Create" | "Edit" | "View"
}

export default function TransactionDetailModal({ mode }: TransactionDetailProps) {
    const { transactionType } = useTransactionModalStore()
    const { open } = useContextModalStore()
    const { selectedData } = useModalTypeStore()
    const transactionId = selectedData?.transactionId

    const { useGetListDetail } = useTransactionDetail()

    const { data: detailData } = useGetListDetail(transactionId, {
        enabled: mode !== "Create" && !!transactionId
    })
    const detail = detailData?.data

    const EDITABLE_STATUSES = ["draft", "pending-maker"]

    const canEdit = EDITABLE_STATUSES.includes(detail?.cashOrderData?.orderStatus ?? "")

    const mapped = detail ? mapTransactionDetailToForm(detail) : undefined

    const effectiveMode =
        mode === "View" && canEdit
            ? "Edit"
            : mode

    const isCreate = effectiveMode === "Create"
    const isEdit = effectiveMode === "Edit"
    const isView = effectiveMode === "View"

    const {
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
    } = useTransactionDetailForm(transactionType)

    if (!open) return null

    return (
        <div className="z-30 sticky h-auto bg-white border border-gray-200 mx-4 mb-4">

            {(isCreate || (isEdit && canEdit)) && (
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
                            orgOptions={orgOptions}
                            subOrgOptions={subOrgOptions}
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
                            onOrgChange={onClientChange}
                            onSubOrgChange={onSubOrgChange}
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
            )}

            {(!canEdit || isView) && mapped && (
                <TransactionConfirmView values={mapped} />
            )}

        </div>
    )
}