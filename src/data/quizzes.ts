import type { QuizQuestion } from './types';
import { ancientQuestions } from './quizzes-ancient';
import { modernQuestions } from './quizzes-modern';

export const quizQuestions: QuizQuestion[] = [...ancientQuestions, ...modernQuestions];

export function getQuestionsFor(philosopherSlug: string): QuizQuestion[] {
  return quizQuestions.filter((q) => q.philosopherSlug === philosopherSlug);
}
