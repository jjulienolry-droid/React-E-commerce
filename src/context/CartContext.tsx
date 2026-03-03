import { createContext, useContext, useState, useCallback } from "react"
import { CartItem, Product } from "../types/types"

interface CartContextType {
    items: CartItem[]
    cartCount: number
    total: number
    addToCart: (product: Product, quantity?: number) => void
    removeFromCart: (productId: number) => void
    updateQuantity: (productId: number, quantity: number) => void
    clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) =>
{
    const [items, setItems] = useState<CartItem[]>([])

    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const addToCart = useCallback((product: Product, quantity = 1) =>
    {
        setItems((prev) =>
        {
            const existing = prev.find((item) => item.productId === product.id)
            if (existing)
            {
                return prev.map((item) =>
                    item.productId === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item,
                )
            }
            return [
                ...prev,
                {
                    id: Date.now(),
                    name: product.name,
                    price: product.price,
                    quantity,
                    image: product.image,
                    productId: product.id,
                },
            ]
        })
    }, [])

    const removeFromCart = useCallback((productId: number) =>
    {
        setItems((prev) => prev.filter((item) => item.productId !== productId))
    }, [])

    const updateQuantity = useCallback((productId: number, quantity: number) =>
    {
        if (quantity <= 0)
        {
            setItems((prev) => prev.filter((item) => item.productId !== productId))
        }
        else
        {
            setItems((prev) =>
                prev.map((item) =>
                    item.productId === productId
                        ? { ...item, quantity }
                        : item,
                ),
            )
        }
    }, [])

    const clearCart = useCallback(() =>
    {
        setItems([])
    }, [])

    return (
        <CartContext.Provider
            value={{
                items,
                cartCount,
                total,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export const useCart = (): CartContextType =>
{
    const context = useContext(CartContext)
    if (!context)
    {
        throw new Error("useCart doit être utilisé dans un CartProvider")
    }
    return context
}
