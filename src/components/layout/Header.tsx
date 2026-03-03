import React from "react"
import { Box, Heading, HStack, Input, Button } from "@chakra-ui/react"
import logoSrc from "../../assets/logo.png"
import profileSrc from "../../assets/profile.png"
import searchSrc from "../../assets/search.png"
import cartSrc from "../../assets/Cart.jpg"

interface Category {
  id: number
  name: string
  count: number
  icon?: string
}

interface HeaderProps {
  siteName?: string
  categories?: Category[]
  onSearchChange?: (query: string) => void
  cartCount?: number
  onCartClick?: () => void
  onProfileClick?: () => void
  onHomeClick?: () => void
  isAuthenticated?: boolean
  onCategoryClick?: (categoryName: string) => void
    minimalHeader?: boolean
}

export const Header: React.FC<HeaderProps> = ({
    siteName = "La Place Zen",
    categories = [],
    onSearchChange,
    cartCount = 0,
    onCartClick,
    onProfileClick,
    onHomeClick,
    isAuthenticated = false,
    onCategoryClick,
    minimalHeader = false,
}) =>
{
    const [searchQuery, setSearchQuery] = React.useState("")

    if (minimalHeader) {
        return (
            <Box as="header" bg="white" boxShadow="md" py={4} position="sticky" top={0} zIndex={100}>
                <Box px={6}>
                    <HStack gap={2} cursor="pointer" onClick={onHomeClick} align="center">
                        <img src={logoSrc} style={{width: "40px", height: "40px", objectFit: "cover"}} alt="logo" />
                        <Heading as="h1" size="lg" color="gray.900">
                            {siteName}
                        </Heading>
                    </HStack>
                </Box>
            </Box>
        )
    }

    return (
        <Box as="header" bg="white" boxShadow="md" py={4} position="sticky" top={0} zIndex={100}>
            <Box px={6}>
                <HStack gap={6} justify="space-between" align="center">
                    <HStack gap={2} cursor="pointer" onClick={onHomeClick} align="center">
                        <img src={logoSrc} style={{width: "40px", height: "40px", objectFit: "cover"}} alt="logo" />
                        <Heading as="h1" size="lg" color="gray.900">
                            {siteName}
                        </Heading>
                    </HStack>

                    <HStack gap={2} overflowX="auto" ml="5%">
                        {categories.map((cat) => (
                            <Button
                                key={cat.id}
                                variant="ghost"
                                size="sm"
                                fontWeight="normal"
                                _hover={{ bg: "gray.100" }}
                                onClick={() => onCategoryClick?.(cat.name)}
                            >
                                {cat.name}
                            </Button>
                        ))}
                    </HStack>

                    <Box flex={0.6} maxW="350px" ml={4} position="relative">
                        <Input
                            placeholder="Rechercher des produits..."
                            value={searchQuery}
                            onChange={(e) =>
                            {
                                setSearchQuery(e.target.value)
                                onSearchChange?.(e.target.value)
                            }}
                            size="sm"
                            pr="40px"
                        />
                        <Box
                            position="absolute"
                            right="10px"
                            top="50%"
                            transform="translateY(-50%)"
                            cursor="pointer"
                        >
                            <img src={searchSrc} style={{width:"20px",height:"20px"}} alt="search" />
                        </Box>
                    </Box>

                    <HStack gap={4} mr={4}>
                        <Box
                            position="relative"
                            cursor="pointer"
                            onClick={onCartClick}
                            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onCartClick?.() }}
                            role="button"
                            tabIndex={0}
                            title="Voir le panier"
                        >
                            <img
                                src={cartSrc}
                                width={32}
                                height={32}
                                style={{ borderRadius: "50%" }}
                                alt="cart"
                            />
                            {cartCount > 0 && (
                                <Box
                                    position="absolute"
                                    top="-4px"
                                    right="-4px"
                                    bg="red.500"
                                    color="white"
                                    borderRadius="full"
                                    fontSize="xs"
                                    width="18px"
                                    height="18px"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    {cartCount}
                                </Box>
                            )}
                        </Box>
                        <Box
                            as="button"
                            cursor="pointer"
                            onClick={onProfileClick}
                            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onProfileClick?.() }}
                            title="Voir le profil"
                            bg="none"
                            border="none"
                            p={0}
                        >
                            <img
                                src={profileSrc}
                                width={32}
                                height={32}
                                style={{ borderRadius: "50%" }}
                                alt="profile"
                            />
                        </Box>
                    </HStack>
                </HStack>
            </Box>
        </Box>
    )
}
