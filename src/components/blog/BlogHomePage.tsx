import React from "react"
import { Box, Heading, Text, SimpleGrid } from "@chakra-ui/react"
import { BlogCard } from "./BlogCard"

const blogArticles = [
    {
        id: 1,
        category: "Bien-être",
        title: "Les bienfaits des cubes anti-stress au quotidien",
        excerpt: "Découvrez comment les fidget cubes peuvent vous aider à gérer le stress et l'anxiété au quotidien. Un outil simple et efficace pour retrouver calme et sérénité.",
        image: "https://image.darty.com/darty?type=image&source=/market/2023/02/03/8143729_3723_1.jpg&width=450&height=300&quality=90&effects=Pad(CC,FFFFFF)",
        link: "https://fidget-toys.fr/blog/fidget-cube-la-solution-anti-stress-a-portee-de-main",
    },
    {
        id: 2,
        category: "Santé",
        title: "Comment les fidget toys améliorent la concentration",
        excerpt: "Les fidget toys ne sont pas qu'un simple gadget. Apprenez comment ils stimulent la concentration, améliorent la productivité et aident à mieux gérer l'hyperactivité.",
        image: "https://temps-action.com/wp-content/uploads/2013/07/probleme-concentration.jpg",
        link: "https://lesminis.fr/blog/fidget-toys-bienfaits-developpement-enfant/?srsltid=AfmBOoqhHJi7G8vjA6xC0BOO6gWusR-m6X1luF3BaQzGdu7n-DWB7XTi",
    },
    {
        id: 3,
        category: "Relaxation",
        title: "Réduire l'anxiété grâce aux balles anti-stress",
        excerpt: "Les balles anti-stress sont des outils thérapeutiques reconnus pour soulager les tensions et l'anxiété. Explorez leurs bienfaits sur votre bien-être mental et physique.",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=300&fit=crop",
        link: "https://www.autismediffusion.com/blogs/sensorialite/pourquoi-utiliser-une-balle-anti-stress?srsltid=AfmBOoreQekm7CoQ7sMSnqAukwiazKLAe6VOWamiYzMlEkDmubjmf_Lr",
    },
]

export const BlogHomePage: React.FC = () =>
{
    return (
        <>
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
                            onReadMore={article.link ? () => window.open(article.link, "_blank") : undefined}
                        />
                    ))}
                </SimpleGrid>
            </Box>
        </>
    )
}
