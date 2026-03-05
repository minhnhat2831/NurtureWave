import { Button } from "@/components/common"
import { AdminColumns } from "../components/table/AdminColumns"
import useAdmin from "../hooks/useAdmin"
import { DataTable, SearchFilterBar } from "@/components/Table"
import { useEffect } from "react"
import { useHeader } from "@/hooks/useHeaderContext"
import AdminModal from "../components/modal/AdminModal"
import AdminDelete from "../components/modal/AdminDelete"
import { ToastContainer } from "react-toastify"
import { useAdminStore } from "../store/useAdminStore"

export default function AdminPage() {
    const { useGetAllAdmin } = useAdmin()
    const { typeMode, setTypeMode, setOpen, open } = useAdminStore()
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
        setSearch } = useGetAllAdmin()

    useEffect(() => {
        setHeaderContent({
            title: 'Admin',
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
                    Create Admin
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
                return <AdminModal />
            case 'edit':
                return <AdminModal />
            case "delete":
                return <AdminDelete />
            default:
                return null
        }
    }

    return (<>
        <ToastContainer />
        <DataTable
            data={data || []}
            columns={AdminColumns}
            isLoading={loading}
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