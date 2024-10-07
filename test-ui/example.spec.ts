import { expect } from "@playwright/test";
import { test } from "./coverage_wrapper";

test("find-watman", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByAltText("This is watman")).toBeInViewport();
});

// Test to check for the correct factorial value for 5
test("display correct factorial for 5", async ({ page }) => {
  await page.goto("/");

  const input = await page.locator('input#factorial-input');
  await input.fill('5');
  await page.locator('button#calculate').click();

  const factorialElement = await page.locator('text=Factorial value 5! is 120');
  await expect(factorialElement).toBeVisible();
});

// Test to ensure negative input shows an error
test("display error for negative factorial", async ({ page }) => {
  await page.goto("/");

  const input = await page.locator('input#factorial-input');
  await input.fill('-5');
  await page.locator('button#calculate').click();

  const errorElement = await page.locator('text=Negative numbers not supported');
  await expect(errorElement).toBeVisible();
});
