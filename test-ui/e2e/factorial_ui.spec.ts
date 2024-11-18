import { expect } from "@playwright/test";
import { test } from "../coverage_wrapper";

test("factorial UI displays correct value", async ({ page }) => {
  await page.goto("/site_a.html");
  const factorialDisplay = await page.locator("#site-a code").textContent();
  expect(factorialDisplay).toBe("120");
});
