import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AdminProtectedRoute, PublicRoute, UserProtectedRoute } from "@repo/packages/providers";
import { lazy } from "react";
import { AdminLayout, UserLayout } from "@repo/packages/layouts";
import ScrollToTop from "@repo/packages/ultis/common/scroll-to-top";

const Home = lazy(() => import("@repo/features/share-directory/user/pages/home/Home"));
const Login = lazy(() => import("@repo/features/auth/pages/login/Login"));
const Register = lazy(() => import("@repo/features/auth/pages/register/Register"));
const ForgotPassword = lazy(() => import("@repo/features/auth/pages/forgot-password/ForgotPassword"));
const ChangePassword = lazy(() => import("@repo/features/auth/pages/change-password/ChangePassword"));
const ProductDetail = lazy(() => import("@repo/features/share-directory/user/pages/product-detail/ProductDetail"));
const Cart = lazy(() => import("@repo/features/share-directory/user/pages/cart/Cart"));
const Checkout = lazy(() => import("@repo/features/share-directory/user/pages/checkout/Checkout"));
const Category = lazy(() => import("@repo/features/share-directory/user/pages/category/Category"));
const AboutUs = lazy(() => import("@repo/features/share-directory/user/pages/about-us/AboutUs"));
const Mission = lazy(() => import("@repo/features/share-directory/user/pages/mission/Mission"));
const PurchasePolicy = lazy(() => import("@repo/features/share-directory/user/pages/purchase-policy/PurchasePolicy"));
const ReturnPolicy = lazy(() => import("@repo/features/share-directory/user/pages/return-policy/ReturnPolicy"));
const PrivacyPolicy = lazy(() => import("@repo/features/share-directory/user/pages/privacy-policy/PrivacyPolicy"));
const Faq = lazy(() => import("@repo/features/share-directory/user/pages/faq/Faq"));

const BannerMgt = lazy(() => import("@repo/features/share-directory/admin/pages/banner/BannerMgt"));
const SocialMgt = lazy(() => import("@repo/features/share-directory/admin/pages/social/SocialMgt"));
const ProductMgt = lazy(() => import("@repo/features/share-directory/admin/pages/product/ProductMgt"));
const ProductDetailMgt = lazy(() => import("@repo/features/share-directory/admin/pages/product-detail/ProductDetailMgt"));

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path="*" element={<Navigate to="/portal/home" />} />
                <Route element={<PublicRoute />}>
                    <Route path="/account/*" element={<UserLayout />}>
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route path="forgot-password" element={<ForgotPassword />} />
                    </Route>
                </Route>
                <Route element={<AdminProtectedRoute />}>
                    <Route path="/admin/*" element={<AdminLayout />}>
                        <Route path="banner" element={<BannerMgt />} />
                        <Route path="social" element={<SocialMgt />} />
                        <Route path="product" element={<ProductMgt />} />
                        <Route path="product/:id" element={<ProductDetailMgt />} />
                    </Route>
                </Route>
                <Route element={<UserProtectedRoute />}>
                    <Route path="/account/*" element={<UserLayout />}>
                        <Route path="change-password" element={<ChangePassword />} />
                    </Route>
                    <Route path="/portal/*" element={<UserLayout />}>
                        <Route path="checkout" element={<Checkout />} />
                    </Route>
                </Route>
                <Route path="/portal/*" element={<UserLayout />}>
                    <Route path="home" element={<Home />} />
                    <Route path="product/:id" element={<ProductDetail />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="category" element={<Category />} />
                    <Route path="about-us" element={<AboutUs />} />
                    <Route path="mission" element={<Mission />} />
                    <Route path="purchase-policy" element={<PurchasePolicy />} />
                    <Route path="return-policy" element={<ReturnPolicy />} />
                    <Route path="privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="faq" element={<Faq />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}