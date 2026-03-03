import { API, fetchAuth } from "./api"
import { CartItem, Product } from "../types/types"

export interface Cart {
    id: number
    UserId: number
    Products: Product[]
    total: number
}

export const cartService = {
    async getOrCreateCart(userId: number): Promise<Cart> {
        console.log(" [CART SERVICE] Getting or creating cart...", { userId })

        const response = await fetchAuth(API.cart(userId), { method: "GET" })

        if (!response.ok) {
            throw new Error("Impossible de charger le panier")
        }

        const cart: Cart = await response.json()
        console.log(" [CART SERVICE] Cart fetched successfully", { cartId: cart.id, productCount: cart.Products?.length || 0 })

        return cart
    },

    async addProductToCart(cartId: number, productId: number): Promise<Cart> {
        console.log(" [CART SERVICE] Adding product to cart...", { cartId, productId })

        const response = await fetchAuth(API.cartProduct(cartId, productId), {
            method: "POST",
            body: JSON.stringify({}),
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData?.message || errorData?.error || "Impossible d'ajouter le produit au panier")
        }

        const updatedCart: Cart = await response.json()
        console.log(" [CART SERVICE] Product added successfully", { cartId: updatedCart.id })

        return updatedCart
    },

    async removeProductFromCart(cartId: number, productId: number, removeAll = false): Promise<Cart> {
        console.log(" [CART SERVICE] Removing product from cart...", { cartId, productId })

        const deleteUrl = removeAll
            ? `${API.cartProduct(cartId, productId)}?all=true`
            : API.cartProduct(cartId, productId)

        const response = await fetchAuth(deleteUrl, {
            method: "DELETE",
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData?.message || errorData?.error || "Impossible de supprimer le produit du panier")
        }

        const updatedCart: Cart = await response.json()
        console.log(" [CART SERVICE] Product removed successfully", { cartId: updatedCart.id })

        return updatedCart
    },

    async getCartCount(userId: number): Promise<number> {
        console.log(" [CART SERVICE] Getting cart count...", { userId })

        const response = await fetchAuth(API.cartCount(userId), { method: "GET" })

        if (!response.ok) {
            throw new Error("Impossible de compter les articles du panier")
        }

        const count: number = await response.json()
        console.log(" [CART SERVICE] Cart count fetched successfully", { count })

        return count
    },
}
