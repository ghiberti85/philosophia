import type { QuizQuestion } from './types';
import { ancientQuestions } from './quizzes-ancient';
import { modernQuestions } from './quizzes-modern';
import { extraQuestions } from './quizzes-extra';

export const quizQuestions: QuizQuestion[] = [...ancientQuestions, ...modernQuestions, ...extraQuestions];

export function getQuestionsFor(philosopherSlug: string): QuizQuestion[] {
  return quizQuestions.filter((q) => q.philosopherSlug === philosopherSlug);
}
