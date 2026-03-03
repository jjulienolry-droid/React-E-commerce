import React from "react"
import { Container, Heading, VStack, Box, Text } from "@chakra-ui/react"
import { ProductsHomePage } from "../components/products/ProductsHomePage"
import { BlogHomePage } from "../components/blog/BlogHomePage"
import { Avis } from "../components/common/Avis"
import { Product } from "../types/types"

export const Home: React.FC<{ onAddToCart?: (product: Product) => void; onViewDetails?: (product: Product) => void; categoryFilter?: string | null }> = ({ onAddToCart, onViewDetails, categoryFilter }) =>
{

    return (
        <>
            <Box textAlign="center" py={12} bg="gray.50" width="100%" mt="75px">
                <Heading as="h1" size="3xl" mb={4} color="gray.800">
          Bienvenue sur La Place Zen
                </Heading>
                <Text fontSize="lg" color="gray.600">
          D&eacute;couvrez notre s&eacute;lection d&apos;objets anti-stress pour votre bien-&ecirc;tre quotidien
                </Text>
            </Box>

            <Container maxW="container.xl" py={8}>
                <VStack gap={8} align="stretch">
                    <ProductsHomePage
                        onAddToCart={onAddToCart}
                        onViewDetails={onViewDetails}
                        categoryFilter={categoryFilter}
                    />

                    <Box py={6} />

                    <BlogHomePage />

                    <Box py={6} />

                    <Avis />
                </VStack>
            </Container>
        </>
    )
}
