import { BaseInput, Icons } from "@/components/common";
import { Controller, useFormContext } from "react-hook-form";

interface DocumentAttacmentProps {
    mode: "Create" | "Edit" | "View"
    isOpen: boolean
}

export default function DocumentAttacmentModal({
    mode,
    isOpen
}: DocumentAttacmentProps) {
    const { control, watch, setValue } = useFormContext()

    const files = watch("data.files") || []
    const handleAddFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files ?? [])
        const newFiles = [...files, ...selectedFiles]

        setValue("data.files", newFiles, { shouldDirty: true })
        e.target.value = ""
    }

    const handleRemoveFile = (index: number) => {
        const newFiles = files.filter((_file: File, i: number) => i !== index)
        setValue("data.files", newFiles, { shouldDirty: true })
    }

    const formatFileSize = (size: number) => {
        if (size < 1024) return `${size} B`
        if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
        return `${(size / 1024 / 1024).toFixed(1)} MB`
    }
    return (<>
        <div className="z-20 sticky h-auto bg-white border border-gray-200 mx-4 mb-4 px-4 overflow-y-auto">
            {isOpen && <>
                <div className="p-5 border-dashed border my-4">
                    {mode !== 'View' && <>
                        <div
                            className="flex justify-center"
                            onDragOver={(e) => { e.preventDefault(); e.stopPropagation() }}
                            onDrop={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                        >

                            <Controller
                                name="data.files"
                                control={control}
                                render={() => (
                                    <>
                                        <label className="flex flex-col justify-center items-center cursor-pointer overflow-hidden">
                                            <span className="inline-flex items-center px-4 py-2 border border-red-500 text-red-500 rounded-md">
                                                <Icons.upload style="mr-2" />
                                                Browse Files
                                            </span>
                                            <p className="text-center">Drag and drop your files here or <span className="browse-link">Browse Files</span></p>
                                            <p className="text-center">PDF, DOC, DOCX (Max 5MB)</p>
                                            <BaseInput
                                                type="file"
                                                multiple
                                                accept=".pdf,.doc,.docx"
                                                className="hidden"
                                                onChange={handleAddFiles}
                                            />
                                        </label>
                                    </>
                                )}
                            />
                        </div>
                    </>}

                    {files.length > 0 && (
                        <div className="mt-4 space-y-2">
                            {files.map((file: File, index: number) => (
                                <div
                                    key={index}
                                    className="flex items-center px-3 py-2 border rounded-md bg-gray-50"
                                >
                                    <Icons.upload style="mr-2 text-gray-500" />

                                    <div className="flex-1">
                                        <p className="text-sm font-medium truncate w-50 sm:w-100 md:w-full">{file.name}</p>
                                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => handleRemoveFile(index)}
                                        className=" text-gray-400 hover:text-red-500"
                                    >
                                        <Icons.closeButton />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </>
            }

        </div >
    </>)
}