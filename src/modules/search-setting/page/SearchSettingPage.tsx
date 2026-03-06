import { Button } from "@/components/common"
import { DataTable, SearchFilterBar } from "@/components/Table"
import { useHeader } from "@/hooks/useHeaderContext"
import { useEffect } from "react"
import useSearchSetting from "../hooks/useSearchSetting"
import { useSearchSettingStore } from "../store/useSearchSettingStore"
import { SearchSettingColumns } from "../components/table/SearchSettingColumns"
import SearchSettingModal from "../components/modal/SearchSettingModal"
import SearchSettingDelete from "../components/modal/SearchSettingDelete"


export default function SearchSettingPage(){
    const { useGetAllSearchSetting } = useSearchSetting()
    const { typeMode, setTypeMode, setOpen, open } = useSearchSettingStore()
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
        setSearch } = useGetAllSearchSetting()

    useEffect(() => {
        setHeaderContent({
            title: 'Search Setting',
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
                    Create
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
                return <SearchSettingModal />
            case 'edit':
                return <SearchSettingModal />
            case "delete":
                return <SearchSettingDelete />
            default:
                return null
        }
    }

    return (<>
        <DataTable
            data={data || []}
            columns={SearchSettingColumns}
            isLoading={isLoading}
            totalPages={metadata?.totalPages || 0}
            pageIndex={page - 1}
            pageSize={limit}
            totalItems={metadata?.totalCount || 0}
            onPageChange={(newPageIndex) => setPage(newPageIndex + 1)}
            onPageSizeChange={setLimit}
        />
        {open && renderModal()}
    </>)
}