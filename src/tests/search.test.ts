import { describe, it, expect } from "vitest"
import { filterProducts } from "../utils/search"

const products = [
  { name: "Laptop" },
  { name: "Mouse" },
  { name: "Keyboard" }
]

describe("filterProducts", () => {

  it("recherche simple", () => {
    const result = filterProducts(products, "Laptop")
    expect(result.length).toBe(1)
  })

  it("recherche insensible à la casse", () => {
    const result = filterProducts(products, "laptop")
    expect(result.length).toBe(1)
  })

  it("retourne un résultat vide si aucun produit", () => {
    const result = filterProducts(products, "Phone")
    expect(result.length).toBe(0)
  })

})