import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { FormProvider } from "react-hook-form"
import { toast } from "react-toastify"
import { Button, Icons } from "@/components/common"
import DocumentAttacmentModal from "./DocumentAttacmentModal"
import TransactionDetailModal from "./TransactionDetailModal"
import InternalCommentModal from "./InternalCommentsModal"
import TransactionConfirmView from "./TransactionConfirmView"
import { updateTransactionDetailLocally } from "../../api/transaction-list"
import { getTransactionActionByStatus, useTransactionCreateForm } from "../../hook/useTransactionCreateForm"
import type { TransactionCreateFormInput } from "../../schema/TransactionCreateFormSchema"
import type { CashTransactionPayload } from "../../types"
import { useCreatedTransactionsStore } from "../../store/useCreatedTransactionsStore"
import { useModalTypeStore } from "../../store/useModalTypeStore"
import { isEditableCashByStatusAndType, resolveEffectiveTransactionMode } from "../../utils/transactionMode"

interface ModalTypeFormProps {
    typeForm?: 'debit' | 'credit' | null
    mode: "Create" | "Edit" | "View"
    isOpen: boolean
    onClose?: () => void
    isLoading?: boolean
}

interface PendingConfirm {
    values: TransactionCreateFormInput
    action: CashTransactionPayload["action"]
}

export default function ModalForm({
    typeForm,
    isOpen,
    onClose,
    isLoading,
    mode
}: ModalTypeFormProps) {
    const queryClient = useQueryClient()
    const [step, setStep] = useState<"form" | "confirm">("form")
    const [pending, setPending] = useState<PendingConfirm | null>(null)
    const [openSections, setOpenSections] = useState({
        detail: false,
        document: false,
        comments: false,
    })
    const addTransaction = useCreatedTransactionsStore((state) => state.addTransaction)
    const { selectedData } = useModalTypeStore()
    const closeAll = () => {
        onClose?.()
    }

    const { method, buildTransactionPayload, closeAfterCreate, isSubmitting, resetForm } = useTransactionCreateForm({ onClose: closeAll })
    const disabled = isLoading || isSubmitting
    const selectedOrderStatus = selectedData?.orderStatusAlias || selectedData?.orderStatus
    const isEditableCashDetail = isEditableCashByStatusAndType(selectedOrderStatus, selectedData?.transactionType)
    const effectiveMode = resolveEffectiveTransactionMode(mode, selectedOrderStatus, selectedData?.transactionType)

    const resetConfirmState = () => {
        setStep("form")
        setPending(null)
    }

    const handleSaveAndClose = () => {
        setPending({ values: method.getValues(), action: "request-draft" })
        setStep("confirm")
    }

    const handleSaveAndSubmit = method.handleSubmit((formValues) => {
        setPending({
            values: formValues as TransactionCreateFormInput,
            action: getTransactionActionByStatus(String(formValues.data.status || "")),
        })
        setStep("confirm")
    })

    const handleConfirmCreate = () => {
        if (!pending) return

        if (isEditableCashDetail && selectedData?.transactionId) {
            updateTransactionDetailLocally(selectedData.transactionId, pending.values)
            queryClient.invalidateQueries({ queryKey: ["list"] })
            queryClient.invalidateQueries({ queryKey: ["list-detail", selectedData.transactionId] })
            toast.success("Transaction updated locally")
            resetConfirmState()
            resetForm()
            method.clearErrors()
            closeAll()
            return
        }

        const payload = buildTransactionPayload(pending.values, pending.action)
        addTransaction(payload)
        toast.success("Transaction saved locally")
        resetConfirmState()
        closeAfterCreate()
    }

    const handleBackToForm = () => setStep("form")

    const toggleSection = (section: "detail" | "document" | "comments") => {
        setOpenSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }))
    }

    const handleClose = () => {
        if (disabled) return
        resetConfirmState()
        resetForm()
        method.clearErrors()
        closeAll()
    }

    return (<>
        <FormProvider {...method}>
            {isOpen && <>
                <div className="fixed inset-0 z-50 flex items-center justify-end">
                    <div className="absolute inset-0 bg-black/50" onClick={disabled ? undefined : handleClose} />
                    <form className="relative bg-white shadow-xl mx-12 w-full max-w-500 min-w-87 h-auto max-h-[90%] overflow-y-auto">
                        <div className="z-40 sticky top-0 bg-white border-b border-gray-200 px-6 py-4 mb-5">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-xl font-semibold text-gray-900">Create Transaction - {typeForm}</h2>
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    disabled={disabled}
                                    className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                                >
                                    <Icons.closeButton />
                                </button>
                            </div>
                            {step === "form" && (
                                <div className="flex bg-blue-200 p-2 rounded-xs border-blue-400 border">
                                    <Icons.warning />
                                    <p className="m-0 text-[14px]">
                                        This transaction is in <strong>Draft</strong> status. Please update the transaction details before submitting...
                                    </p>
                                </div>
                            )}
                            {step === "confirm" && (
                                <div className="flex bg-yellow-100 p-2 rounded-xs border-yellow-400 border">
                                    <Icons.warning />
                                    <p className="m-0 text-[14px]">
                                        Please review the transaction details before confirming.
                                    </p>
                                </div>
                            )}
                        </div>

                        {step === "form" ? (
                            <>
                                <div>
                                    <div className="z-20 sticky top-0 bg-gray-100 border-b border-gray-200 mx-4 px-6 py-4 flex items-center justify-between" onClick={() => toggleSection("detail")}>
                                        <h2 className="text-xl font-semibold text-gray-900">Transaction Detail</h2>
                                        <button
                                            type="button"
                                            className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                                        >
                                            {openSections.detail ? <Icons.expand style="rotate-180" /> : <Icons.expand style="rotate-0" />}
                                        </button>
                                    </div>
                                    {openSections.detail && (
                                        <TransactionDetailModal mode={effectiveMode} isOpen={openSections.detail} />
                                    )}
                                </div>

                                <div>
                                    <div className="sticky top-0 bg-gray-100 border-b-2 border-gray-200 mx-4 px-6 py-4 flex items-center justify-between overflow-hidden" onClick={() => toggleSection("document")}>
                                        <h2 className="text-xl font-semibold text-gray-900">Document Attachment</h2>
                                        <button
                                            type="button"
                                            className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                                        >
                                            {openSections.document ? <Icons.expand style="rotate-180" /> : <Icons.expand style="rotate-0" />}
                                        </button>
                                    </div>
                                    {openSections.document && (
                                        <DocumentAttacmentModal mode={effectiveMode} isOpen={openSections.document} />
                                    )}
                                </div>

                                <div>
                                    <div className="sticky top-0 bg-gray-100 border-b border-gray-200 mx-4 px-6 py-4 flex items-center justify-between" onClick={() => toggleSection("comments")}>
                                        <h2 className="text-xl font-semibold text-gray-900">Internal Comments</h2>
                                        <button
                                            type="button"
                                            className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                                        >
                                            {openSections.comments ? <Icons.expand style="rotate-180" /> : <Icons.expand style="rotate-0" />}
                                        </button>
                                    </div>
                                    {openSections.comments && (
                                        <InternalCommentModal mode={effectiveMode} isOpen={openSections.comments} />
                                    )}
                                </div>

                            </>
                        ) : (
                            pending && <TransactionConfirmView values={pending.values} />
                        )}

                        <div className="z-40 sticky bottom-0 p-4 bg-white border-t border-gray-200 px-4 overflow-hidden">
                            <div className="flex items-center justify-between mb-2">
                                {step === "form" ? (
                                    <>
                                        <Button type="button" onClick={handleClose} disabled={disabled}>Close</Button>
                                        {effectiveMode === 'View' ? '' : <>
                                            <div className="flex">
                                                <Button
                                                    type="button"
                                                    className="bg-red-500 hover:bg-red-400"
                                                    onClick={handleSaveAndClose}
                                                    disabled={disabled}
                                                    loading={isSubmitting}
                                                >
                                                    Save and Close
                                                </Button>
                                                <Button
                                                    type="button"
                                                    onClick={handleSaveAndSubmit}
                                                    disabled={disabled}
                                                    loading={isSubmitting}
                                                >
                                                    Save and Submit
                                                </Button>
                                            </div>
                                        </>}
                                    </>
                                ) : (
                                    <>
                                        <Button type="button" onClick={handleBackToForm} disabled={disabled}>Back</Button>
                                        <Button
                                            type="button"
                                            onClick={handleConfirmCreate}
                                            disabled={disabled}
                                            loading={isSubmitting}
                                        >
                                            {effectiveMode === "Edit" ? "Save" : "Create"}
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </>}
        </FormProvider>
    </>)
}