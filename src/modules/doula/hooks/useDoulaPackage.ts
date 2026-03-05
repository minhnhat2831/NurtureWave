import type { doulaPackageDetail } from "../schema/types/DoulaPackageSchema.type"
import { useQuery } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { getAllDoulaPackage, getDoulaPackageDetail } from "../api/api"
import { useTableManager } from "@/hooks/useTableManager"

export default function useDoulaPackage() {
    const useGetAllDoulaPackage = (f_doulaId: string | undefined) => {
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
            queryKey: ["doula-packages", f_doulaId as string],
            queryFn: async ({ page, limit, search, sort }) => {
                try {
                    return await getAllDoulaPackage({
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

    const useDoulaPakageDetail = (id?: string) => {
        const query = useQuery<doulaPackageDetail>({
            queryKey: [`doula-packages`, id],
            queryFn: async () => {
                try {
                    const result = await getDoulaPackageDetail(id)
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

    return {
        useGetAllDoulaPackage,
        useDoulaPakageDetail
    }

}