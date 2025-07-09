import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores";

export const AdminProtectedRoute = () => {
    const { user } = useAuthStore();

    const isAuthenticated = !!user;
    const isAdmin = useAuthStore(state => state.isAdmin());

    return isAuthenticated && isAdmin ? (
        <Outlet />
    ) : (
        <Navigate to={`/account/login`} replace />
    )
}