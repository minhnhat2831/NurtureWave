import { DataTable, SearchFilterBar } from "@/components/Table";
import useClient from "../hooks/useClient";
import { ClientColumns } from "../components/table/ClientColumns";
import { useEffect } from "react";
import { useHeader } from "@/hooks/useHeaderContext";
import { useClientStore } from "../store/useClientStore";
import ClientEdit from "../components/modal/ClientEdit";
import ClientDelete from "../components/modal/ClientDelete";

export default function ClientPage() {
    const { useGetAllClient } = useClient()
    const { typeMode, open } = useClientStore()
    const { setHeaderContent } = useHeader()
    const {
        data,
        limit,
        loading,
        metadata,
        page,
        search,
        sort,
        setSort,
        setLimit,
        setPage,
        setSearch,
    } = useGetAllClient()

    useEffect(() => {
        setHeaderContent({
            title: 'Client Management',
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
                return <ClientEdit />
            case "delete":
                return <ClientDelete />
            default:
                return null
        }
    }
    const sortTableColumns = ['firstName', 'email', 'createdAt', 'startDate', 'endDate']

    return (<>
        <DataTable
            data={data}
            columns={ClientColumns}
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