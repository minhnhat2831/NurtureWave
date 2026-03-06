import { useParams } from "react-router"
import useDoulaPackage from "../../hooks/useDoulaPackage"
import { DataTable } from "@/components/Table"
import { DoulaPackageColumns } from "../../components/table/DoulaPackageColumn"

export default function DoulaPackages() {
    const { id } = useParams<{ id: string | undefined }>()
    const { useGetAllDoulaPackage } = useDoulaPackage()

    const {
        data,
        loading,
        metadata,
        limit,
        page,
        setLimit,
        setPage,
    } = useGetAllDoulaPackage(id)

    return (<>
        <DataTable
            data={data || []}
            columns={DoulaPackageColumns}
            isLoading={loading}
            totalPages={metadata?.totalPages || 0}
            pageIndex={page - 1}
            pageSize={limit}
            totalItems={metadata?.totalCount || 0}
            onPageChange={(newPageIndex) => setPage(newPageIndex + 1)}
            onPageSizeChange={setLimit}
        />
    </>)
}