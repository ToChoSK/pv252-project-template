import { test, expect } from '@playwright/test';

test('verify faculty information section', async ({ page }) => {
  await page.goto('https://www.muni.cz/o-univerzite/fakulty-a-pracoviste/fakulta-informatiky');

  // Locate the heading of the Faculty of Informatics
  const facultyHeading = page.locator('h1');

  // Check that the faculty heading is present and correct
  await expect(facultyHeading).toBeVisible();
  await expect(facultyHeading).toHaveText('Fakulta informatiky');

  // Verify that the introduction text contains the expected content
  const introText = page.locator('p.intro-text');
  await expect(introText).toContainText('Fakulta informatiky Masarykovy univerzity');
});
