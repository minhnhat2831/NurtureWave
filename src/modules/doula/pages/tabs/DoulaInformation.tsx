import { useParams } from "react-router";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import useDoula from "../../hooks/useDoula";

export default function DoulaInformation() {
    const { id } = useParams<{ id: string }>()
    const { useDoulaDetail } = useDoula()
    const { data: doula } = useDoulaDetail(id);
    return (<>
        <div className="px-5">
            <p className="mb-4">Pictures of service</p>
            <ImageList
                sx={{
                    flexWrap: "nowrap",
                    overflowX: "auto",
                    width: 400
                }}
                cols={doula?.photos?.length || 1}
                rowHeight={'auto'}
            >
                {(doula?.photos ?? []).map((pic, index) => (
                    <ImageListItem key={index} sx={{ width: 'auto' }} >
                        <img
                            src={pic?.media?.uri}
                            alt={`pic-${index}`}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
        <div className="px-5 h-30">
            <h5 className="font-bold mb-2 mt-5">Services</h5>
            <div className="flex flex-wrap" >
                {(doula?.categories ?? []).map((category, index) => (
                    <div className="rounded-full w-fit p-2 mb-4 mr-4 shadow-xl bg-gray-200 px-3" key={index}>{category?.name}</div>
                ))}
            </div>
        </div>
        <div className="px-5 mt-5">
            <h5 className="font-bold mb-2">Qualifications</h5>
            {(doula?.qualifications && doula?.qualifications.length > 0) ? (
                <div className="flex flex-wrap gap-3 mb-5">
                    {(doula?.qualifications ?? []).map((qualification, index) => (
                        <div
                            key={index}
                            className="border font-bold px-3 py-2 rounded shadow-xl text-violet-700 whitespace-nowrap"
                        >
                            {qualification}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="mb-5">No qualification</div>
            )}
        </div>
    </>)
}