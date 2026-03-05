import { useHeader } from "@/hooks/useHeaderContext"

import { useDoulaStore } from "../store/useDoulaStore"
import { useEffect } from "react"
import { DataTable, SearchFilterBar } from "@/components/Table"
import { ToastContainer } from "react-toastify"
import { DoulaColumns } from "../components/table/DoulaColumns"
import DoulaEdit from "../components/modal/DoulaEdit"
import DoulaDelete from "../components/modal/DoulaDelete"
import useDoula from "../hooks/useDoula"

export default function DoulaPage() {
    const { useGetAllDoula } = useDoula()
    const { typeMode, open } = useDoulaStore()
    const { setHeaderContent } = useHeader()
    const {
        data,
        loading,
        metadata,
        limit,
        page,
        search,
        setLimit,
        setPage,
        setSort,
        sort,
        setSearch } = useGetAllDoula()

    useEffect(() => {
        setHeaderContent({
            title: 'Doula Management',
            searchBar: (
                <SearchFilterBar
                    searchValue={search}
                    onSearchChange={setSearch}
                    searchPlaceholder="Search"
                    className="flex-1 mb-0"
                />
            ),
        })

        return () => {
            setHeaderContent({})
        }
    }, [search])

    const renderModal = () => {
        if (!open) return null
        switch (typeMode) {
            case "edit":
                return <DoulaEdit />
            case "delete":
                return <DoulaDelete />
            default:
                return null
        }
    }

    const sortTableColumns = ['user.fullName', 'user.lastName', 'user.email', 'status', 'createdAt']

    return (<>
        <ToastContainer />
        <DataTable
            data={data || []}
            columns={DoulaColumns}
            isLoading={loading}
            totalPages={metadata?.totalPages || 0}
            pageIndex={page - 1}
            pageSize={limit}
            totalItems={metadata?.totalCount || 0}
            onPageChange={(newPageIndex) => setPage(newPageIndex + 1)}
            onPageSizeChange={setLimit}
            currentSort={sort}
            onSortChange={setSort}
            sortableColumns={sortTableColumns}
        />
        {open && renderModal()}
    </>)
}