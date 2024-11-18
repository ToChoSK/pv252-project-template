import { test, expect } from '@playwright/test';

test('verify contact information', async ({ page }) => {
  await page.goto('https://www.muni.cz/o-univerzite/fakulty-a-pracoviste/fakulta-informatiky');

  // Scroll to the contact section (usually found near the bottom)
  const contactSection = page.locator('section.contact');

  // Verify that the contact section is visible
  await expect(contactSection).toBeVisible();

  // Check if the contact details contain specific expected text, such as an email or phone number
  const contactDetails = contactSection.locator('p');
  await expect(contactDetails).toContainText('fi@muni.cz');
});
