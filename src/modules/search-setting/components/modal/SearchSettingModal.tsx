import { FormProvider, useForm } from "react-hook-form"
import useSearchSetting from "../../hooks/useSearchSetting"
import { useSearchSettingStore } from "../../store/useSearchSettingStore"
import type { searchSettingRequest } from "../../schema/SearchSettingSchema.type"
import { searchSettingRequestScheme } from "../../schema/SearchSettingSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import ModalWrapper from "@/components/common/FormModal"
import { Button, ConfirmModal, FormInput } from "@/components/common"

export default function SearchSettingModal() {
    const { selectedSearchSetting, setOpen, typeMode } = useSearchSettingStore()
    const isEdit = typeMode === "edit"
    const [showConfirm, setShowConfirm] = useState(false)
    const { useCreateSearchSetting, useEditSearchSetting } = useSearchSetting()
    const method = useForm<searchSettingRequest>({
        resolver: zodResolver(searchSettingRequestScheme),
        values: isEdit ? {
            keyword: selectedSearchSetting?.keyword ?? "",
        } : {
            keyword: ""
        }
    })

    const onSubmit = async (data: searchSettingRequest) => {
        try {
            const searchSettingData = { ...(data), count: 1, isSuggestion: true }
            if (isEdit && typeMode === 'edit') {
                if (!selectedSearchSetting) return
                useEditSearchSetting.mutate({ id: selectedSearchSetting?.id, data: searchSettingData }, {
                    onSuccess: () => {
                        method.reset(searchSettingData)
                        setOpen(false)
                    }
                })
            } else {
                useCreateSearchSetting.mutate(searchSettingData, {
                    onSuccess: () => {
                        method.reset()
                        setOpen(false)
                    }
                })
            }
        } catch (err: any) {
            const message = err.response?.data?.message
            if (message.toLowerCase().includes("keyword")) {
                method.setError("keyword", {
                    type: "server",
                    message
                })
                return
            }
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
            <ModalWrapper title={typeMode === 'create' ? "Create Keyword" : "Edit Keyword"} onClose={() => setOpen(false)} isLoading={typeMode === 'create' ? useCreateSearchSetting.isPending : useEditSearchSetting.isPending}>
                <form className="p-6 space-y-4">
                    <FormInput
                        name="keyword"
                        label="Keyword"
                        placeholder="keyword"
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
                title={typeMode === 'create' ? "Create Keyword" : "Edit Keyword"}
                message={typeMode === 'create' ? "Are you sure you want to create this keyword?" : "Are you sure you want to edit this keyword?"}
                confirmText="Create"
                variant="info"
            />
        </FormProvider>
    </>)
}