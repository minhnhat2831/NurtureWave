import { toast } from "react-toastify";
import { useSearchSettingStore } from "../../store/useSearchSettingStore";
import useSearchSetting from "../../hooks/useSearchSetting";
import { ConfirmModal } from "@/components/common";

export default function SearchSettingDelete() {
    const { selectedSearchSetting, open, setOpen } = useSearchSettingStore()
    const { useDeleteSearchSetting } = useSearchSetting()
    const handleDelete = async () => {
        try {
            if (!selectedSearchSetting) return
            useDeleteSearchSetting.mutate({ id: selectedSearchSetting.id }, {
                onSuccess: () => {
                    setOpen(false)
                }
            })
        } catch (error: any) {
            toast.error(error.response?.data?.message)
        }
    }

    return (<>
        <ConfirmModal
            isOpen={open}
            onClose={() => {
                setOpen(false)
            }}
            onConfirm={handleDelete}
            title="Delete keyword"
            message="Are you sure you want to delete this keyword? This action cannot be undone."
            confirmText="Delete"
            variant="danger"
            isLoading={useDeleteSearchSetting.isPending}
        />
    </>)
}