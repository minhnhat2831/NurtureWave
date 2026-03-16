import { FormTextArea } from "@/components/common";

interface InternalCommentsProps {
    mode: "Create" | "Edit" | "View"
    isOpen: boolean
}

export default function InternalCommentModal({
    mode,
    isOpen
}: InternalCommentsProps) {
    return (<>
        <div className="z-20 sticky h-auto bg-white border border-gray-200 mx-4 mb-4 px-4 overflow-y-auto">
            {isOpen && <>
                <div className="mt-4">
                    <FormTextArea
                        label="Comment"
                        name="data.comments"
                        placeholder="Comment here..."
                        disabled={mode === "View"}
                    >
                    </FormTextArea>
                    <p>Please note the text will be automatically saved the request is <strong>approved</strong> or <strong>rejected</strong></p>
                </div>
            </>}
        </div>
    </>)
}