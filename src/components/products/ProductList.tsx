import React from "react"
import { ProductCard } from "./ProductCard"
import { Loader } from "../common/Loader"
import { SimpleGrid, Center, Text } from "@chakra-ui/react"
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
    columns = 4,
}) =>
{
    if (loading) return <Center><Loader size="large" /></Center>

    if (products.length === 0)
    {
        return (
            <Center py={10}>
                <Text fontSize="lg" color="gray.500">Aucun produit trouvé</Text>
            </Center>
        )
    }

    return (
        <SimpleGrid columns={{ base: 1, sm: 2, md: columns }} gap={4} w="100%">
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
