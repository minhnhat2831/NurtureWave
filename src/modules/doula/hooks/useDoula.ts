import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { doulaDetail, doulaRequest } from "../schema/types/DoulaSchema.type"
import { deleteDoula, editDoula, getAllDoula, getDoulaDetail } from "../api/api"
import { toast } from "react-toastify"
import { useTableManager } from "@/hooks/useTableManager"

export default function useDoula() {
    const queryClient = useQueryClient()

    const useGetAllDoula = () => {
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
            queryKey: ["doulas"],
            queryFn: async ({ page, limit, search, sort }) => {
                try {
                    return await getAllDoula({
                        page,
                        limit,
                        search,
                        sort,
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

    const useDoulaDetail = (id?: string) => {
        const query = useQuery<doulaDetail>({
            queryKey: [`doulas`, id],
            queryFn: async () => {
                try {
                    const result = await getDoulaDetail(id)
                    return result.data
                } catch (err: any) {
                    toast.error(`${err.response?.data?.message}`)
                    throw err
                }
            },
            enabled: !!id,
        })

        return {
            data: query.data,
            loading: query.isLoading,
        }
    }

    const useEditDoula = useMutation({
        mutationFn: ({ data, id }: { data: doulaRequest, id: string }) =>
            editDoula(id, data),
        onSuccess: (res) => {
            toast.success(res.message)
            queryClient.invalidateQueries({ queryKey: ["doulas"] })
        },
    })

    const useDeleteDoula = useMutation({
        mutationFn: ({ id }: { id?: string }) =>
            deleteDoula(id),
        onSuccess: (res) => {
            toast.success(res.message)
            queryClient.invalidateQueries({ queryKey: ["doulas"] })
        },
    })

    return {
        useGetAllDoula,
        useDoulaDetail,
        useEditDoula,
        useDeleteDoula
    }
}