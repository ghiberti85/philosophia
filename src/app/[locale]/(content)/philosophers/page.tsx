import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionHeading } from '@/components/SectionHeading';
import { dict } from '@/data/dictionary';
import { philosophers } from '@/data/philosophers';
import { getSchool } from '@/data/schools';
import { t, type Locale } from '@/lib/i18n';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return { title: t(dict.philosophers, params.locale) };
}

export default function PhilosophersPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;

  return (
    <div className="space-y-8 pt-8 sm:space-y-12 sm:pt-12">
      <SectionHeading as="h1">{t(dict.philosophers, locale)}</SectionHeading>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {philosophers.map((p, i) => {
          const school = getSchool(p.schoolSlugs[0]);
          return (
            <Link
              key={p.slug}
              href={`/${locale}/philosophers/${p.slug}`}
              className="group animate-fade-up rounded-2xl border border-gold-500/20 bg-white/50 p-4 shadow-card transition-all hover:-translate-y-1 hover:shadow-plinth dark:bg-midnight-800/50 sm:p-6"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              {/* Marble swatch as a portrait placeholder, tinted per philosopher */}
              <div
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 shadow-inner sm:h-24 sm:w-24"
                style={{ backgroundColor: p.bust.marble, borderColor: p.bust.pedestal }}
              >
                <span
                  className="font-display text-2xl sm:text-4xl"
                  style={{ color: p.bust.pedestal }}
                >
                  {t(p.name, locale).charAt(0)}
                </span>
              </div>
              <h3 className="mt-3 text-center font-display text-lg group-hover:text-gold-600 dark:group-hover:text-gold-300 sm:mt-4 sm:text-2xl">
                {t(p.name, locale)}
              </h3>
              <p className="text-center text-xs uppercase tracking-widest opacity-60">
                {t(p.years, locale)}
              </p>
              <p className="mt-2 text-center text-sm italic opacity-80">{t(p.epithet, locale)}</p>
              {school && (
                <p className="mt-3 text-center text-xs uppercase tracking-widest text-gold-600 dark:text-gold-300">
                  {t(school.name, locale)}
                </p>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
