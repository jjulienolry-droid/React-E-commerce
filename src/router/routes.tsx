import { createBrowserRouter } from "react-router-dom"
import { MainLayout } from "../components/layout/MainLayout"
import { ProtectedRoute } from "./ProtectedRoute"
import { Home } from "../pages/Home"
import { ProductDetailPage } from "../pages/ProductDetailPage"
import { AuthPage } from "../pages/AuthPage"
import { Profile } from "../pages/Profile"
import { CartPage } from "../pages/CartPage"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/products/:id",
        element: <ProductDetailPage product={undefined as any} />,
    },
    {
        path: "/auth",
        element: <AuthPage />,
    },
    {
        path: "/profile",
        element: (
            <ProtectedRoute>
                <Profile />
            </ProtectedRoute>
        ),
    },
    {
        path: "/cart",
        element: (
            <ProtectedRoute>
                <CartPage />
            </ProtectedRoute>
        ),
    },
])