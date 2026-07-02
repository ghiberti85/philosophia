'use client';

import { useEffect, useRef, useState } from 'react';
import { dict } from '@/data/dictionary';
import { t, type Locale } from '@/lib/i18n';

/**
 * "Share score" button for quiz result screens. Uses the native share sheet
 * where available (mobile, most PWAs) and falls back to copying the message
 * to the clipboard on desktop browsers.
 */
export function ShareScoreButton({
  locale,
  score,
  total,
  quizName,
  className,
}: {
  locale: Locale;
  score: number;
  total: number;
  quizName: string;
  /** Styling comes from the caller so the button matches either quiz skin. */
  className: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  async function share() {
    const message = t(dict.shareScoreMessage, locale)
      .replace('{score}', `${score}/${total}`)
      .replace('{name}', quizName);
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({ text: message, url });
        return;
      }
      await navigator.clipboard.writeText(`${message} ${url}`);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      /* user dismissed the share sheet, or clipboard unavailable */
    }
  }

  return (
    <button type="button" onClick={share} className={className} aria-live="polite">
      {copied ? t(dict.shareCopied, locale) : `↗ ${t(dict.shareScore, locale)}`}
    </button>
  );
}
