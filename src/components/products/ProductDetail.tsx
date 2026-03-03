import React from "react"
import {
    Box,
    Container,
    Grid,
    Image,
    Heading,
    Text,
    HStack,
    VStack,
    Button as ChakraButton,
    Input,
} from "@chakra-ui/react"

interface Product {
  id: number
  name: string
  price: number
  description: string
  image: string
  rating: number
  stock: number
  category: string
  discount?: number
}

interface ProductDetailProps {
  product: Product
  onAddToCart?: (product: Product, quantity: number) => void
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
    product,
    onAddToCart,
}) =>
{
    const [quantity, setQuantity] = React.useState(1)
    const [showNotification, setShowNotification] = React.useState(false)
    const [isExiting, setIsExiting] = React.useState(false)

    const handleAddToCart = () =>
    {
        onAddToCart?.(product, quantity)
        setShowNotification(true)
        setIsExiting(false)

        setTimeout(() =>
        {
            setIsExiting(true)
            setTimeout(() => setShowNotification(false), 300)
        }, 2700)
    }

    return (
        <Box bg="white" minH="100vh">
            <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(400px);
            opacity: 0;
          }
        }
      `}</style>

            {showNotification && (
                <Box
                    position="fixed"
                    top={4}
                    right={4}
                    bg="green.500"
                    color="white"
                    px={6}
                    py={4}
                    borderRadius="md"
                    boxShadow="0 10px 40px rgba(0, 0, 0, 0.3)"
                    zIndex={1000}
                    border="2px solid"
                    borderColor="green.600"
                    style={{
                        animation: isExiting ? "slideOutRight 0.3s ease-out forwards" : "slideInRight 0.3s ease-out forwards",
                    }}
                >
                    <Heading as="h4" size="sm" mb={1}>
            ✓ Produit ajouté
                    </Heading>
                    <Text fontSize="sm">
                        {quantity}x {product.name} ajouté au panier
                    </Text>
                </Box>
            )}
            <Container maxW="container.xl" py={8}>
                <Text mb={6} fontSize="sm" color="gray.600">
          Accueil / {product.name}
                </Text>

                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={10}>
                    <Box>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            bg="white"
                            borderRadius="xl"
                            p={6}
                            border="1px solid"
                            borderColor="gray.200"
                            boxShadow="sm"
                            minH={{ base: "350px", md: "500px" }}
                        >
                            <Image
                                src={product.image}
                                alt={product.name}
                                maxW="100%"
                                maxH={{ base: "320px", md: "460px" }}
                                objectFit="contain"
                                borderRadius="md"
                            />
                        </Box>
                    </Box>

                    <VStack align="stretch" gap={4}>
                        <Heading as="h1" size="2xl" color="gray.800">
                            {product.name}
                        </Heading>

                        <HStack gap={2}>
                            <Text fontSize="lg" color="yellow.500">
                                {"★".repeat(Math.floor(product.rating))}
                                {"☆".repeat(5 - Math.floor(product.rating))}
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                ({product.rating} / 5)
                            </Text>
                        </HStack>

                        <Box borderBottomWidth={1} borderColor="gray.200" py={3} />

                        <HStack gap={3} align="baseline">
                            <Text fontSize="3xl" fontWeight="bold" color="gray.800">
                ${product.price.toFixed(2)}
                            </Text>
                        </HStack>

                        <HStack>
                            {product.stock > 0 ? (
                                <Box bg="green.100" color="green.800" px={3} py={1} borderRadius="md" fontSize="sm" fontWeight="semibold">
                  En stock
                                </Box>
                            ) : (
                                <Box bg="red.100" color="red.800" px={3} py={1} borderRadius="md" fontSize="sm" fontWeight="semibold">
                  Rupture de stock
                                </Box>
                            )}
                        </HStack>

                        <Box borderBottomWidth={1} borderColor="gray.200" py={3} />

                        <Box>
                            <Heading as="h3" size="md" mb={3} color="gray.800">
                Description
                            </Heading>
                            <Text color="gray.700" lineHeight="1.8">
                                {product.description}
                            </Text>
                        </Box>

                        <Box borderBottomWidth={1} borderColor="gray.200" py={3} />

                        <Box>
                            <Text fontSize="sm" fontWeight="semibold" mb={2} color="gray.700">
                Quantité
                            </Text>
                            <HStack gap={2} maxW="150px">
                                <ChakraButton
                                    size="sm"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    disabled={product.stock === 0}
                                >
                  -
                                </ChakraButton>
                                <Input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.min(product.stock, Math.max(1, parseInt(e.target.value) || 1)))}
                                    min={1}
                                    max={product.stock}
                                    textAlign="center"
                                    readOnly
                                    w="50px"
                                />
                                <ChakraButton
                                    size="sm"
                                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                    disabled={product.stock === 0}
                                >
                  +
                                </ChakraButton>
                            </HStack>
                        </Box>

                        <HStack gap={4} pt={4}>
                            <ChakraButton
                                colorScheme="blue"
                                size="lg"
                                flex={1}
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                            >
                Ajouter au panier
                            </ChakraButton>
                        </HStack>
                    </VStack>
                </Grid>
            </Container>
        </Box>
    )
}
