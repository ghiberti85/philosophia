import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionHeading } from '@/components/SectionHeading';
import { dict } from '@/data/dictionary';
import { philosophers } from '@/data/philosophers';
import { getQuestionsFor } from '@/data/quizzes';
import { t, type Locale } from '@/lib/i18n';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return { title: t(dict.quizzes, params.locale) };
}

export default function QuizIndexPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;

  return (
    <div className="space-y-12 pt-12">
      <SectionHeading>{t(dict.quizzes, locale)}</SectionHeading>
      <p className="text-center opacity-70">{t(dict.chooseThinker, locale)}</p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {philosophers.map((p, i) => {
          const poolSize = getQuestionsFor(p.slug).length;
          return (
            <Link
              key={p.slug}
              href={`/${locale}/quiz/${p.slug}`}
              className="group animate-fade-up rounded-2xl border border-gold-500/20 bg-white/50 p-6 text-center shadow-card transition-all hover:-translate-y-1 hover:shadow-plinth dark:bg-midnight-800/50"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <span
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-full font-display text-2xl text-white"
                style={{ backgroundColor: p.bust.pedestal }}
              >
                ?
              </span>
              <h3 className="mt-4 font-display text-2xl group-hover:text-gold-600 dark:group-hover:text-gold-300">
                {p.name}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-widest opacity-60">
                {poolSize} {t(dict.questionsInPool, locale)}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
