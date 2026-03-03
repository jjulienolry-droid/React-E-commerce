import React from "react"
import { Box } from "@chakra-ui/react"
import { Header } from "./Header"
import { Footer } from "./Footer"

interface Category {
  id: number
  name: string
  count: number
  icon?: string
}

interface MainLayoutProps {
  navLinks: Array<{ label: string; href: string }>
  children: React.ReactNode
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

export const MainLayout: React.FC<MainLayoutProps> = ({
    navLinks,
    children,
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
    return (
        <Box id="main-container" minH="100vh" display="flex" flexDirection="column">
            <Header
                siteName="La Place Zen"
                categories={categories}
                onSearchChange={onSearchChange || (() => {})}
                cartCount={cartCount}
                onCartClick={onCartClick || (() => {})}
                onProfileClick={onProfileClick || (() => {})}
                onHomeClick={() =>
                {
                    if (typeof onHomeClick === "function") onHomeClick()
                }}
                isAuthenticated={isAuthenticated}
                onCategoryClick={onCategoryClick}
                minimalHeader={minimalHeader}
            />

            <Box flex={1}>{children}</Box>

            <Footer />
        </Box>
    )
}
