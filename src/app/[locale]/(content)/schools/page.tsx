import type { Metadata } from 'next';
import Link from 'next/link';
import { IsometricScene } from '@/components/IsometricScene';
import { SectionHeading } from '@/components/SectionHeading';
import { dict } from '@/data/dictionary';
import { getPhilosopher } from '@/data/philosophers';
import { schools } from '@/data/schools';
import { t, type Locale } from '@/lib/i18n';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return { title: t(dict.schools, params.locale) };
}

export default function SchoolsPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;

  return (
    <div className="space-y-8 pt-8 sm:space-y-12 sm:pt-12">
      <SectionHeading as="h1">{t(dict.schools, locale)}</SectionHeading>
      <div className="space-y-5 sm:space-y-8">
        {schools.map((school, i) => (
          <Link
            key={school.slug}
            href={`/${locale}/schools/${school.slug}`}
            className={`group grid animate-fade-up grid-cols-1 items-center gap-5 rounded-2xl border border-gold-500/20 bg-white/50 p-4 shadow-card transition-all hover:-translate-y-1 hover:shadow-plinth dark:bg-midnight-800/50 sm:p-6 md:grid-cols-[280px,1fr] ${
              i % 2 ? 'md:grid-cols-[1fr,280px]' : ''
            }`}
            style={{ animationDelay: `${i * 90}ms` }}
          >
            <div
              className={`transition-transform duration-500 group-hover:scale-105 ${i % 2 ? 'md:order-2' : ''}`}
            >
              <IsometricScene scene={school.scene} accent={school.accent} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest opacity-60">
                {t(school.period, locale)}
              </p>
              <h2 className="mt-1 font-display text-2xl sm:text-3xl">{t(school.name, locale)}</h2>
              <p className="mt-1 italic text-gold-600 dark:text-gold-300">
                “{t(school.tagline, locale)}”
              </p>
              <p className="mt-3 line-clamp-3 opacity-80">{t(school.description, locale)}</p>
              <p className="mt-3 text-sm uppercase tracking-widest opacity-60">
                {t(dict.keyThinkers, locale)}:{' '}
                {school.philosopherSlugs
                  .map((slug) => getPhilosopher(slug)?.name)
                  .filter(Boolean)
                  .join(' · ')}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
