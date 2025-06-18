import { useAuthStore } from "@repo/packages/stores";
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = () => {
    const isAuthenticated = useAuthStore();

    return isAuthenticated ? (
        <Navigate to={`/portal/home`} replace />
    ) : (
        <Outlet />
    )
}