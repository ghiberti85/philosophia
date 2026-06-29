import { expect, test } from '@playwright/test';

test.describe('Quiz', () => {
  test('opens and completes a quiz round', async ({ page }) => {
    await page.goto('/en/philosophers/socrates');

    // Open quiz
    const quizButton = page.getByRole('button', { name: /quiz/i }).first();
    await expect(quizButton).toBeVisible();
    await quizButton.click();

    // Intro screen → start
    const startButton = page.getByRole('button', { name: /start/i });
    await expect(startButton).toBeVisible();
    await startButton.click();

    // Answer 5 questions
    for (let i = 0; i < 5; i++) {
      const options = page.getByRole('button', { name: /^[A-D]\)/i });
      // Wait for options to be visible
      await expect(options.first()).toBeVisible({ timeout: 5000 });
      await options.first().click();
      // Wait for next question or results
      await page.waitForTimeout(400);
    }

    // Results screen should appear
    await expect(page.getByText(/score|resultado|pontos/i)).toBeVisible({ timeout: 5000 });
  });

  test('quiz modal closes on Escape', async ({ page }) => {
    await page.goto('/en/philosophers/socrates');
    await page.getByRole('button', { name: /quiz/i }).first().click();
    await expect(page.getByRole('button', { name: /start/i })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('button', { name: /start/i })).not.toBeVisible();
  });
});
