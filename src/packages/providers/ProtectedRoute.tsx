import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@repo/packages/stores";

export const ProtectedRoute = () => {
    const isAuthenticated = useAuthStore();
    const isAdmin = false;

    return isAuthenticated && isAdmin ? (
        <Outlet />
    ) : (
        <Navigate to={`/login`} replace />
    )
}