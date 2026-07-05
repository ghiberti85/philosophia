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

  test('influence map loads from the dashboard hero link', async ({ page }) => {
    await page.goto('/en');
    await page.getByRole('link', { name: /influence map/i }).click();
    await expect(page).toHaveURL(/\/en\/graph/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});
