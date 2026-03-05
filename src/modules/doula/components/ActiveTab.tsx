import { useState } from "react"

export default function ActiveTab({ children, active }: { children: string, active?: boolean  }) {
    const [open, setOpen] = useState(false)

    return (<>
        <div
            className="group relative h-fit w-fit cursor-pointer"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <div className="relative text-black"
                style={{
                    color: (open || active) ? "violet" : "black",
                }}>
                {children}
                <span
                    style={{
                        transform: (open || active) ? "scaleX(1)" : "scaleX(0)",
                    }}
                    className="absolute -bottom-5 -left-2 -right-2 h-1 origin rounded-full bg-violet-500 transition-transform duration-300 ease-out"
                ></span>
            </div>

        </div>
    </>)
}