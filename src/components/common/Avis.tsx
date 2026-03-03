import React from "react"
import { Box, Heading, Text, SimpleGrid, HStack, Avatar } from "@chakra-ui/react"

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

export const Avis: React.FC = () =>
{
    return (
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
    )
}
