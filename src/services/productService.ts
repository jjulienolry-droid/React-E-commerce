import { Product, FilterOptions } from "../types/types"

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080"

export interface ProductResponse {
    id: number
    name: string
    description: string
    price: number
    discount?: number
    rating?: number
    stock?: number
    category?: {
        id: number
        name: string
    }
    Category?: {
        id: number
        name: string
    }
    Images?: Array<{
        id: number
        link: string
    }>
    createdAt?: string
}

const mapResponseToProduct = (p: ProductResponse): Product => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
    discount: p.discount || 0,
    image: (p.Images && p.Images[0] && p.Images[0].link) || "https://placehold.co/300x200?text=No+Image",
    rating: p.rating || 5,
    stock: p.stock || 0,
    category: (p.Category && p.Category.name) || (p.category?.name) || "",
    createdAt: p.createdAt,
})

export const productService = {
    async getProducts(filters?: FilterOptions): Promise<Product[]> {
        console.log(" [PRODUCT SERVICE] Fetching products...", { filters })

        const params = new URLSearchParams()
        if (filters?.category) params.append("category", filters.category)
        if (filters?.search) params.append("search", filters.search)

        const url = `${API_BASE}/api/products${params.toString() ? `?${params.toString()}` : ""}`

        const response = await fetch(url)
        
        if (!response.ok) {
            throw new Error("Impossible de charger les produits")
        }

        const data = await response.json()
        const list = Array.isArray(data) ? data : data.value || data
        const mapped: Product[] = list.map(mapResponseToProduct)

        let filtered = mapped
        if (filters?.priceMin !== undefined) {
            filtered = filtered.filter((p) => p.price >= filters.priceMin!)
        }
        if (filters?.priceMax !== undefined) {
            filtered = filtered.filter((p) => p.price <= filters.priceMax!)
        }
        if (filters?.rating !== undefined) {
            filtered = filtered.filter((p) => p.rating >= filters.rating!)
        }
        if (filters?.inStock) {
            filtered = filtered.filter((p) => p.stock > 0)
        }

        console.log(" [PRODUCT SERVICE] Products fetched successfully", { count: filtered.length })
        
        return filtered
    },

    async getProduct(productId: number): Promise<Product> {
        console.log(" [PRODUCT SERVICE] Fetching product...", { productId })

        const response = await fetch(`${API_BASE}/api/products/${productId}`)
        
        if (!response.ok) {
            throw new Error("Impossible de charger le produit")
        }

        const data: ProductResponse = await response.json()
        const product = mapResponseToProduct(data)
        
        console.log(" [PRODUCT SERVICE] Product fetched successfully", { id: product.id })
        
        return product
    },
}
