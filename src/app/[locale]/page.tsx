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
    <div className="space-y-16 sm:space-y-24">
      {/* Hero */}
      <section className="grid grid-cols-1 items-center gap-8 pt-8 sm:pt-12 md:grid-cols-2 md:gap-10">
        <div className="animate-fade-up space-y-5">
          <p className="text-xs uppercase tracking-[0.35em] text-gold-600 dark:text-gold-300">
            {t(dict.tagline, locale)}
          </p>
          <h1 className="font-display text-3xl leading-tight sm:text-4xl md:text-6xl">
            {t(dict.heroTitle, locale)}
          </h1>
          <p className="max-w-xl text-base opacity-80 sm:text-lg">{t(dict.heroSubtitle, locale)}</p>
          <div className="flex flex-wrap gap-3 pt-2 sm:gap-4">
            <Link
              href={`/${locale}/schools`}
              className="rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-white transition-transform hover:scale-105 dark:bg-gold-400 dark:text-midnight-900 sm:px-7 sm:py-3 sm:text-base"
            >
              {t(dict.exploreSchools, locale)}
            </Link>
            <Link
              href={`/${locale}/philosophers`}
              className="rounded-full border border-gold-500/50 px-5 py-2.5 text-sm font-semibold uppercase tracking-wider transition-colors hover:bg-gold-500/10 sm:px-7 sm:py-3 sm:text-base"
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
      <section className="space-y-8 sm:space-y-10">
        <SectionHeading>{t(dict.schools, locale)}</SectionHeading>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
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
      <section className="space-y-8 sm:space-y-10">
        <SectionHeading>{t(dict.timeline, locale)}</SectionHeading>
        <p className="text-center opacity-70">{t(dict.timelineSubtitle, locale)}</p>
        <ol className="relative space-y-6 border-l-2 border-gold-500/30 pl-5 sm:space-y-8 sm:pl-8">
          {philosophers.map((p) => (
            <li key={p.slug} className="relative">
              <span className="absolute -left-[29px] top-1.5 h-3 w-3 rounded-full border-2 border-gold-500 bg-parchment-50 dark:bg-midnight-900 sm:-left-[39px] sm:h-3.5 sm:w-3.5" />
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
