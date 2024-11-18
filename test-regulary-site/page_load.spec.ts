import { test, expect } from '@playwright/test';

test('verify page title', async ({ page }) => {
  await page.goto('https://www.muni.cz/o-univerzite/fakulty-a-pracoviste/fakulta-informatiky');

  // Verify the title of the page
  await expect(page).toHaveTitle('Fakulta informatiky | Masarykova univerzita');
});
