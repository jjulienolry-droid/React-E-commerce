import { useState } from "react"
import { MainLayout } from "./components/layout/MainLayout"
import { Home } from "./pages/Home"
import { Profile } from "./pages/Profile"
import { CartPage } from "./pages/CartPage"
import { ProductDetail } from "./components/products/ProductDetail"
import { Product } from "./types/types"

interface Category {
  id: number
  name: string
  count: number
  icon?: string
}

type PageType = "home" | "profile" | "cart" | "product"

function App()
{
    const [currentPage, setCurrentPage] = useState<PageType>("home")
    const [cartCount, setCartCount] = useState(0)
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

    // Catégories partagées
    const categories: Category[] = [
        { id: 1, name: "Cubes antistress", count: 24 },
        { id: 2, name: "FIdgets Spinners", count: 56 },
        { id: 3, name: "Boules de décompression", count: 32 },
    ]

    const navLinks = [
        { label: "Accueil", href: "/" },
        { label: "Produits", href: "/products" },
        { label: "Panier", href: "/cart" },
    ]

    const handleNavigateToProfile = () =>
    {
        setCurrentPage("profile")
        window.scrollTo(0, 0)
    }

    const handleNavigateToCart = () =>
    {
        setCurrentPage("cart")
        window.scrollTo(0, 0)
    }

    const handleNavigateHome = () =>
    {
        setCurrentPage("home")
        window.scrollTo(0, 0)
    }

    const handleViewProduct = (product: Product) =>
    {
        setSelectedProduct(product)
        setCurrentPage("product")
        window.scrollTo(0, 0)
    }

    const renderPage = () =>
    {
        switch (currentPage)
        {
            case "profile":
                return <Profile />
            case "cart":
                return <CartPage />
            case "product":
                return selectedProduct ? (
                    <ProductDetail
                        product={selectedProduct}
                        onAddToCart={(product, quantity) =>
                        {
                            setCartCount(cartCount + quantity)
                        }}
                    />
                ) : null
            case "home":
            default:
                return <Home onAddToCart={() => setCartCount(cartCount + 1)} onViewDetails={handleViewProduct} />
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
            isAuthenticated={false}
        >
            {renderPage()}
        </MainLayout>
    )
}

export default App
