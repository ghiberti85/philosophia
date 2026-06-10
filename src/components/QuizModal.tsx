'use client';

import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { QuizQuestion } from '@/data/types';
import { dict } from '@/data/dictionary';
import { t, type Locale } from '@/lib/i18n';
import { QuizEngine } from './QuizEngine';

interface QuizModalProps {
  questions: QuizQuestion[];
  locale: Locale;
  philosopherName: string;
  /** localStorage key for the best score (shared with the /quiz pages). */
  storageKey: string;
  /** Visual style of the trigger button. */
  variant?: 'primary' | 'outline';
  /** Optional custom trigger label; defaults to "Take the quiz". */
  triggerLabel?: string;
}

/**
 * Renders a trigger button that opens the quiz in a modal overlay,
 * so visitors can play without leaving the page they are reading.
 * Closes on backdrop click and Escape; locks body scroll while open.
 */
export function QuizModal({
  questions,
  locale,
  philosopherName,
  storageKey,
  variant = 'primary',
  triggerLabel,
}: QuizModalProps) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close]);

  const triggerClass =
    variant === 'primary'
      ? 'rounded-full bg-gold-500 px-6 py-2.5 text-sm font-semibold uppercase tracking-wider text-white transition-transform hover:scale-105 dark:bg-gold-400 dark:text-midnight-900'
      : 'rounded-full border border-gold-500/50 px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-gold-500/10';

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={triggerClass}>
        {triggerLabel ?? t(dict.takeQuiz, locale)}
      </button>
      {open &&
        createPortal(
          <div
            className="quiz-overlay fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={`${t(dict.quizFor, locale)} ${philosopherName}`}
            onClick={close}
          >
            <div
              className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-parchment-50 p-1 shadow-plinth dark:bg-midnight-900"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-2xl bg-parchment-50/95 px-4 py-2 backdrop-blur dark:bg-midnight-900/95">
                <p className="text-xs uppercase tracking-widest opacity-60">
                  {t(dict.quizFor, locale)} {philosopherName}
                </p>
                <button
                  type="button"
                  onClick={close}
                  aria-label={t(dict.close, locale)}
                  className="rounded-full border border-gold-500/40 px-3 py-1 text-xs uppercase tracking-wider transition-colors hover:bg-gold-500/10"
                >
                  ✕ {t(dict.close, locale)}
                </button>
              </div>
              <div className="p-2 sm:p-3">
                <QuizEngine
                  questions={questions}
                  locale={locale}
                  philosopherName={philosopherName}
                  storageKey={storageKey}
                />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
