import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { searchSettingRequest } from "../schema/SearchSettingSchema.type"
import { createSearchSetting, deleteSearchSetting, editSearchSetting, getAllSearchSetting } from "../api/api"
import { toast } from "react-toastify"
import { useTableManager } from "@/hooks/useTableManager"

export default function useSearchSetting() {
    const queryClient = useQueryClient()

    const useGetAllSearchSetting = () => {
        const {
            data,
            limit,
            isLoading,
            page,
            metadata,
            search,
            setLimit,
            setPage,
            setSearch,
            setSort,
            sort,
        } = useTableManager({
            queryKey: ['trending-keywords'],
            queryFn: async ({ page, limit, search, sort }) => {
                try {
                    return await getAllSearchSetting({
                        page,
                        limit,
                        search,
                        sort
                    })
                } catch (err: any) {
                    toast.error(err.response?.data?.message)
                    throw err
                }
            }
        })

        return {
            data,
            limit,
            isLoading,
            page,
            metadata,
            search,
            setLimit,
            setPage,
            setSearch,
            setSort,
            sort,
        }
    }

    const useCreateSearchSetting = useMutation({
        mutationFn: createSearchSetting,
        onSuccess: (err) => {
            toast.success(err.message)
            queryClient.invalidateQueries({ queryKey: ["trending-keywords"] })
        }
    })

    const useEditSearchSetting = useMutation({
        mutationFn: ({ data, id }: { data: searchSettingRequest, id: string }) =>
            editSearchSetting(id, data),
        onSuccess: (err) => {
            toast.success(err.message)
            queryClient.invalidateQueries({ queryKey: ['trending-keywords'] })
        }
    })

    const useDeleteSearchSetting = useMutation({
        mutationFn: ({ id }: { id?: string }) =>
            deleteSearchSetting(id),
        onSuccess: (err) => {
            toast.success(err.message)
            queryClient.invalidateQueries({ queryKey: ['trending-keywords'] })
        }
    })

    return {
        useGetAllSearchSetting,
        useCreateSearchSetting,
        useEditSearchSetting,
        useDeleteSearchSetting
    }
}