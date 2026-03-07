import { Button } from "@/components/common"
import { DataTable, SearchFilterBar } from "@/components/Table"
import { useHeader } from "@/hooks/useHeaderContext"
import { useEffect } from "react"
import { useHelpDocumentStore } from "../store/useHelpDocumentStore"
import useHelpDocument from "../hooks/useHelpDocument"
import { HelpDocumentColumns } from "../components/table/HelpDocumentColumns"
import HelpDocumentDelete from "../components/modal/HelpDocumnetDelete"
import HelpDocumentModal from "../components/modal/HelpDocumentModal"

export default function HelpDocumnetPage(){
    const { useGetAllHelpDocument } = useHelpDocument()
    const { typeMode, setTypeMode, setOpen, open } = useHelpDocumentStore()
    const { setHeaderContent } = useHeader()
    const {
        data,
        isLoading,
        metadata,
        limit,
        page,
        search,
        setLimit,
        setPage,
        setSort,
        sort,
        setSearch } = useGetAllHelpDocument()

    useEffect(() => {
        setHeaderContent({
            title: 'Help Document',
            searchBar: (
                <SearchFilterBar
                    searchValue={search}
                    onSearchChange={setSearch}
                    searchPlaceholder="Search"
                    className="flex-1 mb-0"
                />
            ),
            actions: (
                <Button onClick={() => {
                    setTypeMode('create')
                    setOpen(true)
                }} variant="primary">
                    Create Document
                </Button>
            ),
        })

        return () => {
            setHeaderContent({})
        }
    }, [search])

    const renderModal = () => {
        if (!open) return null
        switch (typeMode) {
            case 'create':
                return <HelpDocumentModal />
            case 'edit':
                return <HelpDocumentModal />
            case "delete":
                return <HelpDocumentDelete />
            default:
                return null
        }
    }
    const sortTableColumns = ['title', 'createdAt']

    return (<>
        <DataTable
            data={data || []}
            columns={HelpDocumentColumns}
            isLoading={isLoading}
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