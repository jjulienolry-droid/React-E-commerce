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
import { Button } from "../common/Button"

interface Product {
  id: number
  name: string
  price: number
  image: string
  rating: number
  discount?: number
}

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
            <Box position="relative" overflow="hidden" bg="gray.100">
                <Image
                    src={product.image}
                    alt={product.name}
                    w="100%"
                    h={{ base: "280px", md: "340px" }}
                    objectFit="cover"
                    objectPosition="center 35%"
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
                <Box pt={2} w="100%">
                    <Button
                        variant="primary"
                        size="small"
                        onClick={(e) =>
                        {
                            e.stopPropagation()
                            onAddToCart?.(product)
                        }}
                        style={{ width: "100%" }}
                    >
            Ajouter au panier
                    </Button>
                </Box>
            </VStack>
        </Box>
    )
}
