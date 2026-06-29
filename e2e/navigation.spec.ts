import { expect, test } from '@playwright/test';

test.describe('Navigation', () => {
  test('root redirects to /en', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/en/);
  });

  test('locale switcher navigates to /pt', async ({ page }) => {
    await page.goto('/en');
    await page.getByRole('link', { name: 'PT' }).click();
    await expect(page).toHaveURL(/\/pt/);
  });

  test('schools index loads', async ({ page }) => {
    await page.goto('/en/schools');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('philosophers index loads', async ({ page }) => {
    await page.goto('/en/philosophers');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});
