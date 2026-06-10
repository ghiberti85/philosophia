import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { IsometricScene } from '@/components/IsometricScene';
import { SectionHeading } from '@/components/SectionHeading';
import { dict } from '@/data/dictionary';
import type { Philosopher } from '@/data/types';
import { getPhilosopher } from '@/data/philosophers';
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

export default function SchoolPage({ params }: Props) {
  const { locale, slug } = params;
  const school = getSchool(slug);
  if (!school) notFound();

  const thinkers: Philosopher[] = school.philosopherSlugs
    .map(getPhilosopher)
    .filter((p): p is Philosopher => p !== undefined);

  return (
    <div className="space-y-12 pt-8 sm:space-y-16 sm:pt-12">
      <section className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-10">
        <div className="animate-fade-up space-y-4">
          <Link
            href={`/${locale}/schools`}
            className="text-xs uppercase tracking-widest opacity-60 hover:opacity-100"
          >
            &larr; {t(dict.backTo, locale)} {t(dict.schools, locale)}
          </Link>
          <p className="text-xs uppercase tracking-[0.3em] text-gold-600 dark:text-gold-300">
            {t(school.period, locale)}
          </p>
          <h1 className="font-display text-2xl sm:text-4xl md:text-5xl">{t(school.name, locale)}</h1>
          <p className="text-lg italic opacity-80 sm:text-xl">&quot;{t(school.tagline, locale)}&quot;</p>
        </div>
        <div className="animate-fade-in">
          <IsometricScene scene={school.scene} accent={school.accent} />
        </div>
      </section>

      <section className="mx-auto max-w-3xl space-y-4 text-lg leading-relaxed opacity-90">
        <p>{t(school.description, locale)}</p>
      </section>

      <section className="space-y-8">
        <SectionHeading>{t(dict.coreIdeas, locale)}</SectionHeading>
        <ul className="mx-auto grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {t(school.coreIdeas, locale).map((idea) => (
            <li
              key={idea}
              className="rounded-xl border border-gold-500/20 bg-white/50 p-4 shadow-card dark:bg-midnight-800/50 sm:p-5"
            >
              <span className="mr-2 text-gold-500">&#10022;</span>
              {idea}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-8">
        <SectionHeading>{t(dict.keyThinkers, locale)}</SectionHeading>
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          {thinkers.map((p) => (
            <Link
              key={p.slug}
              href={`/${locale}/philosophers/${p.slug}`}
              className="group rounded-2xl border border-gold-500/20 bg-white/50 p-4 text-center shadow-card transition-all hover:-translate-y-1 hover:shadow-plinth dark:bg-midnight-800/50 sm:p-6"
            >
              <p className="font-display text-2xl group-hover:text-gold-600 dark:group-hover:text-gold-300">
                {p.name}
              </p>
              <p className="text-xs uppercase tracking-widest opacity-60">{t(p.years, locale)}</p>
              <p className="mt-2 text-sm italic opacity-80">{t(p.epithet, locale)}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
