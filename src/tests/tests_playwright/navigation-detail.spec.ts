
import { test, expect } from '@playwright/test';

test("navigation vers détail produit", async ({ page }) => {
  await page.goto("http://localhost:3000")

  await expect(page.locator('[data-testid="hero-detail"]')).toBeVisible()

  await page.locator('[data-testid="hero-detail"]').click()

  await expect(page.locator("text=Produit vedette")).toBeVisible()
})
