'use client';

import { useCallback, useEffect, useState } from 'react';
import type { QuizQuestion } from '@/data/types';
import { dict } from '@/data/dictionary';
import { t, type Locale } from '@/lib/i18n';
import { buildQuiz, scoreFeedbackKey, type PreparedQuestion, QUESTIONS_PER_QUIZ } from '@/lib/quiz';

interface QuizEngineProps {
  questions: QuizQuestion[];
  locale: Locale;
  philosopherName: string;
  /** localStorage key for the best score. */
  storageKey: string;
}

type Phase = 'intro' | 'playing' | 'results';

export function QuizEngine({ questions, locale, philosopherName, storageKey }: QuizEngineProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [round, setRound] = useState<PreparedQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState<number | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    if (stored !== null) setBest(Number(stored));
  }, [storageKey]);

  const start = useCallback(() => {
    // A fresh random draw + option shuffle on every start makes each round unique.
    setRound(buildQuiz(questions, locale));
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setPhase('playing');
  }, [questions, locale]);

  const question = round[current];
  const isLast = current === round.length - 1;
  const answered = selected !== null;

  function answer(index: number) {
    if (answered) return;
    setSelected(index);
    if (index === question.correctIndex) setScore((s) => s + 1);
  }

  function next() {
    if (isLast) {
      const final = score;
      if (best === null || final > best) {
        setBest(final);
        window.localStorage.setItem(storageKey, String(final));
      }
      setPhase('results');
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  }

  if (phase === 'intro') {
    return (
      <div className="animate-fade-up rounded-2xl border border-gold-500/20 bg-white/50 p-5 text-center shadow-card dark:bg-midnight-800/50 sm:p-8">
        <h2 className="font-display text-2xl sm:text-3xl">{philosopherName}</h2>
        <p className="mx-auto mt-3 max-w-md opacity-80">{t(dict.quizSubtitle, locale)}</p>
        <p className="mt-2 text-sm opacity-60">
          {questions.length} {t(dict.questionsInPool, locale)}
        </p>
        {best !== null && (
          <p className="mt-2 text-sm font-semibold text-gold-600 dark:text-gold-300">
            {t(dict.bestScore, locale)}: {best}/{QUESTIONS_PER_QUIZ}
          </p>
        )}
        <button
          type="button"
          onClick={start}
          className="mt-6 rounded-full bg-gold-500 px-8 py-3 font-semibold uppercase tracking-wider text-white transition-transform hover:scale-105 dark:bg-gold-400 dark:text-midnight-900"
        >
          {t(dict.startQuiz, locale)}
        </button>
      </div>
    );
  }

  if (phase === 'results') {
    const feedback = t(dict[scoreFeedbackKey(score, round.length)], locale);
    return (
      <div className="animate-fade-up rounded-2xl border border-gold-500/20 bg-white/50 p-5 text-center shadow-card dark:bg-midnight-800/50 sm:p-8">
        <p className="text-sm uppercase tracking-widest opacity-60">{t(dict.yourScore, locale)}</p>
        <p className="mt-2 font-display text-5xl text-gold-600 dark:text-gold-300 sm:text-6xl">
          {score}/{round.length}
        </p>
        <p className="mt-4 text-lg italic">{feedback}</p>
        {best !== null && (
          <p className="mt-2 text-sm opacity-70">
            {t(dict.bestScore, locale)}: {Math.max(best, score)}/{round.length}
          </p>
        )}
        <button
          type="button"
          onClick={start}
          className="mt-6 rounded-full bg-gold-500 px-8 py-3 font-semibold uppercase tracking-wider text-white transition-transform hover:scale-105 dark:bg-gold-400 dark:text-midnight-900"
        >
          {t(dict.playAgain, locale)}
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in rounded-2xl border border-gold-500/20 bg-white/50 p-4 shadow-card dark:bg-midnight-800/50 sm:p-6 md:p-8">
      <div className="flex items-center justify-between text-xs uppercase tracking-widest opacity-60 sm:text-sm">
        <span>
          {t(dict.question, locale)} {current + 1} {t(dict.of, locale)} {round.length}
        </span>
        <span>
          {score} ✓
        </span>
      </div>
      {/* Progress bar */}
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-gold-500/15">
        <div
          className="h-full bg-gold-500 transition-all duration-500"
          style={{ width: `${((current + (answered ? 1 : 0)) / round.length) * 100}%` }}
        />
      </div>
      <h3 className="mt-5 font-display text-lg sm:mt-6 sm:text-xl md:text-2xl">{question.prompt}</h3>
      <div className="mt-6 grid gap-3">
        {question.options.map((option, i) => {
          const isCorrect = i === question.correctIndex;
          const isPicked = i === selected;
          let style = 'border-gold-500/25 hover:border-gold-500 hover:bg-gold-500/5';
          if (answered && isCorrect) style = 'border-green-600 bg-green-600/10';
          else if (answered && isPicked) style = 'border-red-500 bg-red-500/10';
          else if (answered) style = 'border-gold-500/15 opacity-50';
          return (
            <button
              key={option}
              type="button"
              disabled={answered}
              onClick={() => answer(i)}
              className={`rounded-xl border px-3 py-2.5 text-left text-sm transition-all sm:px-5 sm:py-3 sm:text-base ${style}`}
            >
              {option}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className="animate-fade-up mt-6 rounded-xl bg-gold-500/10 p-4">
          <p className="font-semibold">
            {selected === question.correctIndex ? t(dict.correct, locale) : t(dict.incorrect, locale)}
          </p>
          <p className="mt-1 text-sm opacity-80">{question.explanation}</p>
          <button
            type="button"
            onClick={next}
            className="mt-4 rounded-full bg-gold-500 px-6 py-2 text-sm font-semibold uppercase tracking-wider text-white dark:bg-gold-400 dark:text-midnight-900"
          >
            {isLast ? t(dict.seeResults, locale) : t(dict.nextQuestion, locale)}
          </button>
        </div>
      )}
    </div>
  );
}
