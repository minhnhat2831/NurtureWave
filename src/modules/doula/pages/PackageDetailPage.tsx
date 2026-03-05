import { useNavigate, useParams } from "react-router";
import useDoulaPackage from "../hooks/useDoulaPackage";
import { useEffect } from "react";
import { useHeader } from "@/hooks/useHeaderContext";
import { formatDateTime } from "@/utils/formatDateTime";
import { DataTable } from "@/components/Table";
import { DoulaPackageDetailColumns } from "../components/table/DoulaPackageDetailColumn";
import { ToastContainer } from "react-toastify";

export default function PackagePage() {
    const { id } = useParams<{ id: string | undefined }>()
    const nav = useNavigate()
    const { useDoulaPakageDetail } = useDoulaPackage()
    const { setHeaderContent } = useHeader()
    const { data: packageData, loading } = useDoulaPakageDetail(id)

    useEffect(() => {
        setHeaderContent({
            title: `Package / ${id}`,
        })

        return () => {
            setHeaderContent({})
        }
    }, [setHeaderContent, id])

    return (<>
        <ToastContainer />
        <div className="w-full h-screen py-2 px-5 bg-gray-100">
            <div className="flex justify-between px-2 py-4">
                <button className="cursor-pointer flex items-center" onClick={() => nav(-1)}><svg width="20px" height="20px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" >

                    <path d="M0 0h48v48H0z" fill="none" />
                    <g id="Shopicon">
                        <polygon points="40,22 14.828,22 28.828,8 26,5.172 7.172,24 26,42.828 28.828,40 14.828,26 40,26 	" />
                    </g>
                </svg>
                    Back</button>
            </div>
            <div className="px-2 py-2 bg-white">
                {/* info */}
                <div className="overflow-auto bg-gray-100 px-5 py-5">
                    <p className="font-bold ml-5">Package Information</p>
                    <div className="flex flex-wrap gap-10 py-2 px-5 text-nowrap">
                        <div>
                            <p className="font-bold">Cover Photo</p>
                            <img src={packageData?.picture?.uri} alt={`pic` + packageData?.picture?.id} width={50} height={50}></img>
                        </div>
                        <div>
                            <p className="font-bold">Package Name</p>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: packageData?.name || "-"
                                }}
                            />
                        </div>
                        <div>
                            <p className="font-bold">Short Description</p>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: packageData?.shortDescription || "-"
                                }}
                            />
                        </div>
                        <div>
                            <p className="font-bold">Price</p>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: packageData?.price || "-"
                                }}
                            />
                        </div>
                        <div>
                            <p className="font-bold">Created date</p>
                            <span>{formatDateTime(packageData?.createdAt)}</span>
                        </div>
                    </div>
                    <div className="px-5">
                        <p className="font-bold">What's Included</p>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: packageData?.description || "-"
                            }}
                        />
                    </div>
                </div>
            </div>
            <DataTable
                data={packageData?.cares ?? []}
                columns={DoulaPackageDetailColumns}
                isLoading={loading}
                totalPages={0}
                pageIndex={1}
                pageSize={10}
                totalItems={0}
                onPageChange={() => {}}
                onPageSizeChange={() => {}}
            />
        </div>
    </>)
}