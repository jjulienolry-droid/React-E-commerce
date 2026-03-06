import { describe, it, expect } from "vitest"
import { calculateCartTotal } from "../utils/cart"

describe("calculateCartTotal", () => {

  it("calcule le total pour plusieurs produits", () => {
    const items = [
      { price: 9.99, quantity: 1 },
      { price: 12.99, quantity: 1 },
      { price: 19.99, quantity: 1 }
    ]

    expect(calculateCartTotal(items)).toBeCloseTo(42.97, 2)
  })

  it("retourne 0 pour un panier vide", () => {
    expect(calculateCartTotal([])).toBe(0)
  })

  it("gère les quantités multiples", () => {
    const items = [
      { price: 19.99, quantity: 3 }
    ]

    expect(calculateCartTotal(items)).toBeCloseTo(59.97, 2)
  })
})
