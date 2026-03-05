import { ConfirmModal } from "@/components/common"
import { toast } from "react-toastify"
import useDoula from "../../hooks/useDoula"
import { useDoulaStore } from "../../store/useDoulaStore"

export default function DoulaDelete() {
    const { useDeleteDoula } = useDoula()
    const { selectedDoula, open, setOpen } = useDoulaStore()

    const handleDeleteConfirm = () => {
        try {
            if (!selectedDoula || !selectedDoula.id) return null
            useDeleteDoula.mutate({ id: selectedDoula?.id })
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
            title="Delete Doula"
            message="Are you sure you want to delete this doula? This action cannot be undone."
            confirmText="Delete"
            variant="danger"
            isLoading={useDeleteDoula.isPending}
        />
    </>)
}