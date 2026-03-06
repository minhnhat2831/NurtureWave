import { useHeader } from "@/hooks/useHeaderContext";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useDoula from "../hooks/useDoula";
import { useDoulaStore } from "../store/useDoulaStore";
import { Icons, TableActions } from "@/components/common";
import Avatar from "@mui/material/Avatar";
import DoulaInformation from "./tabs/DoulaInformation";
import DoulaSubscription from "./tabs/DoulaSubscription";
import DoulaPackages from "./tabs/DoulaPackages";
import DoulaReviews from "./tabs/DoulaReviews";
import { formatDate } from "@/utils/formatDate";
import ActiveTab from "../components/ActiveTab";
import DoulaEdit from "../components/modal/DoulaEdit";

const TABS = [
    { name: "Information", key: "information" },
    { name: "Subscription", key: "subscription" },
    { name: "Packages", key: "packages" },
    { name: "Reviews", key: "reviews" },
];

export default function DoulaViewPage() {
    const { id } = useParams<{ id: string }>()
    const nav = useNavigate()
    const { setHeaderContent } = useHeader()
    const [activeTab, setActiveTab] = useState("information");
    const { useDoulaDetail } = useDoula()
    const { data: doula } = useDoulaDetail(id);
    const { setOpen,open, setTypeMode } = useDoulaStore()

    const handleEdit = () => {
        setTypeMode("edit")
        setOpen(true)
    }

    const openForm = () => {
        if (!open) return null
        return <DoulaEdit />
    }

    useEffect(() => {
        setHeaderContent({
            title: `Doula Management / ${id}`,
        })

        return () => {
            setHeaderContent({})
        }
    }, [setHeaderContent, id])

    return (<>
        <div className="flex justify-between px-2 py-4">
            <button className="cursor-pointer flex items-center" onClick={() => nav(-1)}>
                <Icons.arrowLeft />
                Back
            </button>
            <TableActions onEdit={handleEdit} />
        </div>
        <div className="py-2 bg-white">
            {/* info */}
            <div className="overflow-auto text-wrap bg-gray-50 px-5 py-5">
                <div className="flex flex-wrap gap-10 py-2 px-5 text-nowrap ">
                    <Avatar src={doula?.picture?.uri} alt="avatar" className="rounded-full w-15 h-10"></Avatar>
                    <div>
                        <p className="font-bold">Full Name</p>
                        <p className="text-sm font-normal">{doula?.user?.fullName}</p>
                    </div>
                    <div>
                        <p className="font-bold ">Status</p>
                        <div className="flex items-baseline">
                            <span
                                className={`h-2 w-2 flex mr-1 items-center rounded-full ${doula?.status === "active" ? "bg-green-400" : "bg-gray-400"
                                    }`}
                            ></span>
                            <p className="text-sm font-normal">{doula?.status === "active" ? "Active" : "Inactive"}</p>
                        </div>
                    </div>
                    <div>
                        <p className="font-bold">Email</p>
                        <p className="text-sm font-normal">{doula?.user.email ?? "-"}</p>
                    </div>
                    <div>
                        <p className="font-bold">Phone</p>
                        <p className="text-sm font-normal">{doula?.user.phoneNumber ?? "-"}</p>
                    </div>

                    <div>
                        <p className="font-bold">Birthday</p>
                        <p className="text-sm font-normal">{formatDate(doula?.user.birthDate)}</p>
                    </div>
                    <div>
                        <p className="font-bold">Address</p>
                        <p className="text-sm font-normal">{doula?.address.fullAddress ?? "-"}</p>
                    </div>

                    <div>
                        <p className="font-bold">Business name</p>
                        <p className="text-sm font-normal">{doula?.businessName ?? "-"}</p>
                    </div>
                </div>

                <div className="px-5 mt-5">
                    <p className="font-bold">About Doulas</p>
                    <p className="text-sm font-normal">{doula?.description ?? "-"}</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex justify-between lg:justify-start lg:gap-16 items-center py-4 px-2 border-b">
                {TABS.map((tab) => (
                    <button key={tab.key} onClick={() => setActiveTab(tab.key)}>
                        <ActiveTab active={activeTab === tab.key}>
                            {tab.name}
                        </ActiveTab>
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="mt-6">
                {activeTab === "information" && <DoulaInformation />}
                {activeTab === "subscription" && <DoulaSubscription />}
                {activeTab === "packages" && <DoulaPackages />}
                {activeTab === "reviews" && <DoulaReviews />}
            </div>

        </div>
        {open && openForm()}
    </>)
}