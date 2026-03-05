import { toast } from "react-toastify"
import { getAllDoulaReview } from "../api/api"
import { useTableManager } from "@/hooks/useTableManager"

export const useDoulaReview = (f_doulaId: string | undefined) => {
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
        queryKey: ["doula-review", f_doulaId as string],
        queryFn: async ({ page, limit }) => {
            try {
                return await getAllDoulaReview({
                    page,
                    limit,

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