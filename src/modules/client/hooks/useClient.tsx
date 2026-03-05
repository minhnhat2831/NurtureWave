import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteClient, editClient, getAllClient, getClientDetail } from "../api/api"
import { toast } from "react-toastify"
import { useTableManager } from "@/hooks/useTableManager"
import type { clientListItem, clientRequest } from "../schema/types/ClientSchema.type"
export default function useClient() {
    const queryClient = useQueryClient()
    const useGetAllClient = () => {
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
            sort,
            isLoading,
        } = useTableManager({
            queryKey: ["users"],
            queryFn: async ({ page, limit, search, sort }) => {
                try {
                    return await getAllClient({
                        page,
                        limit,
                        search,
                        sort,
                        embed : "address.fullAddress"
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
            sort
        }
    }

    const useClientDetail = (id?: string) => {
        const query = useQuery<clientListItem>({
            queryKey: [`users`, id],
            queryFn: async () => {
                try {
                    const result = await getClientDetail(id)
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

    const useEditClient = useMutation({
        mutationFn: ({ data, id }: { data: clientRequest, id: string }) =>
            editClient(id, data),
        onSuccess: (res) => {
            toast.success(res.message)
            queryClient.invalidateQueries({ queryKey: ["users"] })
        },
    })

    const useDeleteClient = useMutation({
        mutationFn: ({ id }: { id?: string }) =>
            deleteClient(id),
        onSuccess: (res) => {
            toast.success(res.message)
            queryClient.invalidateQueries({ queryKey: ["users"] })
        },
    })

    return {
        useGetAllClient,
        useClientDetail,
        useEditClient,
        useDeleteClient
    }
}