import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { getQuestionsFor } from '@/data/quizzes';
import { QUESTIONS_PER_QUIZ } from '@/lib/quiz';
import { QuizEngine } from './QuizEngine';

const questions = getQuestionsFor('socrates');

function renderQuiz() {
  return render(
    <QuizEngine
      questions={questions}
      locale="en"
      philosopherName="Socrates"
      storageKey="test:best:socrates"
    />,
  );
}

/** Answers the current question and returns whether the pick was correct. */
function answerCurrentQuestion(): boolean {
  const options = screen
    .getAllByRole('button')
    .filter((b) => !b.textContent?.match(/next question|see results/i));
  fireEvent.click(options[0]);
  return screen.queryByText('Correct!') !== null;
}

describe('QuizEngine', () => {
  beforeEach(() => window.localStorage.clear());

  it('shows the intro screen with a start button', () => {
    renderQuiz();
    expect(screen.getByText('Socrates')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /start quiz/i })).toBeInTheDocument();
  });

  it('plays a full round and reaches the results screen', () => {
    renderQuiz();
    fireEvent.click(screen.getByRole('button', { name: /start quiz/i }));

    let correct = 0;
    for (let i = 0; i < QUESTIONS_PER_QUIZ; i++) {
      expect(screen.getByText(`Question ${i + 1} of ${QUESTIONS_PER_QUIZ}`)).toBeInTheDocument();
      if (answerCurrentQuestion()) correct++;
      const advance =
        i < QUESTIONS_PER_QUIZ - 1
          ? screen.getByRole('button', { name: /next question/i })
          : screen.getByRole('button', { name: /see results/i });
      fireEvent.click(advance);
    }

    expect(screen.getByText('Your score')).toBeInTheDocument();
    expect(screen.getByText(`${correct}/${QUESTIONS_PER_QUIZ}`)).toBeInTheDocument();
  });

  it('reveals an explanation after answering and locks further answers', () => {
    renderQuiz();
    fireEvent.click(screen.getByRole('button', { name: /start quiz/i }));
    answerCurrentQuestion();
    // All four option buttons become disabled once an answer is locked in.
    const options = screen
      .getAllByRole('button')
      .filter((b) => !b.textContent?.match(/next question|see results/i));
    for (const option of options) expect(option).toBeDisabled();
  });

  it('persists the best score in localStorage', () => {
    renderQuiz();
    fireEvent.click(screen.getByRole('button', { name: /start quiz/i }));
    for (let i = 0; i < QUESTIONS_PER_QUIZ; i++) {
      answerCurrentQuestion();
      fireEvent.click(
        screen.getByRole('button', { name: i < QUESTIONS_PER_QUIZ - 1 ? /next question/i : /see results/i }),
      );
    }
    expect(window.localStorage.getItem('test:best:socrates')).toMatch(/^\d$/);
  });
});
