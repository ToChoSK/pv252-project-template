import { test, expect } from '@playwright/test';

test('verify language switch', async ({ page }) => {
  await page.goto('https://www.muni.cz/o-univerzite/fakulty-a-pracoviste/fakulta-informatiky');

  // Click on the language switch button to change to English
  await page.click('a[href="/en/about-us/faculties/faculty-of-informatics"]');

  // Wait for the page to load and verify that the title is in English
  await page.waitForLoadState('domcontentloaded');
  await expect(page).toHaveTitle('Faculty of Informatics | Masaryk University');

  // Verify that the heading has changed to English
  const heading = page.locator('h1');
  await expect(heading).toHaveText('Faculty of Informatics');
});
