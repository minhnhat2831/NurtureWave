import { zodResolver } from "@hookform/resolvers/zod"
import useHelpDocument from "../../hooks/useHelpDocument"
import { useHelpDocumentStore } from "../../store/useHelpDocumentStore"
import { helpDocumentRequestSchema } from "../../schema/HelpDocumentSchema"
import type { helpDocumentRequest } from "../../schema/HelpDocumentSchema.type"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import ModalWrapper from "@/components/common/FormModal"
import { useState } from "react"
import { Button, ConfirmModal, FormInput, FormSelect } from "@/components/common"

const STATUS_OPTIONS = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
]

export default function HelpDocumentModal() {
    const { selectedHelpDocument, setOpen, typeMode } = useHelpDocumentStore()
    const isEdit = typeMode === "edit"
    const [showConfirm, setShowConfirm] = useState(false)
    const { useCreateHelpDocument, useEditHelpDocument, useHelpDocumentDetail } = useHelpDocument()
    const { data: helpDocumentDetail } = useHelpDocumentDetail(isEdit ? selectedHelpDocument?.id : "")
    const method = useForm<helpDocumentRequest>({
        resolver: zodResolver(helpDocumentRequestSchema),
        values: isEdit ? {
            title: helpDocumentDetail?.title ?? "",
            content: helpDocumentDetail?.content ?? "",
            status: helpDocumentDetail?.status ?? "",
        } : {
            title: "",
            content: "",
            status: ""
        }
    })

    const onSubmit = async (data: helpDocumentRequest) => {
        try {
            if (isEdit && typeMode === "edit") {
                if (!helpDocumentDetail) return
                useEditHelpDocument.mutate({ id: helpDocumentDetail.id, data: data }, {
                    onSuccess: () => {
                        method.reset(data)
                        setOpen(false)
                    }
                })
            } else {
                useCreateHelpDocument.mutate(data, {
                    onSuccess: () => {
                        method.reset()
                        setOpen(false)
                    },
                    onError: (err: any) => {
                        const message = err.response?.data?.message
                        if (message.toLowerCase().includes("title")) {
                            method.setError("title", {
                                type: "server",
                                message
                            })
                            return
                        }
                        if (message.toLowerCase().includes("status")) {
                            method.setError("status", {
                                type: "server",
                                message
                            })
                            return
                        }
                        if (message.toLowerCase().includes("content")) {
                            method.setError("content", {
                                type: "server",
                                message
                            })
                            return
                        }
                    }
                })
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message)
        }
    }

    const handleCreateClick = async () => {
        const isValid = await method.trigger()
        if (isValid) {
            setShowConfirm(true)
        }
    }

    const handleConfirm = () => {
        method.handleSubmit((data) => {
            onSubmit(data as never)
            setShowConfirm(false)
        })()
    }

    return (<>
        <FormProvider {...method}>
            <ModalWrapper title={typeMode === 'create' ? "Create Document" : "Edit Document"} onClose={() => setOpen(false)} isLoading={typeMode === 'create' ? useCreateHelpDocument.isPending : useEditHelpDocument.isPending}>
                <form className="p-6 space-y-4">
                    <FormInput
                        name="title"
                        label="Title"
                        placeholder="Title"
                        required
                    />

                    <FormInput
                        name="content"
                        label="Content"
                        placeholder="content"
                        required
                    />

                    <FormSelect
                        name="status"
                        label="Status"
                        options={STATUS_OPTIONS}
                        placeholder="Select Status"
                        required
                    />

                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                        <Button type="button" variant="secondary" onClick={() => setOpen(false)} className="flex-1">
                            Cancel
                        </Button>
                        <Button type="button" variant="primary" onClick={() => handleCreateClick()} className="flex-1">
                            {typeMode === 'create' ? "Create" : "Edit"}
                        </Button>
                    </div>
                </form>
            </ModalWrapper>

            <ConfirmModal
                isOpen={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={handleConfirm}
                title={typeMode === 'create' ? "Create Document" : "Edit Document"}
                message={typeMode === 'create' ? "Are you sure you want to create this document?" : "Are you sure you want to edit this document?"}
                confirmText="Create"
                variant="info"
            />
        </FormProvider>
    </>)
}