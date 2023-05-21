import { test, expect } from "@playwright/test";

test.describe("First Example Test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(/Airbnb/);
  });
});
