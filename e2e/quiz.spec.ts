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
      // Gate on the question counter so each iteration acts on the right question.
      await expect(page.getByText(`Question ${i + 1} of 5`)).toBeVisible({ timeout: 10000 });
      await page.getByTestId('quiz-option').first().click();
      // Confirm the answer to move to the next question (or the results)
      const advance = i < 4 ? /next question/i : /see results/i;
      await page.getByRole('button', { name: advance }).click();
    }

    // Results screen should appear
    await expect(page.getByText(/your score/i)).toBeVisible({ timeout: 10000 });
  });

  test('quiz modal closes on Escape', async ({ page }) => {
    await page.goto('/en/philosophers/socrates');
    await page.getByRole('button', { name: /quiz/i }).first().click();
    await expect(page.getByRole('button', { name: /start/i })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('button', { name: /start/i })).not.toBeVisible();
  });
});
