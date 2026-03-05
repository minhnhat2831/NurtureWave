import { useQuery } from "@tanstack/react-query"
import { toast } from "react-toastify"
import type { doulaSubcriptionList } from "../schema/types/DoulaSubcriptionSchema.type"
import { getDoulaSubscriptionDetail } from "../api/api"

export const useDoulaSubscription = (id?: string) => {
    const query = useQuery<doulaSubcriptionList>({
        queryKey: ['doula-subscriptions', id],
        queryFn: async () => {
            try {
                const result = await getDoulaSubscriptionDetail(id)
                return result
            } catch (err: any) {
                toast.error(`${err.response?.data?.message}`)
                throw err
            }
        },
        enabled: !!id,
    })

    return {
        data: query.data?.data,
        loading: query.isLoading,
    }
}