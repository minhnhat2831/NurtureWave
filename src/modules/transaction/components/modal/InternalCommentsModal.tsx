import { FormTextArea } from "@/components/common";
import { useContextModalStore } from "../../store/useContextModalStore";

interface InternalCommentsProps {
    showCreate?: boolean;
    showEdit?: boolean;
    showView?: boolean
}

export default function InternalCommentModal({
    showCreate,
    showEdit,
    showView
}: InternalCommentsProps) {
    const { open } = useContextModalStore()
    return (<>
        <div className="z-20 sticky h-auto bg-white border border-gray-200 mx-4 mb-4 px-4 overflow-y-auto">
            {showCreate && open && <>
                <div className="mt-4">
                    <FormTextArea
                        label="Comment"
                        name="data.comments"
                        placeholder="Comment here..."
                    >
                    </FormTextArea>
                    <p>Please note the text will be automatically saved the request is <strong>approved</strong> or <strong>rejected</strong></p>
                </div>
            </>}

            {showEdit && <>
                <div>

                </div>
            </>}

            {showView && <>
                <div>

                </div>
            </>}

        </div>
    </>)
}