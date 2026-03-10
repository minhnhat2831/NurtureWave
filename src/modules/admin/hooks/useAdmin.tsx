import { useQuery, useQueryClient } from "@tanstack/react-query"
import type { adminListItem, editAdminUser } from "../schema/AdminSchema.type"
import { getAdminDetail, getAllAdmin, createAdmin, deleteAdmin, editAdmin } from "../api/Api"
import { toast } from "react-toastify"
import { useMutation } from "@tanstack/react-query"
import { useTableManager } from "@/hooks/useTableManager"
import { useAdminStore } from "../store/useAdminStore"

export default function useAdmin(methods?: any) {
    const queryClient = useQueryClient()
    const { setOpen } = useAdminStore()
    const useGetAllAdmin = () => {
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
            queryKey: ["admins"],
            queryFn: async ({ page, limit, search, sort }) => {
                try {
                    return await getAllAdmin({
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
            sort
        }
    }

    const useAdminDetail = (id?: string) => {
        const query = useQuery<adminListItem>({
            queryKey: [`admins`, id],
            queryFn: async () => {
                try {
                    const result = await getAdminDetail(id)
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

    const useCreateAdmin = useMutation({
        mutationFn: createAdmin,
        onSuccess: (res) => {
            toast.success(res.message)
            queryClient.invalidateQueries({ queryKey: ["admins"] })
            methods.reset()
            setOpen(false)
        },
        onError: (error: any) => {
            const message = error.response?.data?.message
            if (message?.toLowerCase().includes("username")) {
                methods?.setError("username", {
                    type: "server",
                    message,
                })
                return
            }
            if (message?.toLowerCase().includes("email")) {
                methods?.setError("email", {
                    type: "server",
                    message,
                })
                return
            }
            toast.error(message)
        },
    })

    const useEditAdmin = useMutation({
        mutationFn: ({ data, id }: { data: editAdminUser, id: string }) =>
            editAdmin(data, id),
        onSuccess: (res) => {
            toast.success(res.message)
            queryClient.invalidateQueries({ queryKey: ["admins"] })
            methods.reset()
            setOpen(false)
        },
    })

    const useDeleteAdmin = useMutation({
        mutationFn: ({ id }: { id?: string }) =>
            deleteAdmin(id),
        onSuccess: (res) => {
            toast.success(res.message)
            queryClient.invalidateQueries({ queryKey: ["admins"] })
        },
    })

    return {
        useGetAllAdmin,
        useAdminDetail,
        useCreateAdmin,
        useEditAdmin,
        useDeleteAdmin
    }
}