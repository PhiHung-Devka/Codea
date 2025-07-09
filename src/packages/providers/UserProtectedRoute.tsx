import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores";

export const UserProtectedRoute = () => {
    const { user } = useAuthStore();
    const isAuthenticated = !!user;

    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to={`/account/login`} replace />
    );
};