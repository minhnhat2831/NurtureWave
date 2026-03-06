import { toast } from "react-toastify"
import useHelpDocument from "../../hooks/useHelpDocument"
import { useHelpDocumentStore } from "../../store/useHelpDocumentStore"
import { ConfirmModal } from "@/components/common"

export default function HelpDocumentDelete() {
    const { selectedHelpDocument, open, setOpen } = useHelpDocumentStore()
    const { useDeleteHelpDocument } = useHelpDocument()
    const handleDelete = async () => {
        try {
            if (!selectedHelpDocument) return
            useDeleteHelpDocument.mutate({ id: selectedHelpDocument?.id }, {
                onSuccess: () => {
                    setOpen(false)
                }
            })
        } catch (error: any) {
            toast.error(error.response?.data?.message)
        }
    }
    return (
        <>
            <ConfirmModal
                isOpen={open}
                onClose={() => {
                    setOpen(false)
                }}
                onConfirm={handleDelete}
                title="Delete Document"
                message="Are you sure you want to delete this document? This action cannot be undone."
                confirmText="Delete"
                variant="danger"
                isLoading={useDeleteHelpDocument.isPending}
            />
        </>
    )
}