import React from "react"
import { Box, Heading, Text, Button, VStack, Image } from "@chakra-ui/react"

interface BlogCardProps {
  category: string
  title: string
  excerpt: string
  image?: string
  onReadMore?: () => void
}

export const BlogCard: React.FC<BlogCardProps> = ({
    category,
    title,
    excerpt,
    image = "https://placehold.co/300x200?text=Blog+Image",
    onReadMore,
}) =>
{
    return (
        <Box
            bg="white"
            borderRadius="md"
            overflow="hidden"
            boxShadow="sm"
            _hover={{ boxShadow: "md" }}
            transition="all 0.3s"
        >
            <Image
                src={image}
                alt={title}
                width="100%"
                height="200px"
                objectFit="cover"
                bg="gray.200"
            />

            <VStack align="stretch" p={6} gap={3}>
                <Text fontSize="sm" color="gray.500" textTransform="uppercase">
                    {category}
                </Text>

                <Heading as="h3" size="md" color="gray.800">
                    {title}
                </Heading>

                <Text fontSize="sm" color="gray.600" lineHeight="1.6">
                    {excerpt}
                </Text>

                <Button
                    variant="ghost"
                    color="gray.700"
                    fontWeight="normal"
                    alignSelf="flex-start"
                    onClick={onReadMore}
                    mt={2}
                    px={0}
                >
          Read more
                </Button>
            </VStack>
        </Box>
    )
}
