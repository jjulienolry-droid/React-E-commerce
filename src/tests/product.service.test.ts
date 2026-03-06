import { describe, it, expect, vi } from "vitest"
import { getProductById, filterProductsByCategory, getAllProductNames } from "../utils/productService"

const mockProducts = [
  { id: 1, name: "Laptop", category: "Electronics" },
  { id: 2, name: "Shoes", category: "Fashion" },
  { id: 3, name: "Phone", category: "Electronics" }
]

describe("productService utils", () => {
  it("getProductById retourne le bon produit", () => {
    const product = getProductById(mockProducts, 2)
    expect(product).toEqual({ id: 2, name: "Shoes", category: "Fashion" })
  })

  it("filterProductsByCategory retourne les bons produits", () => {
    const electronics = filterProductsByCategory(mockProducts, "Electronics")
    expect(electronics.length).toBe(2)
    expect(electronics[0].name).toBe("Laptop")
    expect(electronics[1].name).toBe("Phone")
  })

  it("getAllProductNames retourne tous les noms", () => {
    const names = getAllProductNames(mockProducts)
    expect(names).toEqual(["Laptop", "Shoes", "Phone"])
  })
})