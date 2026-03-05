import Avatar from "@mui/material/Avatar";
import { useNavigate, useParams } from "react-router";
import { useCare } from "../hooks/useCare";
import useClient from "../hooks/useClient";
import { useClientStore } from "../store/useClientStore";
import { useHeader } from "@/hooks/useHeaderContext";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { DataTable, TableActions } from "@/components/Table";
import { CareColumns } from "../components/table/CareColumns";
import { formatDate } from "@/utils/formatDate";
import ClientEdit from "../components/modal/ClientEdit";

export default function ClientViewPage() {
    const nav = useNavigate()
    const { id } = useParams<{ id: string }>()
    const { useClientDetail } = useClient()
    const {
        data: cares,
        isLoading,
        metadata,
        page,
        limit,
        setPage,
        setLimit,
    } = useCare(id)
    const { data: client } = useClientDetail(id)
    const { setHeaderContent } = useHeader()
    const { open, setOpen, setTypeMode } = useClientStore()

    useEffect(() => {
        setHeaderContent({
            title: `Client Management / ${id}`,
        })

        return () => {
            setHeaderContent({})
        }
    }, [setHeaderContent, id])

    const handleEdit = () => {
        setTypeMode("edit")
        setOpen(true)
    }

    const openForm = () => {
        if (!open) return null
        return <ClientEdit />
    }

    return (<>
        <ToastContainer />
        <div className="flex justify-between px-2 py-4">
            <button className="cursor-pointer flex items-center" onClick={() => nav(-1)}><svg width="20px" height="20px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" >

                <path d="M0 0h48v48H0z" fill="none" />
                <g id="Shopicon">
                    <polygon points="40,22 14.828,22 28.828,8 26,5.172 7.172,24 26,42.828 28.828,40 14.828,26 40,26 	" />
                </g>
            </svg>Back</button>
            <TableActions onEdit={handleEdit} />
        </div>
        <div className="px-2 py-2 bg-white">
            {/* info */}
            {!client?.id ? <div className="mt-2">No Client</div> : <>
                <div className="flex gap-8 px-2 py-2 text-nowrap overflow-y-auto">
                    <Avatar src={client?.picture?.uri} />
                    <div>
                        <p className="font-bold ">Full Name</p>
                        <p className="text-sm font-normal">{client?.fullName ?? '-'}</p>
                    </div>
                    <div>
                        <p className="font-bold ">Status</p>
                        <div className="flex items-baseline">
                            <span
                                className={`h-2 w-2 flex mr-1 items-center rounded-full ${client?.status === "active" ? "bg-green-400" : "bg-gray-400"
                                    }`}
                            ></span>
                            <p className="text-sm font-normal">{client?.status === "active" ? "Active" : "Inactive"}</p>
                        </div>
                    </div>
                    <div>
                        <p className="font-bold ">Email</p>
                        <p className="text-sm font-normal">{client?.email ?? '-'}</p>
                    </div>
                    <div>
                        <p className="font-bold ">Phone</p>
                        <p className="text-sm font-normal">{client?.countryCode} {client?.phoneNumber ?? '-'}</p>
                    </div>
                    <div>
                        <p className="font-bold ">Birthday</p>
                        <p className="text-sm font-normal">{formatDate(client?.birthDate)}</p>
                    </div>
                    <div>
                        <p className="font-bold ">Address</p>
                        <p className="text-sm font-normal">{client?.address?.fullAddress ?? '-'}</p>
                    </div>
                </div>
            </>}
        </div>

        <DataTable
            data={cares}
            columns={CareColumns}
            isLoading={isLoading}
            totalPages={metadata?.totalPages || 0}
            pageIndex={page - 1}
            pageSize={limit}
            totalItems={metadata?.totalCount || 0}
            onPageChange={(newPageIndex) => setPage(newPageIndex + 1)}
            onPageSizeChange={setLimit}
        />
        {open && openForm()}
    </>)
}