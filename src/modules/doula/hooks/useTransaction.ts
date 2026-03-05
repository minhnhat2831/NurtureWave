import { toast } from "react-toastify"
import { getAllTransaction } from "../api/api"
import { useTableManager } from "@/hooks/useTableManager"

export const useTransaction = (f_doulaId: string | undefined) => {
    const {
        data,
        metadata,
        page,
        limit,
        search,
        setPage,
        setLimit,
        setSearch,
        setSort,
        isLoading,
    } = useTableManager({
        queryKey: ["transaction", f_doulaId as string],
        queryFn: async ({ page, limit, search, sort }) => {
            try {
                return await getAllTransaction({
                    page,
                    limit,
                    search,
                    sort,
                    f_doulaId
                })
            } catch (err: any) {
                toast.error(err.response?.data?.message)
                throw err
            }
        },
    })

    return {
        data: data ?? [],
        metadata: metadata ?? null,
        loading: isLoading,
        setSearch,
        page,
        limit,
        search,
        setPage,
        setLimit,
        setSort,
    }
}