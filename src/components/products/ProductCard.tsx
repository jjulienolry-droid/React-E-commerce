import React from "react"
import {
    Box,
    Image,
    Heading,
    Text,
    HStack,
    VStack,
    Button as ChakraButton,
} from "@chakra-ui/react"
import { Product } from "../../types/types"

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
  onViewDetails?: (product: Product) => void
}

export const ProductCard: React.FC<ProductCardProps> = ({
    product,
    onAddToCart,
    onViewDetails,
}) =>
{
    const bg = "white"
    const shadow = "md"

    return (
        <Box
            role="group"
            bg={bg}
            shadow={shadow}
            borderRadius="md"
            overflow="hidden"
            minH={{ base: "420px", md: "480px" }}
            _hover={{ transform: "scale(1.02)", shadow: "lg" }}
            transition="all 0.2s"
            cursor="pointer"
            onClick={() => onViewDetails?.(product)}
        >
            <Box position="relative" overflow="hidden" bg="white" display="flex" alignItems="center" justifyContent="center" p={4}>
                <Image
                    src={product.image}
                    alt={product.name}
                    maxW="100%"
                    maxH={{ base: "240px", md: "280px" }}
                    objectFit="contain"
                    transition="transform 0.25s ease, filter 0.25s ease"
                    _groupHover={{ filter: "grayscale(100%) brightness(60%) contrast(90%)", transform: "scale(1.06)" }}
                />
            </Box>
            <VStack align="start" p={4} gap={2}>
                <Heading size="md" truncate>
                    {product.name}
                </Heading>
                <HStack>
                    <Text fontSize="sm">{"⭐".repeat(Math.floor(product.rating))}</Text>
                    <Text fontSize="xs" color="gray.500">
            ({product.rating})
                    </Text>
                </HStack>
                <HStack gap={2} align="baseline">
                    <Text fontSize="lg" fontWeight="bold">
            ${product.price.toFixed(2)}
                    </Text>
                </HStack>
                <Box pt={3} w="100%">
                    <ChakraButton
                        w="100%"
                        size="md"
                        bg="gray.600"
                        color="white"
                        fontWeight="semibold"
                        borderRadius="md"
                        _hover={{ bg: "gray.700", transform: "translateY(-1px)", boxShadow: "md" }}
                        _active={{ bg: "gray.800", transform: "translateY(0)" }}
                        transition="all 0.2s"
                        onClick={(e) =>
                        {
                            e.stopPropagation()
                            onAddToCart?.(product)
                        }}
                    >
                        Ajouter au panier
                    </ChakraButton>
                </Box>
            </VStack>
        </Box>
    )
}
