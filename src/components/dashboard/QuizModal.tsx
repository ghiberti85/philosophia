'use client';

import { useCallback, useEffect, useState } from 'react';
import { ShareScoreButton } from '@/components/ShareScoreButton';
import { dict } from '@/data/dictionary';
import type { QuizQuestion } from '@/data/types';
import { t, type Locale } from '@/lib/i18n';
import { Icon, Modal, roman } from './ui';

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface RoundQuestion {
  id: string;
  prompt: string;
  explanation: string;
  options: { text: string; orig: number }[];
  correctIndex: number;
}

/** Build a 5-question round: draw from pool, shuffle options (options[0] is correct). */
function buildRound(pool: QuizQuestion[], locale: Locale): RoundQuestion[] {
  const picked = shuffle(pool).slice(0, Math.min(5, pool.length));
  return picked.map((q) => {
    const opts = t(q.options, locale);
    const order = shuffle(opts.map((text, i) => ({ text, orig: i })));
    return {
      id: q.id,
      prompt: t(q.prompt, locale),
      explanation: t(q.explanation, locale),
      options: order,
      correctIndex: order.findIndex((o) => o.orig === 0),
    };
  });
}

export function QuizModal({
  open,
  onClose,
  pool,
  title,
  scoreKey,
  locale,
}: {
  open: boolean;
  onClose: () => void;
  pool: QuizQuestion[];
  title: string;
  scoreKey: string;
  locale: Locale;
}) {
  const [round, setRound] = useState<RoundQuestion[]>([]);
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [best, setBest] = useState(0);

  const reset = useCallback(() => {
    setRound(buildRound(pool, locale));
    setIdx(0);
    setChosen(null);
    setScore(0);
    setDone(false);
  }, [pool, locale]);

  useEffect(() => {
    if (open) {
      reset();
      try {
        setBest(Number(localStorage.getItem(`philosophia.best.${scoreKey}`) || 0));
      } catch {
        /* private mode */
      }
    }
  }, [open, scoreKey, reset]);

  if (!open) return null;
  const total = round.length || 5;
  const q = round[idx];
  const answered = chosen != null;

  const pick = (i: number) => {
    if (chosen != null) return;
    setChosen(i);
    if (i === q.correctIndex) setScore((s) => s + 1);
  };

  const next = () => {
    if (idx + 1 < round.length) {
      setIdx(idx + 1);
      setChosen(null);
    } else {
      setDone(true);
      try {
        const prev = Number(localStorage.getItem(`philosophia.best.${scoreKey}`) || 0);
        if (score > prev) {
          localStorage.setItem(`philosophia.best.${scoreKey}`, String(score));
          setBest(score);
        }
      } catch {
        /* private mode */
      }
    }
  };

  const verdict = (s: number, tot: number) => {
    const r = s / tot;
    if (r === 1) return t(dict.scorePerfect, locale);
    if (r >= 0.6) return t(dict.scoreGood, locale);
    if (r >= 0.3) return t(dict.scoreOk, locale);
    return t(dict.scoreLow, locale);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      variant="modal--quiz"
      labelledby="quiz-title"
      closeLabel={t(dict.close, locale)}
    >
      <div className="quiz">
        <header>
          <div className="panel__head" style={{ margin: 0 }}>
            <span className="glyph" aria-hidden="true" style={{ color: 'var(--accent)' }}>
              ◈
            </span>
            <span className="mono" id="quiz-title">
              {t(dict.quizFor, locale)} · {title}
            </span>
            {!done && (
              <span className="count">
                {roman(idx + 1)} / {roman(total)}
              </span>
            )}
          </div>
        </header>

        {!done && q && (
          <>
            <div className="quiz__bar" aria-hidden="true">
              <span style={{ width: `${((idx + (answered ? 1 : 0)) / total) * 100}%` }} />
            </div>
            <h3 className="quiz__prompt">{q.prompt}</h3>
            <div className="quiz__opts" role="group">
              {q.options.map((o, i) => {
                let state = '';
                if (answered) {
                  if (i === q.correctIndex) state = 'correct';
                  else if (i === chosen) state = 'wrong';
                }
                return (
                  <button
                    key={i}
                    className="qopt"
                    data-state={state}
                    disabled={answered}
                    onClick={() => pick(i)}
                    data-autofocus={i === 0 ? '' : undefined}
                  >
                    <span className="qopt__key">
                      {answered && state === 'correct' ? (
                        <Icon name="check" size={15} />
                      ) : (
                        String.fromCharCode(65 + i)
                      )}
                    </span>
                    <span>{o.text}</span>
                  </button>
                );
              })}
            </div>
            {answered && (
              <div className="quiz__explain">
                <strong
                  style={{
                    color:
                      chosen === q.correctIndex
                        ? 'var(--color-state-success)'
                        : 'var(--color-state-error)',
                  }}
                >
                  {chosen === q.correctIndex ? t(dict.correct, locale) : t(dict.incorrect, locale)}
                </strong>{' '}
                {q.explanation}
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                className="btn-primary"
                disabled={!answered}
                onClick={next}
                style={{ opacity: answered ? 1 : 0.5 }}
              >
                {idx + 1 < total ? t(dict.nextQuestion, locale) : t(dict.seeResults, locale)}{' '}
                <Icon name="arrow" size={16} />
              </button>
            </div>
          </>
        )}

        {done && (
          <div className="quiz__result">
            <span className="mono">{t(dict.yourScore, locale)}</span>
            <div className="quiz__score">
              {score}
              <span style={{ fontSize: '2rem', opacity: 0.5 }}>/{total}</span>
            </div>
            <p className="quiz__verdict">{verdict(score, total)}</p>
            <span className="mono">
              {t(dict.bestScore, locale)}: {Math.max(best, score)} / {total}
            </span>
            <div
              style={{
                display: 'flex',
                gap: 10,
                marginTop: 6,
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <button className="btn-primary" onClick={reset}>
                <Icon name="refresh" size={16} /> {t(dict.playAgain, locale)}
              </button>
              <ShareScoreButton
                locale={locale}
                score={score}
                total={total}
                quizName={title}
                className="btn-ghost"
              />
              <button className="btn-ghost" onClick={onClose}>
                {t(dict.close, locale)}
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
