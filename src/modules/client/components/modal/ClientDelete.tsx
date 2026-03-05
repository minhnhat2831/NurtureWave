import { ConfirmModal } from "@/components/common"
import { toast } from "react-toastify"
import useClient from "../../hooks/useClient"
import { useClientStore } from "../../store/useClientStore"

export default function ClientDelete() {
    const { useDeleteClient } = useClient()
    const { selectedClient, open, setOpen } = useClientStore()

    const handleDeleteConfirm = () => {
        try {
            if (!selectedClient || !selectedClient.id) return null
            useDeleteClient.mutate({ id: selectedClient?.id })
            setOpen(false)
        } catch (error: any) {
            const message = error.response?.data.message
            toast.error(message)
        }

    }
    return (<>
        <ConfirmModal
            isOpen={open}
            onClose={() => {
                setOpen(false)
            }}
            onConfirm={handleDeleteConfirm}
            title="Delete Client"
            message="Are you sure you want to delete this client? This action cannot be undone."
            confirmText="Delete"
            variant="danger"
            isLoading={useDeleteClient.isPending}
        />
    </>)
}