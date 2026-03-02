import React, { useState, useEffect } from "react"
import { Container, Heading, VStack, Box, Text, SimpleGrid, HStack, Avatar } from "@chakra-ui/react"
import { ProductList } from "../components/products/ProductList"
import { BlogCard } from "../components/common/BlogCard"
import { Product } from "../types/types"

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080"

// Products will be fetched from the API and mapped to the local `Product` type
const useFetchProducts = () =>
{
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() =>
    {
        let mounted = true
        setLoading(true)
        fetch(`${API_BASE}/api/products`)
            .then((r) => r.json())
            .then((data) =>
            {
                if (!mounted) return
                // API returns an array under `value` (or directly array)
                const list = Array.isArray(data) ? data : data.value || data
                const mapped: Product[] = list.map((p: any) => ({
                    id: p.id,
                    name: p.name,
                    description: p.description,
                    price: p.price,
                    discount: p.discount || 0,
                    image: (p.Images && p.Images[0] && p.Images[0].link) || "https://placehold.co/300x200?text=No+Image",
                    rating: p.rating || 5,
                    stock: p.stock || 0,
                    category: (p.Category && p.Category.name) || "",
                    createdAt: p.createdAt,
                }))
                setProducts(mapped)
                setLoading(false)
            })
            .catch((err) =>
            {
                if (!mounted) return
                setError(String(err))
                setLoading(false)
            })

        return () =>
        {
            mounted = false
        }
    }, [])

    return { products, loading, error }
}

const blogArticles = [
    {
        id: 1,
        category: "Bien-être",
        title: "Les bienfaits des cubes anti-stress au quotidien",
        excerpt: "Lorem ipsum dolor sit amet et consectetur adipiscing elit. Commodo consequat condimentum amet, faucibus platea pretium et id mauris scelerisque.",
        image: "https://placehold.co/300x200?text=Cubes+Anti-Stress",
    },
    {
        id: 2,
        category: "Santé",
        title: "Comment les fidget toys améliorent la concentration",
        excerpt: "Lorem ipsum dolor sit amet et consectetur adipiscing elit. Commodo consequat condimentum amet, faucibus platea pretium et id mauris scelerisque.",
        image: "https://placehold.co/300x200?text=Concentration",
    },
    {
        id: 3,
        category: "Relaxation",
        title: "Réduire l'anxiété grâce aux balles anti-stress",
        excerpt: "Lorem ipsum dolor sit amet et consectetur adipiscing elit. Commodo consequat condimentum amet, faucibus platea pretium et id mauris scelerisque.",
        image: "https://placehold.co/300x200?text=Relaxation",
    },
]

// Avis clients
const testimonials = [
    {
        id: 1,
        name: "Marie Dupont",
        rating: 5,
        text: "Produits de très bonne qualité ! La Place Zen m'a vraiment aidée à me détendre après mes journées stressantes.",
        avatar: "https://placehold.co/60x60?text=MD",
    },
    {
        id: 2,
        name: "Jean Martin",
        rating: 5,
        text: "Service client impeccable et livraison rapide. Je recommande vivement La Place Zen à tous mes amis.",
        avatar: "https://placehold.co/60x60?text=JM",
    },
    {
        id: 3,
        name: "Sophie Bernard",
        rating: 4,
        text: "Excellente sélection de produits. Très satisfaite de mon achat. À refaire sans hésiter !",
        avatar: "https://placehold.co/60x60?text=SB",
    },
    {
        id: 4,
        name: "Luc Moreau",
        rating: 5,
        text: "Parfait pour combattre le stress au travail. Les fidgets sont très confortables et durables. Merci !",
        avatar: "https://placehold.co/60x60?text=LM",
    },
    {
        id: 5,
        name: "Isabelle Leclerc",
        rating: 5,
        text: "Découverte incroyable ! Les cubes anti-stress m'aident vraiment à me concentrer. Qualité exceptionnelle.",
        avatar: "https://placehold.co/60x60?text=IL",
    },
    {
        id: 6,
        name: "Thomas Petit",
        rating: 4,
        text: "Bonne qualité, prix raisonnable. La livraison a été un peu longue mais le produit en valait la peine.",
        avatar: "https://placehold.co/60x60?text=TP",
    },
]

export const Home: React.FC<{ onAddToCart?: () => void; onViewDetails?: (product: Product) => void }> = ({ onAddToCart, onViewDetails }) =>
{
    const [cart, setCart] = useState<Product[]>([])
    const { products, loading } = useFetchProducts()

    const handleAddToCart = (product: Product) =>
    {
        setCart([...cart, product])
        onAddToCart?.()
    }

    const handleViewDetails = (product: Product) =>
    {
        onViewDetails?.(product)
    }

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
                    <Box bg="gray.50" p={4} borderRadius="md">
                        <Heading as="h2" size="lg" mb={4}>
              Les produits populaires
                        </Heading>
                        <ProductList
                            products={products.slice(0, 3)}
                            loading={loading}
                            onAddToCart={handleAddToCart}
                            onViewDetails={handleViewDetails}
                            columns={3}
                        />
                    </Box>

                    <Box py={6} />

                    <Box textAlign="center" py={8}>
                        <Heading as="h2" size="2xl" mb={3} color="gray.800">
              Pourquoi choisir La Place Zen ?
                        </Heading>
                        <Text fontSize="lg" color="gray.600" maxW="600px" mx="auto">
              Découvrez comment nos produits anti-stress peuvent améliorer votre quotidien
                        </Text>
                    </Box>

                    <Box>
                        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
                            {blogArticles.map((article) => (
                                <BlogCard
                                    key={article.id}
                                    category={article.category}
                                    title={article.title}
                                    excerpt={article.excerpt}
                                    image={article.image}
                                    onReadMore={() => { /* read more action */ }}
                                />
                            ))}
                        </SimpleGrid>
                    </Box>

                    <Box py={6} />

                    <Box py={8}>
                        <Heading as="h2" size="2xl" mb={8} textAlign="center" color="gray.800">
              Ce que disent nos clients
                        </Heading>
                        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
                            {testimonials.map((testimonial) => (
                                <Box
                                    key={testimonial.id}
                                    bg="white"
                                    p={6}
                                    borderRadius="lg"
                                    boxShadow="sm"
                                    _hover={{ boxShadow: "md" }}
                                    transition="all 0.3s"
                                >
                                    <Text fontSize="lg" color="yellow.500" mb={3}>
                                        {"★".repeat(testimonial.rating)}
                                        {"☆".repeat(5 - testimonial.rating)}
                                    </Text>

                                    <Text color="gray.700" mb={4} lineHeight="1.8" fontSize="sm" minH="60px">
                    &quot;{testimonial.text}&quot;
                                    </Text>

                                    <HStack gap={3}>
                                        <Avatar.Root size="sm">
                                            <Avatar.Fallback name={testimonial.name} />
                                            <Avatar.Image src={testimonial.avatar} alt={testimonial.name} />
                                        </Avatar.Root>
                                        <Text fontWeight="semibold" color="gray.800" fontSize="sm">
                                            {testimonial.name}
                                        </Text>
                                    </HStack>
                                </Box>
                            ))}
                        </SimpleGrid>
                    </Box>
                </VStack>
            </Container>
        </>
    )
}
