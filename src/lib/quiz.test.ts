import { describe, expect, it } from 'vitest';
import { getQuestionsFor, quizQuestions } from '@/data/quizzes';
import { mulberry32 } from './random';
import { buildQuiz, prepareQuestion, QUESTIONS_PER_QUIZ, scoreFeedbackKey } from './quiz';

const pool = getQuestionsFor('socrates');

describe('prepareQuestion', () => {
  it('tracks the correct answer through the shuffle', () => {
    // Try many seeds: the option at correctIndex must always be the
    // original first option (the data convention for the right answer).
    for (let seed = 0; seed < 50; seed++) {
      const prepared = prepareQuestion(pool[0], 'en', mulberry32(seed));
      expect(prepared.options[prepared.correctIndex]).toBe(pool[0].options.en[0]);
    }
  });

  it('localizes prompt, options and explanation', () => {
    const en = prepareQuestion(pool[0], 'en', mulberry32(1));
    const pt = prepareQuestion(pool[0], 'pt', mulberry32(1));
    expect(en.prompt).toBe(pool[0].prompt.en);
    expect(pt.prompt).toBe(pool[0].prompt.pt);
    expect(en.options).not.toEqual(pt.options);
  });
});

describe('buildQuiz', () => {
  it(`draws ${QUESTIONS_PER_QUIZ} distinct questions from the pool`, () => {
    const round = buildQuiz(pool, 'en', QUESTIONS_PER_QUIZ, mulberry32(5));
    expect(round).toHaveLength(QUESTIONS_PER_QUIZ);
    expect(new Set(round.map((q) => q.id)).size).toBe(QUESTIONS_PER_QUIZ);
  });

  it('produces different rounds for different seeds (unique experience)', () => {
    const a = buildQuiz(pool, 'en', QUESTIONS_PER_QUIZ, mulberry32(1));
    const b = buildQuiz(pool, 'en', QUESTIONS_PER_QUIZ, mulberry32(99));
    const signature = (round: typeof a) => round.map((q) => `${q.id}:${q.options.join('|')}`).join(';');
    expect(signature(a)).not.toBe(signature(b));
  });

  it('caps the round at the pool size for small pools', () => {
    const round = buildQuiz(pool.slice(0, 3), 'en', QUESTIONS_PER_QUIZ, mulberry32(2));
    expect(round).toHaveLength(3);
  });
});

describe('scoreFeedbackKey', () => {
  it.each([
    [5, 5, 'scorePerfect'],
    [4, 5, 'scoreGood'],
    [2, 5, 'scoreOk'],
    [1, 5, 'scoreLow'],
    [0, 5, 'scoreLow'],
    [0, 0, 'scoreLow'],
  ] as const)('%i/%i → %s', (correct, total, expected) => {
    expect(scoreFeedbackKey(correct, total)).toBe(expected);
  });
});

describe('question pools', () => {
  it('every philosopher pool is large enough to make rounds vary', () => {
    const slugs = new Set(quizQuestions.map((q) => q.philosopherSlug));
    for (const slug of slugs) {
      expect(getQuestionsFor(slug).length).toBeGreaterThan(QUESTIONS_PER_QUIZ);
    }
  });
});
