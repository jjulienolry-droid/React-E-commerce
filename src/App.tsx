import { useState } from "react"
import { MainLayout } from "./components/layout/MainLayout"
import { useAuth } from "./context/AuthContext"
import { Home } from "./pages/Home"
import { Profile } from "./pages/Profile"
import { CartPage } from "./pages/CartPage"
import { AuthPage } from "./pages/AuthPage"
import { ProductDetailPage } from "./pages/ProductDetailPage"
import { Product } from "./types/types"

interface Category {
  id: number
  name: string
  count: number
  icon?: string
}

type PageType = "home" | "profile" | "cart" | "product" | "auth"

function App()
{
    const [currentPage, setCurrentPage] = useState<PageType>("home")
    const [cartCount, setCartCount] = useState(0)
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const { isAuthenticated } = useAuth()
    const isAuthPageVisible = currentPage === "auth" || !isAuthenticated

    // Catégories partagées
    const categories: Category[] = [
        { id: 1, name: "Cubes antistress", count: 24 },
        { id: 2, name: "Fidgets Spinners", count: 56 },
        { id: 3, name: "Boules anti-stress", count: 32 },
        { id: 0, name: "tous les produits", count: 112 },
    ]

    const navLinks = [
        { label: "Accueil", href: "/" },
        { label: "Produits", href: "/products" },
        { label: "Panier", href: "/cart" },
    ]

    const handleNavigateToProfile = () =>
    {
        if (!isAuthenticated) {
            setCurrentPage("auth")
        } else {
            setCurrentPage("profile")
        }
        window.scrollTo(0, 0)
    }

    const handleNavigateToCart = () =>
    {
        if (!isAuthenticated) {
            setCurrentPage("auth")
        } else {
            setCurrentPage("cart")
        }
        window.scrollTo(0, 0)
    }

    const handleNavigateHome = () =>
    {
        setCurrentPage("home")
        setSelectedCategory(null)
        window.scrollTo(0, 0)
    }

    const handleViewProduct = (product: Product) =>
    {
        setSelectedProduct(product)
        setCurrentPage("product")
        window.scrollTo(0, 0)
    }

    const handleCategoryClick = (categoryName: string) =>
    {
        setSelectedCategory(categoryName)
        setCurrentPage("home")
        window.scrollTo(0, 0)
    }

    const renderPage = () =>
    {
        if (!isAuthenticated && currentPage !== "auth") {
            return <AuthPage />
        }

        switch (currentPage)
        {
            case "auth":
                return <AuthPage />
            case "profile":
                return <Profile />
            case "cart":
                return <CartPage />
            case "product":
                return selectedProduct ? (
                    <ProductDetailPage
                        product={selectedProduct}
                        onAddToCart={(product, quantity) =>
                        {
                            setCartCount(cartCount + quantity)
                        }}
                        onBack={handleNavigateHome}
                    />
                ) : null
            case "home":
            default:
                return <Home onAddToCart={() => setCartCount(cartCount + 1)} onViewDetails={handleViewProduct} categoryFilter={selectedCategory} />
        }
    }

    return (
        <MainLayout
            navLinks={navLinks}
            categories={categories}
            onSearchChange={(query) => { /* search handled */ }}
            cartCount={cartCount}
            onCartClick={handleNavigateToCart}
            onProfileClick={handleNavigateToProfile}
            onHomeClick={handleNavigateHome}
            isAuthenticated={isAuthenticated}
            onCategoryClick={handleCategoryClick}
            minimalHeader={isAuthPageVisible}
        >
            {renderPage()}
        </MainLayout>
    )
}

export default App
