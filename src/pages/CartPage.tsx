import React, { useState, useEffect } from "react"
import { Container, Heading, VStack, Box, Text, Button, Card, SimpleGrid } from "@chakra-ui/react"
import { useAuth } from "../context/AuthContext"
import { cartService } from "../services/cartService"

interface CartItemData {
  id: number
  name: string
  price: number
  quantity: number
}

interface Cart {
  id: number
  UserId: number
  Products?: Array<{ id: number; name: string; price: number; CartProduct?: { quantity: number } }>
}

export const CartPage: React.FC = () =>
{
    const { user } = useAuth()
    const [items, setItems] = useState<CartItemData[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [notification, setNotification] = useState<string | null>(null)

    useEffect(() => {
        if (!user?.id) {
            setLoading(false)
            return
        }

        const loadCart = async () => {
            try {
                setLoading(true)
                setError(null)
                const cart = await cartService.getOrCreateCart(user.id)

                if (cart.Products && Array.isArray(cart.Products)) {
                    const cartItems = cart.Products.map((product: any) => ({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: product.CartProduct?.quantity || 1,
                    }))
                    setItems(cartItems)
                } else {
                    setItems([])
                }
            }
            catch (err) {
                setError(err instanceof Error ? err.message : "Erreur de chargement du panier")
                setItems([])
            }
            finally {
                setLoading(false)
            }
        }

        loadCart()
    }, [user?.id])

    const handleRemoveItem = async (itemId: number) =>
    {
        if (!user?.id) return

        try {
            const cart = await cartService.getOrCreateCart(user.id)
            await cartService.removeProductFromCart(cart.id, itemId)
            setItems(items.filter((item) => item.id !== itemId))
            setNotification("Produit supprimé")
            setTimeout(() => setNotification(null), 2000)
        }
        catch (err) {
            const msg = err instanceof Error ? err.message : "Erreur lors de la suppression"
            setError(msg)
            setTimeout(() => setError(null), 3000)
        }
    }

    const handleUpdateQuantity = async (itemId: number, quantity: number) =>
    {
        if (!user?.id) return

        if (quantity <= 0)
        {
            handleRemoveItem(itemId)
        }
        else
        {
            try {
                setItems(items.map((item) => (item.id === itemId ? { ...item, quantity } : item)))
            }
            catch (err) {
                const msg = err instanceof Error ? err.message : "Erreur lors de la mise à jour"
                setError(msg)
                setTimeout(() => setError(null), 3000)
            }
        }
    }


    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shipping = 10
    const total = subtotal + shipping

    if (loading) {
        return (
            <Container maxW="container.lg" py={8}>
                <VStack gap={6} align="center" minH="400px" justify="center">
                    <Heading as="h1" size="2xl">Chargement...</Heading>
                </VStack>
            </Container>
        )
    }

    if (error) {
        return (
            <Container maxW="container.lg" py={8}>
                <VStack gap={6} align="center" minH="400px" justify="center">
                    <Heading as="h1" size="2xl" color="red.500">Erreur</Heading>
                    <Text color="gray.600">{error}</Text>
                    <Button colorScheme="blue" size="lg" onClick={() => window.location.reload()}>
                        Réessayer
                    </Button>
                </VStack>
            </Container>
        )
    }

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
            {error && (
                <Box
                    position="fixed"
                    top={4}
                    right={4}
                    bg="red.500"
                    color="white"
                    px={6}
                    py={4}
                    borderRadius="md"
                    boxShadow="0 4px 12px rgba(0, 0, 0, 0.15)"
                    zIndex={1000}
                >
                    <Text fontSize="sm">{error}</Text>
                </Box>
            )}

            {notification && (
                <Box
                    position="fixed"
                    top={4}
                    right={4}
                    bg="green.500"
                    color="white"
                    px={6}
                    py={4}
                    borderRadius="md"
                    boxShadow="0 4px 12px rgba(0, 0, 0, 0.15)"
                    zIndex={1000}
                >
                    <Text fontSize="sm">{notification}</Text>
                </Box>
            )}

            <VStack gap={8} align="stretch">
                <Heading as="h1" size="2xl">
          Mon Panier
                </Heading>

                <SimpleGrid columns={{ base: 1, lg: 3 }} gap={6}>
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
