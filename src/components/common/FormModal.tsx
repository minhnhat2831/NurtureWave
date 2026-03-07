import { Icons } from "./Icons"

export default function ModalWrapper({
        title,
        children,
        onClose,
        isLoading
    }: {
        title: string
        children: React.ReactNode
        onClose : () => void,
        isLoading : boolean
    }) {
        return (
        <div className="fixed inset-0 z-50 flex items-center justify-end">
            <div className="absolute inset-0 bg-black/50" onClick={isLoading ? undefined : onClose}/>
            <div className="relative bg-white shadow-xl w-full max-w-xl h-full overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                    >
                        <Icons.closeButton />
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}