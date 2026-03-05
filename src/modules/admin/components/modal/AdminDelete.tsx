import { ConfirmModal } from "@/components/common"
import useAdmin from "../../hooks/useAdmin"
import { toast } from "react-toastify"
import { useAdminStore } from "../../store/useAdminStore"

export default function AdminDelete() {
    const { useDeleteAdmin } = useAdmin()
    const { selectedAdmin, open, setOpen } = useAdminStore()

    const handleDeleteConfirm = () => {
        try{
            if(!selectedAdmin || !selectedAdmin.id) return null
            useDeleteAdmin.mutate({ id : selectedAdmin?.id})
            setOpen(false)
        }catch(error : any){
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
            title="Delete Admin"
            message="Are you sure you want to delete this admin? This action cannot be undone."
            confirmText="Delete"
            variant="danger"
            isLoading={useDeleteAdmin.isPending}
        />
    </>)
}