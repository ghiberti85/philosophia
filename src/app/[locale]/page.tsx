import Link from 'next/link';
import { IsometricScene } from '@/components/IsometricScene';
import { QuoteOfTheDay } from '@/components/QuoteOfTheDay';
import { SectionHeading } from '@/components/SectionHeading';
import { dict } from '@/data/dictionary';
import { philosophers } from '@/data/philosophers';
import { schools } from '@/data/schools';
import { t, type Locale } from '@/lib/i18n';

export default function HomePage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;

  return (
    <div className="space-y-24">
      {/* Hero */}
      <section className="grid items-center gap-10 pt-12 md:grid-cols-2">
        <div className="animate-fade-up space-y-6">
          <p className="text-xs uppercase tracking-[0.35em] text-gold-600 dark:text-gold-300">
            {t(dict.tagline, locale)}
          </p>
          <h1 className="font-display text-4xl leading-tight md:text-6xl">
            {t(dict.heroTitle, locale)}
          </h1>
          <p className="max-w-xl text-lg opacity-80">{t(dict.heroSubtitle, locale)}</p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href={`/${locale}/schools`}
              className="rounded-full bg-gold-500 px-7 py-3 font-semibold uppercase tracking-wider text-white transition-transform hover:scale-105 dark:bg-gold-400 dark:text-midnight-900"
            >
              {t(dict.exploreSchools, locale)}
            </Link>
            <Link
              href={`/${locale}/philosophers`}
              className="rounded-full border border-gold-500/50 px-7 py-3 font-semibold uppercase tracking-wider transition-colors hover:bg-gold-500/10"
            >
              {t(dict.meetPhilosophers, locale)}
            </Link>
          </div>
        </div>
        <div className="animate-fade-in">
          <IsometricScene scene="academy" accent="#c2922f" />
        </div>
      </section>

      <QuoteOfTheDay locale={locale} />

      {/* Schools grid */}
      <section className="space-y-10">
        <SectionHeading>{t(dict.schools, locale)}</SectionHeading>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {schools.map((school, i) => (
            <Link
              key={school.slug}
              href={`/${locale}/schools/${school.slug}`}
              className="group animate-fade-up rounded-2xl border border-gold-500/20 bg-white/50 p-5 shadow-card transition-all hover:-translate-y-1 hover:shadow-plinth dark:bg-midnight-800/50"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="transition-transform duration-500 group-hover:scale-105">
                <IsometricScene scene={school.scene} accent={school.accent} />
              </div>
              <h3 className="mt-3 font-display text-xl">{t(school.name, locale)}</h3>
              <p className="text-xs uppercase tracking-widest opacity-60">{t(school.period, locale)}</p>
              <p className="mt-2 text-sm italic opacity-80">“{t(school.tagline, locale)}”</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="space-y-10">
        <SectionHeading>{t(dict.timeline, locale)}</SectionHeading>
        <p className="text-center opacity-70">{t(dict.timelineSubtitle, locale)}</p>
        <ol className="relative space-y-8 border-l-2 border-gold-500/30 pl-8">
          {philosophers.map((p) => (
            <li key={p.slug} className="relative">
              <span className="absolute -left-[39px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-gold-500 bg-parchment-50 dark:bg-midnight-900" />
              <Link href={`/${locale}/philosophers/${p.slug}`} className="group inline-block">
                <p className="text-xs uppercase tracking-widest text-gold-600 dark:text-gold-300">
                  {t(p.years, locale)}
                </p>
                <p className="font-display text-xl group-hover:underline group-hover:decoration-gold-500/60 group-hover:underline-offset-4">
                  {p.name}
                </p>
                <p className="text-sm italic opacity-70">{t(p.epithet, locale)}</p>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
