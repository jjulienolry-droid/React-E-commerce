import React from "react"
import { SimpleGrid, Text, Box } from "@chakra-ui/react"
import { ProductCard } from "./ProductCard"
import { Loader } from "../common/Loader"
import { Product } from "../../types/types"

interface ProductListProps {
  products: Product[]
  loading?: boolean
  onAddToCart?: (product: Product) => void
  onViewDetails?: (product: Product) => void
  columns?: number
}

export const ProductList: React.FC<ProductListProps> = ({
    products,
    loading = false,
    onAddToCart,
    onViewDetails,
    columns = 3,
}) =>
{
    if (loading) {
        return <Loader />
    }

    if (!products.length) {
        return (
            <Box textAlign="center" py={10}>
                <Text color="gray.500">Aucun produit trouvé</Text>
            </Box>
        )
    }

    return (
        <SimpleGrid columns={{ base: 1, md: 2, lg: columns }} gap={6}>
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    onViewDetails={onViewDetails}
                />
            ))}
        </SimpleGrid>
    )
}
