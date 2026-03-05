import { getAllCares } from "../api/api"
import { toast } from "react-toastify"
import { useTableManager } from "@/hooks/useTableManager"

export const useCare = (id: string | undefined) => {
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
        queryKey: ["cares", id as string],
        queryFn: async ({ page, limit, search, sort }) => {
            try {
                return await getAllCares({
                    page,
                    limit,
                    search,
                    sort,
                    f_userId: id
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
        isLoading,
        setSearch,
        page,
        limit,
        search,
        setPage,
        setLimit,
        setSort,
    }
}