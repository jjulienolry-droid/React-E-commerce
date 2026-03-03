import React, { useState } from "react"
import { Box } from "@chakra-ui/react"
import { ProductDetail } from "../components/products/ProductDetail"
import { Product } from "../types/types"

interface ProductDetailPageProps {
    product: Product
    onAddToCart?: (product: Product, quantity: number) => void
    onBack?: () => void
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
    product,
    onAddToCart,
    onBack,
}) =>
{
    return (
        <Box>
            {onBack && (
                <Box
                    as="button"
                    px={6}
                    py={3}
                    mt="80px"
                    ml={6}
                    fontSize="sm"
                    color="gray.600"
                    bg="none"
                    border="none"
                    cursor="pointer"
                    _hover={{ color: "gray.800" }}
                    onClick={onBack}
                >
                    &larr; Retour
                </Box>
            )}
            <ProductDetail
                product={product}
                onAddToCart={onAddToCart}
            />
        </Box>
    )
}
