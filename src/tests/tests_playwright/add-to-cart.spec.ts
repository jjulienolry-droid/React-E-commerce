import { test, expect } from "@playwright/test"

test("ajouter un produit au panier", async ({ page }) => {
  await page.goto("http://localhost:3000")

  await page.locator('[data-testid="hero-detail"]').click()

  await expect(page.locator('[data-testid="add-cube-anti-stress"]')).toBeVisible()
  await page.locator('[data-testid="add-cube-anti-stress"]').click()

  await expect(page.locator('[data-testid="nav-cart"]')).toBeVisible()
  await page.locator('[data-testid="nav-cart"]').click()

  await expect(page.locator('text=cube anti-stress')).toBeVisible()
})
