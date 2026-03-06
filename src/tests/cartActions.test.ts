import { describe, it, expect } from "vitest"
import { addToCart } from "../utils/cartActions"

interface Product {
  id: number;
  name: string;
  quantity?: number;
}

describe("addToCart", () => {

  it("ajoute un produit au panier", () => {
    const cart: Product[] = [];
    const product: Product = { id: 1, name: "Laptop" };
    const result = addToCart(cart, product);
    expect(result.length).toBe(1);
    expect(result[0].quantity).toBe(1);
  })

  it("incrémente la quantité si produit déjà présent", () => {
    const cart: Product[] = [
      { id: 1, name: "Laptop", quantity: 1 }
    ];
    const product: Product = { id: 1, name: "Laptop" };
    const result = addToCart(cart, product);
    expect(result[0].quantity).toBe(2);
  })

})