import { useParams } from "react-router";
import { DataTable } from "@/components/Table";
import { DoulaReviewColumns } from "../../components/table/DoulaReviewColumns";
import { useDoulaReview } from "../../hooks/useDoulaReview";
import { Icons } from "@/components/common";

export default function DoulaReviews() {
    const { id } = useParams<{ id: string | undefined }>()
    const { data,
        loading,
        metadata,
        limit,
        page,
        setLimit,
        setPage, } = useDoulaReview(id)

    return (<>
        <div className="flex justify-between px-4 leading-8">
            <div>
                <p className="font-bold">Average Rating</p>
                <p className="font-bold text-3xl flex items-center">N/A
                    <Icons.star />
                </p>
                <p className="text-gray-400 text-nowrap">No Reviews Yet</p>
            </div>
            <div className="ml-50">
                <p className="font-bold ml-5">Review History</p>
                <DataTable
                    data={data || []}
                    columns={DoulaReviewColumns}
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
    </>)
}