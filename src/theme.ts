import { createSystem, defaultConfig } from "@chakra-ui/react"

// build custom colors on top of default
const brand = {
    50: "#f0fff4",
    100: "#c6f6d5",
    200: "#9ae6b4",
    300: "#68d391",
    400: "#48bb78",
    500: "#38a169",
    600: "#2f855a",
    700: "#276749",
    800: "#22543d",
    900: "#1c4532",
}

const colors = {
    ...defaultConfig.colors,
    brand,
    black: "#000000",
    white: "#ffffff",
}

const config = {
    ...defaultConfig,
    colors,
    initialColorMode: "light",
    useSystemColorMode: false,
    styles: {
        global: {
            body: {
                bg: "white",
                color: "black",
            },
            a: {
                color: "brand.600",
            },
        },
    },
    components: {
        ...defaultConfig.components,
        Button: {
            ...(defaultConfig.components?.Button || {}),
            baseStyle: { borderRadius: "md" },
            variants: {
                primary: {
                    bg: "brand.600",
                    color: "white",
                    _hover: { bg: "brand.700" },
                },
                secondary: {
                    bg: "brand.50",
                    color: "brand.600",
                    _hover: { bg: "brand.100" },
                },
            },
        },
    },
}

export const system = createSystem(config)
