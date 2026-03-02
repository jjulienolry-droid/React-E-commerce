import React from "react"
import { Box, VStack, HStack, Link, Text, SimpleGrid, Stack } from "@chakra-ui/react"

export const Footer: React.FC = () =>
{
    return (
        <Box as="footer" bg="gray.100" color="gray.700" py={10}>
            {/* link sections arranged in responsive grid */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} maxW="container.xl" mx="auto" px={6}>
                <VStack align="start" gap={2}>
                    <Text fontWeight="bold">À propos</Text>
                    <Link href="#about">À propos de nous</Link>
                    <Link href="#careers">Carrières</Link>
                    <Link href="#press">Presse</Link>
                    <Link href="#blog">Blog</Link>
                </VStack>

                <VStack align="start" gap={2}>
                    <Text fontWeight="bold">Support</Text>
                    <Link href="#contact">Nous contacter</Link>
                    <Link href="#faq">FAQ</Link>
                    <Link href="#shipping">Livraison</Link>
                    <Link href="#returns">Retours</Link>
                </VStack>

                <VStack align="start" gap={2}>
                    <Text fontWeight="bold">Politique</Text>
                    <Link href="#privacy">Confidentialité</Link>
                    <Link href="#terms">Conditions d&apos;utilisation</Link>
                    <Link href="#cookies">Cookies</Link>
                    <Link href="#legal">Mentions légales</Link>
                </VStack>
            </SimpleGrid>

            {/* social bar below */}
            <Box mt={10} borderTopWidth={1} borderColor="gray.200" pt={6} maxW="container.xl" mx="auto" px={6}>
                <Stack direction={{ base: "column", md: "row" }} gap={4} justify="space-between" align="center">
                    <Text fontSize="sm">© 2024 E-Commerce. Tous droits réservés.</Text>
                    <HStack gap={4}>
                        <Link href="#facebook">Facebook</Link>
                        <Link href="#twitter">Twitter</Link>
                        <Link href="#instagram">Instagram</Link>
                        <Link href="#youtube">YouTube</Link>
                    </HStack>
                </Stack>
            </Box>
        </Box>
    )
}
