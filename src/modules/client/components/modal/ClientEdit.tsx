import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import { useState } from "react"
import { useClientStore } from "../../store/useClientStore"
import useClient from "../../hooks/useClient"
import type { clientRequest } from "../../schema/types/ClientSchema.type"
import { clientRequestSchema } from "../../schema/schemas/ClientSchema"
import { FormInput, FormSelect } from "@/components/Form"
import { Button, ConfirmModal, Icons } from "@/components/common"

const STATUS_OPTIONS = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
]

export default function ClientEdit() {
    const { selectedClient, setOpen, typeMode } = useClientStore()
    const [showConfirm, setShowConfirm] = useState(false)
    const { useEditClient, useClientDetail } = useClient()
    const { data: clientData } = useClientDetail(typeMode === 'edit' ? selectedClient?.id : "")
    const method = useForm<clientRequest>({
            resolver: zodResolver(clientRequestSchema),
            values:
                {
                    phoneNumber: clientData?.phoneNumber ?? '',
                    countryCode: clientData?.countryCode ?? "",
                    status: clientData?.status ?? ""
                } 
        })

    const onSubmit = async (data: clientRequest) => {
        try {
            if (!clientData) return
            useEditClient.mutate({ id: clientData.id, data: data }, {
                onSuccess: () => {
                    method.reset(data)
                    setOpen(false);
                }
            })

        } catch (error: any) {
            toast.error(error.response?.data?.message)
        }
    }

    const ModalWrapper = ({
        title,
        children,
    }: {
        title: string
        children: React.ReactNode
    }) => (
        <div className="fixed inset-0 z-50 flex items-center justify-end">
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative bg-white shadow-xl w-full max-w-xl h-full overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                    <button
                        onClick={() => setOpen(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                    >
                        <Icons.closeButton />
                    </button>
                </div>
                {children}
            </div>
        </div>
    )

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
            <ModalWrapper title="Edit Client">
                <form className="p-6 space-y-4">
                    <div className="flex">
                        <FormInput
                            name="countryCode"
                            label="Country Code"
                            placeholder="Country Code"
                        />
                        <FormInput
                            name="phoneNumber"
                            label="Phone Number"
                            placeholder="Phone Number"
                            type="number"
                        />
                    </div>

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
                            Edit
                        </Button>
                    </div>
                </form>
            </ModalWrapper>

            <ConfirmModal
                isOpen={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={handleConfirm}
                title="Edit Client"
                message="Are you sure you want to edit this client?"
                confirmText="Edit"
                variant="info"
            />
        </FormProvider>
    </>)
}