import { useState } from "react"
import { FormProvider } from "react-hook-form"
import { toast } from "react-toastify"
import { Button, Icons } from "@/components/common"
import DocumentAttacmentModal from "./DocumentAttacmentModal"
import TransactionDetailModal from "./TransactionDetailModal"
import InternalCommentModal from "./InternalCommentsModal"
import TransactionConfirmView from "./TransactionConfirmView"
import { useContextModalStore } from "../../store/useContextModalStore"
import { getTransactionActionByStatus, useTransactionCreateForm } from "../../hook/useTransactionCreateForm"
import type { TransactionCreateFormInput } from "../../schema/TransactionCreateFormSchema"
import type { CashTransactionPayload } from "../../types"
import { useCreatedTransactionsStore } from "../../store/useCreatedTransactionsStore"

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
    const [step, setStep] = useState<"form" | "confirm">("form")
    const [pending, setPending] = useState<PendingConfirm | null>(null)
    const addTransaction = useCreatedTransactionsStore((state) => state.addTransaction)
    const { openModal, open, closeModal } = useContextModalStore()
    const closeAll = () => {
        closeModal()
        onClose?.()
    }

    const { method, buildTransactionPayload, closeAfterCreate, isSubmitting, resetForm } = useTransactionCreateForm({ onClose: closeAll })
    const disabled = isLoading || isSubmitting

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
        const payload = buildTransactionPayload(pending.values, pending.action)
        addTransaction(payload)
        toast.success("Transaction saved locally")
        resetConfirmState()
        closeAfterCreate()
    }

    const handleBackToForm = () => setStep("form")

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
                                    <div className="z-20 sticky top-0 bg-gray-100 border-b border-gray-200 mx-4 px-6 py-4 flex items-center justify-between" onClick={() => openModal(!open)}>
                                        <h2 className="text-xl font-semibold text-gray-900">Transaction Detail</h2>
                                        <button
                                            type="button"
                                            className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                                        >
                                            {open ? <Icons.expand style="rotate-180" /> : <Icons.expand style="rotate-0" />}
                                        </button>
                                    </div>
                                    <TransactionDetailModal mode={mode} />
                                </div>

                                <div>
                                    <div className="sticky top-0 bg-gray-100 border-b-2 border-gray-200 mx-4 px-6 py-4 flex items-center justify-between overflow-hidden" onClick={() => openModal(!open)}>
                                        <h2 className="text-xl font-semibold text-gray-900">Document Attachment</h2>
                                        <button
                                            type="button"
                                            className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                                        >
                                            {open ? <Icons.expand style="rotate-180" /> : <Icons.expand style="rotate-0" />}
                                        </button>
                                    </div>
                                    <DocumentAttacmentModal mode={mode} />
                                </div>

                                <div>
                                    <div className="sticky top-0 bg-gray-100 border-b border-gray-200 mx-4 px-6 py-4 flex items-center justify-between" onClick={() => openModal(!open)}>
                                        <h2 className="text-xl font-semibold text-gray-900">Internal Comments</h2>
                                        <button
                                            type="button"
                                            className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                                        >
                                            {open ? <Icons.expand style="rotate-180" /> : <Icons.expand style="rotate-0" />}
                                        </button>
                                    </div>
                                    <InternalCommentModal mode={mode} />
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
                                        {mode === 'View' ? '' : <>
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
                                            Create
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