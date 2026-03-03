import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { Product, FilterOptions } from "../types/types"

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080"

interface ProductContextType {
    products: Product[]
    loading: boolean
    error: string | null
    filters: FilterOptions
    selectedProduct: Product | null
    setFilters: (filters: FilterOptions) => void
    setSelectedProduct: (product: Product | null) => void
    refreshProducts: () => void
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) =>
{
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [filters, setFilters] = useState<FilterOptions>({})
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

    const fetchProducts = useCallback(() =>
    {
        setLoading(true)
        setError(null)

        const params = new URLSearchParams()
        if (filters.category) params.append("category", filters.category)
        if (filters.search) params.append("search", filters.search)

        const url = `${API_BASE}/api/products${params.toString() ? `?${params.toString()}` : ""}`

        fetch(url)
            .then((r) => r.json())
            .then((data) =>
            {
                const list = Array.isArray(data) ? data : data.value || data
                const mapped: Product[] = list.map((p: any) => ({
                    id: p.id,
                    name: p.name,
                    description: p.description,
                    price: p.price,
                    discount: p.discount || 0,
                    image: (p.Images && p.Images[0] && p.Images[0].link) || "https://placehold.co/300x200?text=No+Image",
                    rating: p.rating || 5,
                    stock: p.stock || 0,
                    category: (p.Category && p.Category.name) || "",
                    createdAt: p.createdAt,
                }))

                // Filtrage côté client pour prix et note
                let filtered = mapped
                if (filters.priceMin !== undefined)
                {
                    filtered = filtered.filter((p) => p.price >= (filters.priceMin as number))
                }
                if (filters.priceMax !== undefined)
                {
                    filtered = filtered.filter((p) => p.price <= (filters.priceMax as number))
                }
                if (filters.rating !== undefined)
                {
                    filtered = filtered.filter((p) => p.rating >= (filters.rating as number))
                }
                if (filters.inStock)
                {
                    filtered = filtered.filter((p) => p.stock > 0)
                }

                setProducts(filtered)
                setLoading(false)
            })
            .catch((err) =>
            {
                setError(String(err))
                setLoading(false)
            })
    }, [filters])

    useEffect(() =>
    {
        fetchProducts()
    }, [fetchProducts])

    return (
        <ProductContext.Provider
            value={{
                products,
                loading,
                error,
                filters,
                selectedProduct,
                setFilters,
                setSelectedProduct,
                refreshProducts: fetchProducts,
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}

export const useProducts = (): ProductContextType =>
{
    const context = useContext(ProductContext)
    if (!context)
    {
        throw new Error("useProducts doit être utilisé dans un ProductProvider")
    }
    return context
}
