import { FormProvider, useForm } from "react-hook-form";
import useDoula from "../../hooks/useDoula";
import { useDoulaStore } from "../../store/useDoulaStore";
import type { doulaRequest } from "../../schema/types/DoulaSchema.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { doulaRequestSchema } from "../../schema/schema/DoulaSchema";
import { toast } from "react-toastify";
import { FormInput, FormSelect } from "@/components/Form";
import { Button, ConfirmModal } from "@/components/common";
import { useState } from "react";

const STATUS_OPTIONS = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
]

export default function DoulaEdit() {
    const { selectedDoula, setOpen, typeMode  } = useDoulaStore()
    const { useEditDoula, useDoulaDetail } = useDoula()
    const [showConfirm, setShowConfirm] = useState(false)
    const { data: doulaDetail } = useDoulaDetail(typeMode === 'edit' ? selectedDoula?.id : "")
    const method = useForm<doulaRequest>({
            resolver: zodResolver(doulaRequestSchema),
            values: {
                user: {
                    phoneNumber: doulaDetail?.user?.phoneNumber ?? "",
                    countryCode: doulaDetail?.user?.countryCode ?? "",
                },
                status: doulaDetail?.status ?? ''
            }

        })
    const onSubmit = async (data: doulaRequest) => {
        try {
            if (!doulaDetail) return
            useEditDoula.mutate({ id: doulaDetail?.id, data: data }, {
                onSuccess: () => {
                    method.reset(data)
                    setOpen(false);
                }
            })
        } catch (error: any) {
            toast.error(error.response?.data?.message)
        }
    };
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
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
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
            <ModalWrapper title="Edit Doula">
                <form className="p-6 space-y-4">
                    <div className="flex">
                        <FormInput
                            name="user.countryCode"
                            label="Country Code"
                            placeholder="Country Code"
                        />
                        <FormInput
                            name="user.phoneNumber"
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
                title="Edit Doula"
                message="Are you sure you want to edit this doula?"
                confirmText="Edit"
                variant="info"
            />
        </FormProvider>
    </>)
}