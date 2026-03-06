import { useParams } from "react-router";
import { formatDateTime } from "@/utils/formatDateTime";
import { useTransaction } from "../../hooks/useTransaction";
import { useDoulaSubscription } from "../../hooks/useDoulaSupcription";
import { DataTable } from "@/components/Table";
import { TransactionColumns } from "../../components/table/TransactionColumn";
import { Icons } from "@/components/common";


export default function DoulaSubscription() {
    const { id } = useParams<{ id: string | undefined }>()
    const { data: subscription } = useDoulaSubscription(id)
    const {
        data,
        metadata,
        loading,
        page,
        limit,
        setPage,
        setLimit, } = useTransaction(id)

    return (<>
        <div className="flex overflow-auto justify-between">
            <div className="px-2 py-2 p-24">
                <p className="font-black text-nowrap">Subscription Information</p>
                {!subscription?.id ? <div className="mt-2">No Subscription</div> : <>
                    <div className="border rounded-xl w-100 p-4 mt-5 bg-gray-100 shadow-2xl">
                        <div className="flex justify-between">
                            <div className="flex items-center">
                                <Icons.subscription />
                                <p>{subscription?.subscription.name}</p>
                            </div>
                            <p className={`${subscription?.status === "cancelled" ? "text-xl font-bold text-red-500" : "text-xl font-bold text-green-500"}`}>{subscription?.status}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-bold">Amount</p>
                            <p>{subscription?.price.amount}$ - {subscription?.price.interval} </p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-bold">Started</p>
                            <p>{formatDateTime(subscription?.createdAt)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-bold">Ends</p>
                            <p>{formatDateTime(subscription?.endTime)}</p>
                        </div>
                    </div>
                </>}
            </div>
            <div className="ml-32">
                <div className="px-2 py-2">
                    <p className="ml-5 font-black">Billing History</p>
                    <DataTable
                        data={data || []}
                        columns={TransactionColumns}
                        isLoading={loading}
                        totalPages={metadata?.totalPages || 0}
                        pageIndex={page - 1}
                        pageSize={limit}
                        totalItems={metadata?.totalCount || 0}
                        onPageChange={(newPageIndex) => setPage(newPageIndex + 1)}
                        onPageSizeChange={setLimit}
                    />
                </div>
            </div>
        </div>
    </>)
}