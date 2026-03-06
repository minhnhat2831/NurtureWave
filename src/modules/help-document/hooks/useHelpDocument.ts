import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { helpDocumentListItem, helpDocumentRequest } from "../schema/HelpDocumentSchema.type"
import { createHelpDocument, deleteHelpDocument, editHelpDocument, getAllHelpDocument, getHelpDocumentDetail } from "../api/api"
import { toast } from "react-toastify"
import { useTableManager } from "@/hooks/useTableManager"

export default function useHelpDocument() {
    const queryClient = useQueryClient()

    const useGetAllHelpDocument = () => {
        const {
            data,
            limit,
            metadata,
            search,
            setLimit,
            setPage,
            setSearch,
            setSort,
            sort,
        } = useTableManager({
            queryKey: ['help-documents'],
            queryFn: async ({ page, limit, search, sort }) => {
                try {
                    return await getAllHelpDocument({
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
            metadata,
            search,
            setLimit,
            setPage,
            setSearch,
            setSort,
            sort,
        }
    }

    const useHelpDocumentDetail = (id?: string) => {
        const query = useQuery<helpDocumentListItem>({
            queryKey: ['help-documents', id],
            queryFn: async () => {
                try {
                    const result = await getHelpDocumentDetail(id)
                    return result.data
                } catch (err: any) {
                    toast.error(err.response?.data?.message)
                    throw err
                }
            },
            enabled: !!id
        })

        return {
            data: query.data,
            loading: query.isLoading
        }
    }

    const useCreateHelpDocument = useMutation({
        mutationFn: createHelpDocument,
        onSuccess: (err) => {
            toast.success(err.message)
            queryClient.invalidateQueries({ queryKey: ["help-documents"] })
        }
    })

    const useEditHelpDocument = useMutation({
        mutationFn: ({ data, id }: { data: helpDocumentRequest, id: string }) =>
            editHelpDocument(id, data),
        onSuccess: (err) => {
            toast.success(err.message)
            queryClient.invalidateQueries({ queryKey: ['help-documents'] })
        }
    })

    const useDeleteHelpDocument = useMutation({
        mutationFn: ({ id }: { id?: string }) =>
            deleteHelpDocument(id),
        onSuccess: (err) => {
            toast.success(err.message)
            queryClient.invalidateQueries({ queryKey: ['help-documents'] })
        }
    })
    return {
        useGetAllHelpDocument,
        useHelpDocumentDetail,
        useCreateHelpDocument,
        useEditHelpDocument,
        useDeleteHelpDocument
    }
}