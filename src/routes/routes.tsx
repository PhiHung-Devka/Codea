import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AdminLayout, AuthLayout, UserLayout } from "@repo/packages/layouts";
import { ProtectedRoute, PublicRoute } from "@repo/packages/providers";
import { lazy } from "react";

const Login = lazy(() => import("@repo/features/auth/pages/login/Login"));
const Home = lazy(() => import("@repo/features/share-directory/user/pages/Home"))

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Navigate to="/portal/home" />} />
                <Route element={<PublicRoute />}>
                    <Route element={<AuthLayout />}>
                        <Route path="/login" element={<Login />} />
                    </Route>
                </Route>
                <Route element={<ProtectedRoute />}>
                    <Route path="/admin/" element={<AdminLayout />}>
                        {/* <Route path="home" element={}/> */}
                    </Route>
                </Route>
                <Route path="/portal/" element={<UserLayout />}>
                    <Route path="home" element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}