import { FormProvider, useForm } from "react-hook-form"
import { Button, Icons } from "@/components/common"
import DocumentAttacmentModal from "./DocumentAttacmentModal"
import TransactionDetailModal from "./TransactionDetailModal"
import InternalCommentModal from "./InternalCommentsModal"
import { useContextModalStore } from "../../store/useContextModalStore"

interface ModalTypeFormProps {
    typeForm?: 'debit' | 'credit' | null
    isOpen: boolean
    onClose?: () => void
    isLoading?: boolean
}

export default function ModalForm({
    typeForm,
    isOpen,
    onClose,
    isLoading
}: ModalTypeFormProps) {
    const method = useForm()
    const { openModal, open } = useContextModalStore()
    return (<>
        <FormProvider {...method}>
            {isOpen && <>
                <div className="fixed inset-0 z-50 flex items-center justify-end">
                    <div className="absolute inset-0 bg-black/50" onClick={isLoading ? undefined : onClose} />
                    <form className="relative bg-white shadow-xl mx-12 w-full max-w-500 min-w-87 h-auto max-h-[90%] overflow-y-auto">
                        <div className="z-40 sticky top-0 bg-white border-b border-gray-200 px-6 py-4 mb-5">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-xl font-semibold text-gray-900">Create Transaction - {typeForm}</h2>
                                <button
                                    onClick={onClose}
                                    className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                                >
                                    <Icons.closeButton />
                                </button>
                            </div>
                            <div className="flex bg-blue-200 p-2 rounded-xs border-blue-400 border">
                                <Icons.warning />
                                <p className="m-0 text-[14px]">
                                    This transaction is in <strong>Draft</strong> status. Please update the transaction details before submitting...
                                </p>
                            </div>
                        </div>

                        <div className="">
                            <div className="z-20 sticky top-0 bg-gray-100 border-b border-gray-200 mx-4 px-6 py-4 flex items-center justify-between" onClick={() => openModal(!open)}>
                                <h2 className="text-xl font-semibold text-gray-900">Transaction Detail</h2>
                                <button
                                    type="button"
                                    className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                                >
                                    {open ? <Icons.expand style="rotate-180" /> : <Icons.expand style="rotate-0"/>}
                                </button>
                            </div>
                            {/* Modal transaction detail */}
                            <TransactionDetailModal showCreate />
                        </div>

                        <div className="">
                            <div className="sticky top-0 bg-gray-100 border-b-2 border-gray-200 mx-4 px-6 py-4 flex items-center justify-between overflow-hidden" onClick={() => openModal(!open)}>
                                <h2 className="text-xl font-semibold text-gray-900 ">Document Attachment</h2>
                                <button
                                    type="button"
                                    className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                                >
                                    {open ? <Icons.expand style="rotate-180" /> : <Icons.expand style="rotate-0"/>}
                                </button>
                            </div>
                            {/* Modal Document Attachment */}
                            <DocumentAttacmentModal showCreate />
                        </div>

                        <div>
                            <div className="sticky top-0 bg-gray-100 border-b border-gray-200 mx-4 px-6 py-4 flex items-center justify-between" onClick={() => openModal(!open)}>
                                <h2 className="text-xl font-semibold text-gray-900">Internal Comments</h2>
                                <button
                                    type="button"
                                    className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                                >
                                    {open ? <Icons.expand style="rotate-180" /> : <Icons.expand style="rotate-0"/>}
                                </button>
                            </div>
                            {/* Modal Internal Comments */}
                            <InternalCommentModal showCreate/>
                        </div>

                        <div className="z-40 sticky bottom-0 p-4 bg-white border-t border-gray-200 px-4 overflow-hidden" >
                            <div className="flex items-center justify-between mb-2">
                                <Button onClick={onClose}>Cancel</Button>
                                <div className="flex">
                                    <Button className="bg-red-500 hover:bg-red-400">Save and Submit</Button>
                                    <Button>Submit</Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </>}
        </FormProvider>
    </>)
}