import React, { useState, useEffect, useMemo } from "react"
import { Box, Heading } from "@chakra-ui/react"
import { ProductList } from "./ProductList.tsx"
import { Product } from "../../types/types"
import { productService } from "../../services/productService"

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080"

const useFetchProducts = () =>
{
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() =>
    {
        let mounted = true
        setLoading(true)
        productService.getProducts()
            .then((data) =>
            {
                if (!mounted) return
                // Transform images to use API_BASE if needed
                const transformed = data.map(p => ({
                    ...p,
                    image: p.image && !p.image.startsWith("http")
                        ? `${API_BASE}${p.image.startsWith("/") ? "" : "/"}${p.image}`
                        : p.image
                }))
                setProducts(transformed)
                setLoading(false)
            })
            .catch((err) =>
            {
                if (!mounted) return
                setError(String(err))
                setLoading(false)
            })

        return () =>
        {
            mounted = false
        }
    }, [])

    return { products, loading, error }
}

interface ProductsHomePageProps {
    onAddToCart?: () => void
    onViewDetails?: (product: Product) => void
    categoryFilter?: string | null
}

export const ProductsHomePage: React.FC<ProductsHomePageProps> = ({ onAddToCart, onViewDetails, categoryFilter }) =>
{
    const [cart, setCart] = useState<Product[]>([])
    const { products, loading } = useFetchProducts()

    const featuredIds = [products[0]?.id, 24, products[2]?.id].filter(Boolean)

    const featuredProducts = useMemo(() =>
    {
        if (!products.length) return []
        const ordered: Product[] = []
        for (const id of featuredIds) {
            const found = products.find(p => p.id === id)
            if (found) ordered.push(found)
        }
        for (const p of products) {
            if (ordered.length >= 3) break
            if (!ordered.find(o => o.id === p.id)) ordered.push(p)
        }
        return ordered.slice(0, 3)
    }, [products])

    const filteredProducts = useMemo(() =>
    {
        if (!categoryFilter || categoryFilter.toLowerCase().trim() === "tous les produits") return products
        
        const normalizedFilter = categoryFilter.toLowerCase().trim()
        
        return products.filter(product =>
        {
            const productCategory = product.category.toLowerCase().trim()
            const productName = product.name.toLowerCase().trim()
            const productDescription = product.description?.toLowerCase().trim() || ""
            
            if (productCategory === normalizedFilter) return true
            
            if (normalizedFilter.includes("cube") && normalizedFilter.includes("antistress")) {
                const hasCube = productName.includes("cube") || productCategory.includes("cube")
                const hasAntistress = productName.includes("antistress") || productName.includes("stress") || productCategory.includes("antistress")
                return hasCube && hasAntistress
            }
            
            if (normalizedFilter.includes("fidget") && normalizedFilter.includes("spinner")) {
                const hasFidget = productName.includes("fidget") || productCategory.includes("fidget")
                const hasSpinner = productName.includes("spinner") || productCategory.includes("spinner")
                return hasFidget && hasSpinner
            }
            
            if (normalizedFilter.includes("boules") && normalizedFilter.includes("anti-stress")) {
                const hasBoule = productName.includes("boule") || productCategory.includes("boule")
                const hasAntistress = productName.includes("anti-stress") || productName.includes("stress") || productDescription.includes("anti-stress") || productCategory.includes("anti-stress")
                return hasBoule && hasAntistress
            }
            
            return productName.includes(normalizedFilter) || 
                   productDescription.includes(normalizedFilter) ||
                   productCategory.includes(normalizedFilter)
        })
    }, [products, categoryFilter])

    const handleAddToCart = (product: Product) =>
    {
        setCart([...cart, product])
        onAddToCart?.()
    }

    const handleViewDetails = (product: Product) =>
    {
        onViewDetails?.(product)
    }

    return (
        <Box bg="gray.50" p={4} borderRadius="md">
            <Heading as="h2" size="lg" mb={4}>
                {categoryFilter && categoryFilter.toLowerCase() !== "tous les produits" ? `Produits: ${categoryFilter}` : "Les produits populaires"}
            </Heading>
            <ProductList
                products={categoryFilter && categoryFilter.toLowerCase() !== "tous les produits" ? filteredProducts : featuredProducts}
                loading={loading}
                onAddToCart={handleAddToCart}
                onViewDetails={handleViewDetails}
                columns={3}
            />
        </Box>
    )
}
