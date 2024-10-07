import { expect } from "@playwright/test";
import { test } from "../coverage_wrapper";

test("navigate to factorial page", async ({ page }) => {
  await page.goto("/");
  await page.click("#site-a");
  await page.waitForTimeout(3000); // Wait for countdown
  await expect(page).toHaveURL("/site_a.html");
});

test("navigate to fibonacci page", async ({ page }) => {
  await page.goto("/");
  await page.click("#site-b");
  await page.waitForTimeout(3000); // Wait for countdown
  await expect(page).toHaveURL("/site_b.html");
});
