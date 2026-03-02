import React from "react"
import { Container, Heading, VStack, Box, Text, Button, Card, SimpleGrid } from "@chakra-ui/react"

export const Profile: React.FC = () =>
{
    return (
        <Container maxW="container.lg" py={8}>
            <VStack gap={8} align="stretch">
                <Heading as="h1" size="2xl">
          Mon Profil
                </Heading>

                <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                    <Card.Root>
                        <Card.Body gap={4}>
                            <Heading size="md">Informations Personnelles</Heading>
                            <VStack gap={3} align="start">
                                <Box>
                                    <Text fontWeight="bold">Nom:</Text>
                                    <Text>Jean Dupont</Text>
                                </Box>
                                <Box>
                                    <Text fontWeight="bold">Email:</Text>
                                    <Text>jean@example.com</Text>
                                </Box>
                                <Box>
                                    <Text fontWeight="bold">Téléphone:</Text>
                                    <Text>+33 6 12 34 56 78</Text>
                                </Box>
                            </VStack>
                            <Button colorScheme="blue" width="full">
                Éditer le profil
                            </Button>
                        </Card.Body>
                    </Card.Root>

                    <Card.Root>
                        <Card.Body gap={4}>
                            <Heading size="md">Adresse de Livraison</Heading>
                            <VStack gap={3} align="start">
                                <Box>
                                    <Text fontWeight="bold">Adresse:</Text>
                                    <Text>123 Rue de la Paix</Text>
                                </Box>
                                <Box>
                                    <Text fontWeight="bold">Ville:</Text>
                                    <Text>Paris, 75001</Text>
                                </Box>
                                <Box>
                                    <Text fontWeight="bold">Pays:</Text>
                                    <Text>France</Text>
                                </Box>
                            </VStack>
                            <Button colorScheme="blue" width="full">
                Modifier l&apos;adresse
                            </Button>
                        </Card.Body>
                    </Card.Root>
                </SimpleGrid>

                <Card.Root>
                    <Card.Body gap={4}>
                        <Heading size="md">Historique de Commandes</Heading>
                        <VStack gap={3} align="stretch">
                            <Box p={3} bg="gray.50" borderRadius="md">
                                <Text fontWeight="bold">Commande #001</Text>
                                <Text fontSize="sm" color="gray.600">
                  Date: 15/02/2026 - Total: 249.99€
                                </Text>
                            </Box>
                            <Box p={3} bg="gray.50" borderRadius="md">
                                <Text fontWeight="bold">Commande #002</Text>
                                <Text fontSize="sm" color="gray.600">
                  Date: 10/02/2026 - Total: 149.99€
                                </Text>
                            </Box>
                        </VStack>
                    </Card.Body>
                </Card.Root>
            </VStack>
        </Container>
    )
}
