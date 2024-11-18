import { test, expect } from '@playwright/test';

test('verify navigation menu links', async ({ page }) => {
  await page.goto('https://www.muni.cz/o-univerzite/fakulty-a-pracoviste/fakulta-informatiky');

  // Check if the navigation links exist
  const navLinks = page.locator('nav a');
  await expect(navLinks).toHaveCount(5); // Assuming there are 5 primary links in the navigation

  // Check that the first link is visible and has correct text
  await expect(navLinks.first()).toBeVisible();
  await expect(navLinks.first()).toHaveText('O univerzitě');

  // Click on the first link and check if the new page loads correctly
  await navLinks.first().click();
  await expect(page).toHaveURL(/o-univerzite/); // Regex to match any URL that starts with "/o-univerzite"
});
