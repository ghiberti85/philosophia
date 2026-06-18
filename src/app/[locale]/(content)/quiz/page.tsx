import type { Metadata } from 'next';
import Link from 'next/link';
import { QuizModal } from '@/components/QuizModal';
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
    <div className="space-y-8 pt-8 sm:space-y-12 sm:pt-12">
      <SectionHeading>{t(dict.quizzes, locale)}</SectionHeading>
      <p className="text-center opacity-70">{t(dict.chooseThinker, locale)}</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {philosophers.map((p, i) => {
          const questions = getQuestionsFor(p.slug);
          return (
            <div
              key={p.slug}
              className="animate-fade-up flex flex-col items-center rounded-2xl border border-gold-500/20 bg-white/50 p-5 text-center shadow-card transition-all hover:-translate-y-1 hover:shadow-plinth dark:bg-midnight-800/50 sm:p-6"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <span
                className="flex h-14 w-14 items-center justify-center rounded-full font-display text-2xl text-white"
                style={{ backgroundColor: p.bust.pedestal }}
              >
                ?
              </span>
              <h3 className="mt-3 font-display text-xl sm:text-2xl">
                <Link
                  href={`/${locale}/philosophers/${p.slug}`}
                  className="hover:text-gold-600 dark:hover:text-gold-300"
                >
                  {t(p.name, locale)}
                </Link>
              </h3>
              <p className="mt-1 text-xs uppercase tracking-widest opacity-60">
                {questions.length} {t(dict.questionsInPool, locale)}
              </p>
              <div className="mt-4">
                <QuizModal
                  questions={questions}
                  locale={locale}
                  philosopherName={t(p.name, locale)}
                  storageKey={`philosophia:best:${p.slug}`}
                  triggerLabel={t(dict.startQuiz, locale)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
