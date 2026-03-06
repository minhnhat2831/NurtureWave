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
import ModalWrapper from "@/components/common/FormModal";

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
            <ModalWrapper title="Edit Doula" onClose={() => setOpen(false)} isLoading={useEditDoula.isPending}>
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