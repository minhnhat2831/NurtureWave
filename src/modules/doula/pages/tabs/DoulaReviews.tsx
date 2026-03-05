import { useParams } from "react-router";
import { DataTable } from "@/components/Table";
import { DoulaReviewColumns } from "../../components/table/DoulaReviewColumns";
import { useDoulaReview } from "../../hooks/useDoulaReview";

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
                    <svg width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(0 -1028.4)">
                        <path d="m12 1028.4 4 9 8 1-6 5 2 9-8-5-8 5 2-9-6-5 8-1z" fill="#f39c12" />
                        <path d="m12 1028.4-4 9-6.9688 0.8 4.9688 4.2-0.1875 0.8 0.1875 0.2-1.75 7.8 7.75-4.8 7.75 4.8-1.75-7.8 0.188-0.2-0.188-0.8 4.969-4.2-6.969-0.8-4-9z" fill="#f1c40f" />
                    </g>
                </svg></p>
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