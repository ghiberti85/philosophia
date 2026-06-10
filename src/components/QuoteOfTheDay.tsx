'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { dict } from '@/data/dictionary';
import { t, type Locale } from '@/lib/i18n';
import { quoteOfTheDay } from '@/lib/quote-of-the-day';

/**
 * Client component so the quote is computed from the visitor's current date
 * (a statically-rendered server component would freeze it at build time).
 */
export function QuoteOfTheDay({ locale }: { locale: Locale }) {
  const [pick, setPick] = useState<ReturnType<typeof quoteOfTheDay> | null>(null);
  useEffect(() => setPick(quoteOfTheDay()), []);

  if (!pick) return <div className="h-40" aria-hidden />;

  const { quote, philosopher } = pick;
  return (
    <figure className="animate-fade-up mx-auto max-w-3xl text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-gold-600 dark:text-gold-300">
        {t(dict.quoteOfTheDay, locale)}
      </p>
      <blockquote className="mt-4 font-display text-2xl italic leading-relaxed md:text-3xl">
        “{t(quote.text, locale)}”
      </blockquote>
      <figcaption className="mt-4 text-sm uppercase tracking-widest opacity-70">
        —{' '}
        <Link href={`/${locale}/philosophers/${philosopher.slug}`} className="underline decoration-gold-500/50 underline-offset-4 hover:text-gold-600">
          {philosopher.name}
        </Link>
        {quote.source && <span>, {t(quote.source, locale)}</span>}
      </figcaption>
    </figure>
  );
}
