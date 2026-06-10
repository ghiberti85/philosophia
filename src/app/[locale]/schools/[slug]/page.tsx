import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { IsometricScene } from '@/components/IsometricScene';
import { QuizModal } from '@/components/QuizModal';
import { dict } from '@/data/dictionary';
import type { Philosopher } from '@/data/types';
import { getPhilosopher } from '@/data/philosophers';
import { getQuestionsFor } from '@/data/quizzes';
import { getSchool, schools } from '@/data/schools';
import { t, type Locale } from '@/lib/i18n';

interface Props {
  params: { locale: Locale; slug: string };
}

export function generateStaticParams() {
  return schools.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const school = getSchool(params.slug);
  return { title: school ? t(school.name, params.locale) : undefined };
}

/**
 * Compact single-section school page: a sticky identity panel on the left
 * (scene, period, tagline, navigation) and the full content on the right
 * (description, core ideas, thinkers with bio links and quiz popups).
 */
export default function SchoolPage({ params }: Props) {
  const { locale, slug } = params;
  const school = getSchool(slug);
  if (!school) notFound();

  const thinkers: Philosopher[] = school.philosopherSlugs
    .map(getPhilosopher)
    .filter((p): p is Philosopher => p !== undefined);

  return (
    <div className="grid grid-cols-1 gap-8 pt-6 sm:pt-10 lg:grid-cols-[380px,1fr] lg:gap-12">
      {/* Sticky identity panel */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-2xl border border-gold-500/25 bg-white/60 p-5 shadow-card dark:bg-midnight-800/60">
          <Link
            href={`/${locale}/schools`}
            className="text-[10px] uppercase tracking-[0.25em] opacity-60 transition-opacity hover:opacity-100"
          >
            &larr; {t(dict.schools, locale)}
          </Link>
          <div className="-mx-2 mt-1">
            <IsometricScene scene={school.scene} accent={school.accent} />
          </div>
          <p className="text-center text-[10px] uppercase tracking-[0.3em] text-gold-600 dark:text-gold-300">
            {t(school.period, locale)}
          </p>
          <h1 className="mt-1 text-center font-display text-2xl leading-tight sm:text-3xl">
            {t(school.name, locale)}
          </h1>
          <p className="mt-2 text-center text-sm italic opacity-75">
            &ldquo;{t(school.tagline, locale)}&rdquo;
          </p>
          {/* Thinker quick-nav */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 border-t border-gold-500/20 pt-4">
            {thinkers.map((p) => (
              <a
                key={p.slug}
                href={`#${p.slug}`}
                className="rounded-full border border-gold-500/40 px-3 py-1 text-[11px] uppercase tracking-wider transition-colors hover:bg-gold-500/10"
              >
                {p.name}
              </a>
            ))}
          </div>
        </div>
      </aside>

      {/* Content column */}
      <div className="space-y-10">
        {/* About */}
        <section>
          <h2 className="font-display text-xl text-gold-600 dark:text-gold-300">
            {t(dict.about, locale)}
          </h2>
          <p className="mt-3 leading-relaxed opacity-90">{t(school.description, locale)}</p>
        </section>

        {/* Core ideas */}
        <section>
          <h2 className="font-display text-xl text-gold-600 dark:text-gold-300">
            {t(dict.coreIdeas, locale)}
          </h2>
          <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {t(school.coreIdeas, locale).map((idea) => (
              <li
                key={idea}
                className="rounded-xl border-l-4 bg-white/50 p-4 text-sm shadow-card dark:bg-midnight-800/50"
                style={{ borderLeftColor: school.accent }}
              >
                {idea}
              </li>
            ))}
          </ul>
        </section>

        {/* Key thinkers with bio link + quiz popup */}
        <section>
          <h2 className="font-display text-xl text-gold-600 dark:text-gold-300">
            {t(dict.keyThinkers, locale)}
          </h2>
          <div className="mt-3 space-y-4">
            {thinkers.map((p) => (
              <article
                id={p.slug}
                key={p.slug}
                className="scroll-mt-32 rounded-2xl border border-gold-500/20 bg-white/50 p-5 shadow-card dark:bg-midnight-800/50"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 font-display text-xl"
                      style={{
                        backgroundColor: p.bust.marble,
                        borderColor: p.bust.pedestal,
                        color: p.bust.pedestal,
                      }}
                    >
                      {p.name.charAt(0)}
                    </span>
                    <div>
                      <h3 className="font-display text-2xl leading-none">{p.name}</h3>
                      <p className="mt-1 text-[11px] uppercase tracking-widest opacity-60">
                        {t(p.years, locale)} · {t(p.epithet, locale)}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed opacity-80">
                  {t(p.biography, locale)[0]}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/${locale}/philosophers/${p.slug}`}
                    className="rounded-full bg-gold-500 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-transform hover:scale-105 dark:bg-gold-400 dark:text-midnight-900"
                  >
                    {t(dict.readBio, locale)} &rarr;
                  </Link>
                  <QuizModal
                    questions={getQuestionsFor(p.slug)}
                    locale={locale}
                    philosopherName={p.name}
                    storageKey={`philosophia:best:${p.slug}`}
                    variant="outline"
                  />
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
