import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { QuizEngine } from '@/components/QuizEngine';
import { dict } from '@/data/dictionary';
import { getPhilosopher, philosophers } from '@/data/philosophers';
import { getQuestionsFor } from '@/data/quizzes';
import { t, type Locale } from '@/lib/i18n';

interface Props {
  params: { locale: Locale; slug: string };
}

export function generateStaticParams() {
  return philosophers.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const philosopher = getPhilosopher(params.slug);
  return { title: philosopher ? `Quiz — ${philosopher.name}` : undefined };
}

export default function QuizPage({ params }: Props) {
  const { locale, slug } = params;
  const philosopher = getPhilosopher(slug);
  const questions = getQuestionsFor(slug);
  if (!philosopher || questions.length === 0) notFound();

  return (
    <div className="mx-auto max-w-2xl space-y-8 pt-12">
      <Link
        href={`/${locale}/quiz`}
        className="inline-block text-xs uppercase tracking-widest opacity-60 hover:opacity-100"
      >
        ← {t(dict.backTo, locale)} {t(dict.quizzes, locale)}
      </Link>
      <QuizEngine
        questions={questions}
        locale={locale}
        philosopherName={philosopher.name}
        storageKey={`philosophia:best:${slug}`}
      />
      <p className="text-center text-sm opacity-60">
        <Link
          href={`/${locale}/philosophers/${slug}`}
          className="underline decoration-gold-500/50 underline-offset-4 hover:text-gold-600"
        >
          {philosopher.name} →
        </Link>
      </p>
    </div>
  );
}
