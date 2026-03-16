import { useEffect, useMemo, useRef } from "react"
import { useFormContext } from "react-hook-form"
import { useTransactionModalStore } from "../../store/useTransactionModalStore"
import { useModalTypeStore } from "../../store/useModalTypeStore"
import TransactionStatusSelector from "../form/TransactionStatusSelector"
import TransactionBaseFieldsForm from "../form/TransactionBaseFieldsForm"
import TransactionCouponForm from "../form/TransactionCouponForm"
import TransactionSelectController from "../form/TransactionSelectController"
import TransactionConfirmView from "./TransactionConfirmView"
import { useTransactionDetailForm } from "../../hook/useTransactionDetailForm"
import { useTransactionDetail } from "../../hook/useTransactionDetail"
import { mapTransactionDetailToEditForm, mapTransactionDetailToForm } from "../../utils/transactionDetailForm"
import { resolveEffectiveTransactionMode } from "../../utils/transactionMode"
import type { TransactionCreateFormInput } from "../../schema/TransactionCreateFormSchema"

interface TransactionDetailProps {
    mode: "Create" | "Edit" | "View"
    isOpen: boolean
}

export default function TransactionDetailModal({ mode, isOpen }: TransactionDetailProps) {
    const { reset } = useFormContext<TransactionCreateFormInput>()
    const { transactionType } = useTransactionModalStore()
    const { selectedData } = useModalTypeStore()
    const transactionId = selectedData?.transactionId
    const hydratedTransactionIdRef = useRef<string | null>(null)

    const { useGetListDetail } = useTransactionDetail()

    const { data: detailData } = useGetListDetail(transactionId, {
        enabled: mode !== "Create" && !!transactionId
    })
    const detail = detailData?.data

    const mappedView = useMemo(
        () => (detail ? mapTransactionDetailToForm(detail) : undefined),
        [detail]
    )
    const mappedEdit = useMemo(
        () => (detail ? mapTransactionDetailToEditForm(detail) : undefined),
        [detail]
    )

    const effectiveMode = resolveEffectiveTransactionMode(
        mode,
        detail?.cashOrderData?.orderStatus,
        detail?.cashOrderData?.transactionType,
    )

    const isCreate = effectiveMode === "Create"
    const isEdit = effectiveMode === "Edit"
    const isView = effectiveMode === "View"

    useEffect(() => {
        if (!isOpen) {
            hydratedTransactionIdRef.current = null
            return
        }

        if (!mappedEdit || !isEdit || !transactionId) return
        if (hydratedTransactionIdRef.current === transactionId) return

        reset(mappedEdit)
        hydratedTransactionIdRef.current = transactionId
    }, [isEdit, isOpen, mappedEdit, reset, transactionId])

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
        onClientChange
    } = useTransactionDetailForm(transactionType)

    if (!isOpen) return null

    return (
        <div className="z-30 sticky h-auto bg-white border border-gray-200 mx-4 mb-4">

            {(isCreate || isEdit) && (
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
                            config={{
                                showClientFields: transactionConfig.showClientFields,
                                descriptionEditable: transactionConfig.descriptionEditable,
                                descriptionAutoFill: transactionConfig.descriptionAutoFill,
                                showFees: transactionConfig.showFees,
                                showBankCharges: transactionConfig.showBankCharges,
                                showGstAmount: transactionConfig.showGstAmount,
                                bankDirection: transactionConfig.bankDirection,
                            }}
                            handlers={{
                                onCurrencyChange,
                                onBankChange,
                                onOrgChange: onClientChange,
                            }}
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

            {isView && mappedView && (
                <TransactionConfirmView values={mappedView} />
            )}

        </div>
    )
}