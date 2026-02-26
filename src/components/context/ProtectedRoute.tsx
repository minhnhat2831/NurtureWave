import type { JSX } from "react";
import { Navigate } from "react-router";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
    const auth = localStorage.getItem("accessToken")
    const refToken = localStorage.getItem("refreshToken")
    if (!auth && !refToken) {
        return <Navigate to="/" replace />;
    }
    return (<>
        {children}
    </>)
}