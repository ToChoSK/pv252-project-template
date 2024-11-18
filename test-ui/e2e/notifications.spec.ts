import { expect } from "@playwright/test";
import { test } from "../coverage_wrapper";
test("factorial notification sequence", async ({ page }) => {
  await page.goto("/");
  await page.click("#site-a");

  await expect(page.locator(".uk-notification-message")).toContainText("Going to factorials in 3s...");
  await page.waitForTimeout(1000);
  await expect(page.locator(".uk-notification-message")).toContainText("Going to factorials in 2s...");
  await page.waitForTimeout(1000);
  await expect(page.locator(".uk-notification-message")).toContainText("Going to factorials in 1s...");
});

test("fibonacci notification sequence", async ({ page }) => {
  await page.goto("/");
  await page.click("#site-b");

  await expect(page.locator(".uk-notification-message")).toContainText("Going to fibonacci in 3s...");
  await page.waitForTimeout(1000);
  await expect(page.locator(".uk-notification-message")).toContainText("Going to fibonacci in 2s...");
  await page.waitForTimeout(1000);
  await expect(page.locator(".uk-notification-message")).toContainText("Going to fibonacci in 1s...");
});
