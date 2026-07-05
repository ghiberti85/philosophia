import { expect, test } from '@playwright/test';

// Quiz has no dedicated page anymore — it's a modal opened from a
// philosopher's dossier card, reachable from the dashboard (this suite)
// or from the influence map's "View profile" card.
test.describe('Quiz', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en');
    await page.locator('.pcard').first().click();
    // Scoped to the open dossier modal — the dashboard background also has
    // an unrelated "quiz pool" stat button that a loose /quiz/i would match.
    await page
      .locator('.modal')
      .getByRole('button', { name: /quiz about/i })
      .click();
  });

  test('opens and completes a quiz round', async ({ page }) => {
    for (let i = 0; i < 5; i++) {
      await page.locator('.qopt').first().click();
      const advance = i < 4 ? /next question/i : /see results/i;
      await page.getByRole('button', { name: advance }).click();
    }

    await expect(page.getByText(/your score/i)).toBeVisible({ timeout: 10000 });
  });

  test('quiz modal closes on Escape', async ({ page }) => {
    await expect(page.locator('.qopt').first()).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('.qopt').first()).not.toBeVisible();
  });
});
