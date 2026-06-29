import { expect, test } from '@playwright/test';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en');
  });

  test('renders school name and tagline', async ({ page }) => {
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('next school button advances the carousel', async ({ page }) => {
    const heading = page.locator('h1').first();
    const firstSchool = await heading.textContent();
    await page.getByRole('button', { name: /next school|›/i }).click();
    await expect(heading).not.toHaveText(firstSchool ?? '');
  });

  test('keyboard arrow advances the carousel', async ({ page }) => {
    const heading = page.locator('h1').first();
    const firstSchool = await heading.textContent();
    await page.keyboard.press('ArrowRight');
    await expect(heading).not.toHaveText(firstSchool ?? '');
  });
});
