import type { JSX } from "react";
import { Navigate } from "react-router";

export default function PublicRoute({ children }: { children: JSX.Element }) {
    const getAccess = localStorage.getItem("accessToken")
    const getRef = localStorage.getItem("refreshToken")

    if (getAccess && getRef) {
        return <Navigate to="/admin" replace />
    }
    return (<>
        {children}
    </>)
}