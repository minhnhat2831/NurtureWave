import { FormInput, FormSelect } from "@/components/Form"
import { useAdminStore } from "../../store/useAdminStore"
import { FormProvider, useForm } from "react-hook-form"
import { Button, ConfirmModal, Icons } from "@/components/common"
import type { createAdminUser, editAdminUser } from "../../schema/AdminSchema.type"
import useAdmin from "../../hooks/useAdmin"
import { zodResolver } from "@hookform/resolvers/zod"
import { createAdminUserSchema, editAdminUserSchema } from "../../schema/AdminSchema"
import { toast } from "react-toastify"
import { useState } from "react"

const ADMIN_STATUS_OPTIONS = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
]

type AdminFormValues = createAdminUser | editAdminUser;

export default function AdminModal() {
    const { useAdminDetail } = useAdmin()
    const { selectedAdmin, typeMode, setOpen } = useAdminStore()
    const isEdit = typeMode === 'edit'
    const { data: dataDetail } = useAdminDetail(isEdit ? (selectedAdmin?.id ?? undefined) : undefined)
    const { useCreateAdmin, useEditAdmin } = useAdmin()
    const [showConfirm, setShowConfirm] = useState(false)
    const method = useForm<AdminFormValues>({
        resolver: zodResolver(
            typeMode === "create" ? createAdminUserSchema : editAdminUserSchema),
        values: {
            username: dataDetail?.username ?? "",
            firstName: dataDetail?.firstName ?? "",
            lastName: dataDetail?.lastName ?? "",
            email: dataDetail?.email ?? "",
            status: dataDetail?.status ?? "",
            password: "",
        }
    });

    const onSubmit = async (data: AdminFormValues) => {
        if (isEdit) {
            if (!dataDetail || !dataDetail.id) return
            useEditAdmin.mutate(
                { data: data as editAdminUser, id: dataDetail.id },
                {
                    onSuccess: () => {
                        method.reset()
                        setOpen(false)
                    }
                }
            )
        } else {
            useCreateAdmin.mutate(
                data as createAdminUser,
                {
                    onSuccess: () => {
                        method.reset()
                        setOpen(false)
                    },
                    onError: (error: any) => {
                        const message = error.response?.data?.message
                        if (message?.toLowerCase().includes("username")) {
                            method.setError("username", {
                                type: "server",
                                message,
                            })
                            return
                        }
                        if (message?.toLowerCase().includes("email")) {
                            method.setError("email", {
                                type: "server",
                                message,
                            })
                            return
                        }
                        toast.error(message)
                    },
                }
            )
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
            <ModalWrapper title={typeMode === 'create' ? "Create Admin" : "Edit Admin"}>
                <form className="p-6 space-y-4">
                    <FormInput
                        name="username"
                        label="User Name"
                        placeholder="User Name"
                        required
                        disabled={typeMode === 'edit'}
                    />

                    <div className="flex">
                        <FormInput
                            name="firstName"
                            label="First Name"
                            placeholder="First Name"
                            required
                        />
                        <FormInput
                            name="lastName"
                            label="Last Name"
                            placeholder="Last Name"
                            required
                        />
                    </div>

                    <FormInput
                        name="email"
                        label="Email"
                        placeholder="Email"
                        required
                    />

                    <FormSelect
                        name="status"
                        label="Status"
                        options={ADMIN_STATUS_OPTIONS}
                        placeholder="Select Status"
                        required
                    />

                    <FormInput
                        name="password"
                        label="Password"
                        placeholder="Password"
                        type="password"
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
                title={typeMode === 'create' ? "Create Admin" : "Edit Admin"}
                message={typeMode === 'create' ? "Are you sure you want to create this admin?" : "Are you sure you want to edit this admin?"}
                confirmText="Create"
                variant="info"
            />
        </FormProvider>
    </>)
}