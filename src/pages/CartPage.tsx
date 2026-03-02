import React, { useState } from "react"
import { Container, Heading, VStack, Box, Text, Button, Card, SimpleGrid } from "@chakra-ui/react"

interface CartItemData {
  id: number
  name: string
  price: number
  quantity: number
}

export const CartPage: React.FC = () =>
{
    const [items, setItems] = useState<CartItemData[]>([
        { id: 1, name: "Produit Premium 1", price: 99.99, quantity: 1 },
        { id: 2, name: "Produit Premium 2", price: 149.99, quantity: 2 },
    ])

    const handleRemoveItem = (itemId: number) =>
    {
        setItems(items.filter((item) => item.id !== itemId))
    }

    const handleUpdateQuantity = (itemId: number, quantity: number) =>
    {
        if (quantity <= 0)
        {
            handleRemoveItem(itemId)
        }
        else
        {
            setItems(items.map((item) => (item.id === itemId ? { ...item, quantity } : item)))
        }
    }

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shipping = 10
    const total = subtotal + shipping

    if (items.length === 0)
    {
        return (
            <Container maxW="container.lg" py={8}>
                <VStack gap={6} align="center" minH="400px" justify="center">
                    <Heading as="h1" size="2xl">
            Votre panier est vide
                    </Heading>
                    <Text color="gray.600">Commencez vos achats dès maintenant!</Text>
                    <Button colorScheme="blue" size="lg">
            Continuer vos achats
                    </Button>
                </VStack>
            </Container>
        )
    }

    return (
        <Container maxW="container.lg" py={8}>
            <VStack gap={8} align="stretch">
                <Heading as="h1" size="2xl">
          Mon Panier
                </Heading>

                <SimpleGrid columns={{ base: 1, lg: 3 }} gap={6}>
                    {/* Produits du Panier */}
                    <Box gridColumn={{ lg: "1 / 3" }}>
                        <VStack gap={4} align="stretch">
                            {items.map((item) => (
                                <Card.Root key={item.id}>
                                    <Card.Body gap={4}>
                                        <Box display="flex" justifyContent="space-between" alignItems="start">
                                            <Box>
                                                <Heading size="sm">{item.name}</Heading>
                                                <Text fontSize="sm" color="gray.600">
                          Prix unitaire: {item.price.toFixed(2)}€
                                                </Text>
                                            </Box>
                                            <Button
                                                size="sm"
                                                colorScheme="red"
                                                variant="ghost"
                                                onClick={() => handleRemoveItem(item.id)}
                                            >
                        ✕
                                            </Button>
                                        </Box>

                                        <Box display="flex" gap={4} alignItems="center">
                                            <Text>Quantité:</Text>
                                            <Button
                                                size="sm"
                                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                            >
                        −
                                            </Button>
                                            <Text fontWeight="bold">{item.quantity}</Text>
                                            <Button
                                                size="sm"
                                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                            >
                        +
                                            </Button>
                                        </Box>

                                        <Box display="flex" justifyContent="space-between" pt={2} borderTopWidth={1}>
                                            <Text fontWeight="bold">Sous-total:</Text>
                                            <Text fontWeight="bold">{(item.price * item.quantity).toFixed(2)}€</Text>
                                        </Box>
                                    </Card.Body>
                                </Card.Root>
                            ))}
                        </VStack>
                    </Box>

                    {/* Résumé de Commande */}
                    <Card.Root height="fit-content" position="sticky" top={4}>
                        <Card.Body gap={4}>
                            <Heading size="md">Résumé</Heading>

                            <VStack gap={3} align="stretch">
                                <Box display="flex" justifyContent="space-between">
                                    <Text>Sous-total:</Text>
                                    <Text>{subtotal.toFixed(2)}€</Text>
                                </Box>
                                <Box display="flex" justifyContent="space-between">
                                    <Text>Livraison:</Text>
                                    <Text>{shipping.toFixed(2)}€</Text>
                                </Box>

                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    pt={3}
                                    borderTopWidth={2}
                                    fontWeight="bold"
                                    fontSize="lg"
                                >
                                    <Text>Total:</Text>
                                    <Text>{total.toFixed(2)}€</Text>
                                </Box>
                            </VStack>

                            <Button colorScheme="green" size="lg" width="full">
                Passer la commande
                            </Button>
                        </Card.Body>
                    </Card.Root>
                </SimpleGrid>
            </VStack>
        </Container>
    )
}
