import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute, PublicRoute } from "@repo/packages/providers";
import { lazy } from "react";
import { AdminLayout, AuthLayout, UserLayout } from "@repo/packages/layouts";
import ScrollToTop from "@repo/packages/ultis/common/scroll-to-top";

const Home = lazy(() => import("@repo/features/share-directory/user/pages/home/Home"));
const Login = lazy(() => import("@repo/features/auth/pages/login/Login"));
const Register = lazy(() => import("@repo/features/auth/pages/register/Register"));
const ForgotPassword = lazy(() => import("@repo/features/auth/pages/forgot-password/ForgotPassword"));
const ProductDetail = lazy(() => import("@repo/features/share-directory/user/pages/product-detail/ProductDetail"));
const Cart = lazy(() => import("@repo/features/share-directory/user/pages/cart/Cart"));
const Checkout = lazy(() => import("@repo/features/share-directory/user/pages/checkout/Checkout"));
const Category = lazy(() => import("@repo/features/share-directory/user/pages/category/Category"));

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path="*" element={<Navigate to="/portal/home" />} />
                <Route element={<PublicRoute />}>
                    <Route path="/account/*" element={<AuthLayout />}>
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route path="forgot-password" element={<ForgotPassword />} />
                    </Route>
                </Route>
                <Route element={<ProtectedRoute />}>
                    <Route path="/admin/*" element={<AdminLayout />}>
                        {/* <Route path="home" element={}/> */}
                    </Route>
                </Route>
                <Route path="/portal/*" element={<UserLayout />}>
                    <Route path="home" element={<Home />} />
                    <Route path="product/:id" element={<ProductDetail />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="checkout" element={<Checkout />} />
                    <Route path="category" element={<Category />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}