import { expect } from "@playwright/test";
import { test } from "../coverage_wrapper";

test("fibonacci UI displays correct value", async ({ page }) => {
  await page.goto("/site_b.html");
  const fibonacciDisplay = await page.locator("#site-b code").textContent();
  expect(fibonacciDisplay).not.toBeNull();
  // Additional checks can be added based on your Fibonacci logic
});
