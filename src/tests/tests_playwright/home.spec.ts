import { test, expect } from "@playwright/test"

test("homepage displays products", async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem("token", "abc123");
  });

  await page.goto("http://localhost:3000")

  await expect(page.locator('[data-testid="hero-detail"]')).toBeVisible()
})