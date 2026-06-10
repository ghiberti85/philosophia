import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BustViewer } from '@/components/bust/BustViewer';
import { SectionHeading } from '@/components/SectionHeading';
import { dict } from '@/data/dictionary';
import { getPhilosopher, philosophers } from '@/data/philosophers';
import { getSchool } from '@/data/schools';
import { t, type Locale } from '@/lib/i18n';

interface Props {
  params: { locale: Locale; slug: string };
}

export function generateStaticParams() {
  return philosophers.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const philosopher = getPhilosopher(params.slug);
  return { title: philosopher?.name };
}

export default function PhilosopherPage({ params }: Props) {
  const { locale, slug } = params;
  const philosopher = getPhilosopher(slug);
  if (!philosopher) notFound();

  const school = getSchool(philosopher.schoolSlugs[0]);

  return (
    <div className="space-y-12 pt-8 sm:space-y-16 sm:pt-12">
      {/* Hero: 3D bust + identity */}
      <section className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-10">
        <div className="animate-fade-in md:order-2">
          <BustViewer
            config={philosopher.bust}
            label={philosopher.name}
            hint={t(dict.dragToRotate, locale)}
          />
        </div>
        <div className="animate-fade-up space-y-4">
          <Link
            href={`/${locale}/philosophers`}
            className="text-xs uppercase tracking-widest opacity-60 hover:opacity-100"
          >
            ← {t(dict.backTo, locale)} {t(dict.philosophers, locale)}
          </Link>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl">{philosopher.name}</h1>
          <p className="text-lg italic text-gold-600 dark:text-gold-300 sm:text-xl">
            {t(philosopher.epithet, locale)}
          </p>
          <dl className="space-y-1 text-sm uppercase tracking-widest opacity-70">
            <div>
              <dt className="inline">{t(philosopher.years, locale)}</dt>
            </div>
            <div>
              <dt className="inline">{t(dict.born, locale)}: </dt>
              <dd className="inline">{t(philosopher.birthplace, locale)}</dd>
            </div>
            {school && (
              <div>
                <dt className="inline">{t(dict.school, locale)}: </dt>
                <dd className="inline">
                  <Link
                    href={`/${locale}/schools/${school.slug}`}
                    className="underline decoration-gold-500/50 underline-offset-4 hover:text-gold-600"
                  >
                    {t(school.name, locale)}
                  </Link>
                </dd>
              </div>
            )}
          </dl>
          <div className="flex flex-wrap gap-2 pt-2">
            {t(philosopher.traits, locale).map((trait) => (
              <span
                key={trait}
                className="rounded-full border border-gold-500/40 px-3 py-1 text-xs uppercase tracking-wider"
              >
                {trait}
              </span>
            ))}
          </div>
          <Link
            href={`/${locale}/quiz/${philosopher.slug}`}
            className="mt-4 inline-block rounded-full bg-gold-500 px-7 py-3 font-semibold uppercase tracking-wider text-white transition-transform hover:scale-105 dark:bg-gold-400 dark:text-midnight-900"
          >
            {t(dict.takeQuiz, locale)} →
          </Link>
        </div>
      </section>

      {/* Biography */}
      <section className="space-y-8">
        <SectionHeading>{t(dict.biography, locale)}</SectionHeading>
        <div className="mx-auto max-w-3xl space-y-5 text-lg leading-relaxed opacity-90">
          {t(philosopher.biography, locale).map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* Contributions */}
      <section className="space-y-8">
        <SectionHeading>{t(dict.contributions, locale)}</SectionHeading>
        <ul className="mx-auto grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {t(philosopher.contributions, locale).map((item) => (
            <li
              key={item}
              className="rounded-xl border border-gold-500/20 bg-white/50 p-4 shadow-card dark:bg-midnight-800/50 sm:p-5"
            >
              <span className="mr-2 text-gold-500">✦</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Quotes */}
      <section className="space-y-8">
        <SectionHeading>{t(dict.notableQuotes, locale)}</SectionHeading>
        <div className="mx-auto max-w-3xl space-y-8">
          {philosopher.quotes.map((quote) => (
            <figure key={t(quote.text, locale)} className="text-center">
              <blockquote className="font-display text-lg italic leading-relaxed sm:text-xl md:text-2xl">
                “{t(quote.text, locale)}”
              </blockquote>
              {quote.source && (
                <figcaption className="mt-2 text-xs uppercase tracking-widest opacity-60">
                  — {t(quote.source, locale)}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </section>

      {/* Facts */}
      <section className="space-y-8">
        <SectionHeading>{t(dict.remarkableFacts, locale)}</SectionHeading>
        <ul className="mx-auto max-w-3xl space-y-4">
          {t(philosopher.facts, locale).map((fact) => (
            <li
              key={fact}
              className="rounded-xl border-l-4 border-gold-500 bg-white/50 p-5 shadow-card dark:bg-midnight-800/50"
            >
              {fact}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
