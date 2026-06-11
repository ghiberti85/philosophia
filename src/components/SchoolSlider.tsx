'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IsometricScene } from '@/components/IsometricScene';
import { QuizModal } from '@/components/QuizModal';
import { TiltCard } from '@/components/TiltCard';
import { dict } from '@/data/dictionary';
import type { QuizQuestion, School } from '@/data/types';
import { t, type Locale } from '@/lib/i18n';

/**
 * One-page "game dashboard" experience: each school is a full-viewport HUD
 * slide — city diorama in the middle, lore panel on the left, thinkers on
 * the right — and the visitor moves between schools like levels in a game.
 * Desktop fits a single section (no page scroll); on small screens each
 * slide scrolls internally.
 */

export interface ThinkerVM {
  slug: string;
  name: string;
  epithet: string;
  years: string;
  figureImage?: string;
  marble: string;
  pedestal: string;
  questions: QuizQuestion[];
}

export interface SchoolVM {
  slug: string;
  name: string;
  period: string;
  tagline: string;
  description: string;
  coreIdeas: string[];
  accent: string;
  scene: School['scene'];
  cityImage?: string;
  thinkers: ThinkerVM[];
}

function Panel({
  title,
  accent,
  children,
  className = '',
}: {
  title: string;
  accent: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <aside
      className={`flex min-h-0 flex-col rounded-2xl border bg-white/60 shadow-card backdrop-blur-sm dark:bg-midnight-800/60 ${className}`}
      style={{ borderColor: `${accent}40` }}
    >
      <h2
        className="shrink-0 rounded-t-2xl border-b px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em]"
        style={{ borderColor: `${accent}30`, color: accent }}
      >
        {title}
      </h2>
      <div className="scrollbar-thin min-h-0 flex-1 overflow-y-auto p-4">{children}</div>
    </aside>
  );
}

function ThinkerCard({ thinker, accent, locale }: { thinker: ThinkerVM; accent: string; locale: Locale }) {
  return (
    <article
      className="rounded-xl border bg-white/50 p-3 dark:bg-midnight-900/40"
      style={{ borderColor: `${accent}30` }}
    >
      <div className="flex items-center gap-3">
        {thinker.figureImage ? (
          <TiltCard max={12} className="shrink-0 rounded-lg">
            <Image
              src={thinker.figureImage}
              alt={thinker.name}
              width={88}
              height={88}
              className="h-20 w-20 rounded-lg object-cover shadow-card sm:h-22 sm:w-22"
            />
          </TiltCard>
        ) : (
          <span
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 font-display text-xl"
            style={{ backgroundColor: thinker.marble, borderColor: thinker.pedestal, color: thinker.pedestal }}
          >
            {thinker.name.charAt(0)}
          </span>
        )}
        <div className="min-w-0">
          <h3 className="truncate font-display text-lg leading-tight">{thinker.name}</h3>
          <p className="text-[10px] uppercase tracking-widest opacity-60">{thinker.years}</p>
          <p className="truncate text-xs italic opacity-75">{thinker.epithet}</p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Link
          href={`/${locale}/philosophers/${thinker.slug}`}
          className="rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white transition-transform hover:scale-105"
          style={{ backgroundColor: accent }}
        >
          {t(dict.readBio, locale)}
        </Link>
        <QuizModal
          questions={thinker.questions}
          locale={locale}
          philosopherName={thinker.name}
          storageKey={`philosophia:best:${thinker.slug}`}
          variant="outline"
        />
      </div>
    </article>
  );
}

function Slide({ school, locale, active }: { school: SchoolVM; locale: Locale; active: boolean }) {
  return (
    <div className="flex h-full flex-col gap-3 overflow-y-auto p-3 sm:p-4 lg:gap-4 lg:overflow-hidden lg:p-5">
      {/* HUD title */}
      <header className="shrink-0 text-center">
        <p className="text-[10px] uppercase tracking-[0.35em]" style={{ color: school.accent }}>
          {school.period}
        </p>
        <h1 className="font-display text-2xl leading-tight sm:text-3xl lg:text-4xl">{school.name}</h1>
        <p className="mt-0.5 text-sm italic opacity-75">&ldquo;{school.tagline}&rdquo;</p>
      </header>

      {/* HUD body */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-[minmax(230px,290px),1fr,minmax(250px,320px)] lg:gap-5">
        {/* Center: the diorama */}
        <div className="order-1 flex min-h-0 items-center justify-center lg:order-2">
          <TiltCard className="w-full max-w-[340px] rounded-3xl sm:max-w-[420px] lg:max-w-none lg:px-2">
            {school.cityImage ? (
              <Image
                src={school.cityImage}
                alt={school.name}
                width={1024}
                height={1024}
                priority={active}
                className="mx-auto h-auto w-full rounded-3xl object-contain ring-1 ring-gold-500/30 drop-shadow-2xl lg:max-h-[58vh] lg:w-auto"
              />
            ) : (
              <div className="mx-auto w-full max-w-[480px]">
                <IsometricScene scene={school.scene} accent={school.accent} uid={`dash-${school.slug}`} />
              </div>
            )}
          </TiltCard>
        </div>

        {/* Left: lore */}
        <Panel title={t(dict.about, locale)} accent={school.accent} className="order-2 lg:order-1">
          <p className="text-sm leading-relaxed opacity-90">{school.description}</p>
          <h3
            className="mb-2 mt-4 text-[10px] font-semibold uppercase tracking-[0.25em]"
            style={{ color: school.accent }}
          >
            {t(dict.coreIdeas, locale)}
          </h3>
          <ul className="space-y-2">
            {school.coreIdeas.map((idea) => (
              <li
                key={idea}
                className="rounded-lg border-l-2 bg-white/50 p-2.5 text-xs leading-snug dark:bg-midnight-900/40"
                style={{ borderLeftColor: school.accent }}
              >
                {idea}
              </li>
            ))}
          </ul>
        </Panel>

        {/* Right: thinkers */}
        <Panel title={t(dict.keyThinkers, locale)} accent={school.accent} className="order-3">
          <div className="space-y-3">
            {school.thinkers.map((thinker) => (
              <ThinkerCard key={thinker.slug} thinker={thinker} accent={school.accent} locale={locale} />
            ))}
          </div>
        </Panel>
      </div>

      {/* HUD stats bar (desktop) */}
      <footer className="hidden shrink-0 items-center justify-center gap-8 text-[10px] uppercase tracking-[0.25em] opacity-60 lg:flex">
        <span>{school.period}</span>
        <span aria-hidden>·</span>
        <span>
          {school.thinkers.length}{' '}
          {t(school.thinkers.length === 1 ? dict.thinker : dict.thinkers, locale)}
        </span>
        <span aria-hidden>·</span>
        <span>
          {school.thinkers.reduce((n, p) => n + p.questions.length, 0)} {t(dict.questionsInPool, locale)}
        </span>
      </footer>
    </div>
  );
}

export function SchoolSlider({ schools, locale }: { schools: SchoolVM[]; locale: Locale }) {
  const [idx, setIdx] = useState(0);
  const touchX = useRef<number | null>(null);
  const count = schools.length;

  const go = useCallback((i: number) => setIdx(((i % count) + count) % count), [count]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(idx + 1);
      if (e.key === 'ArrowLeft') go(idx - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [idx, go]);

  return (
    <section
      aria-roledescription="carousel"
      className="relative h-[calc(100dvh-7.2rem)] md:h-[calc(100dvh-4.2rem)]"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 60) go(idx + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      {/* Slides */}
      {schools.map((school, i) => (
        <div
          key={school.slug}
          aria-hidden={i !== idx}
          className={`absolute inset-0 transition-all duration-500 ease-out ${
            i === idx
              ? 'pointer-events-auto translate-x-0 opacity-100'
              : `pointer-events-none opacity-0 ${i < idx ? '-translate-x-10' : 'translate-x-10'}`
          }`}
        >
          <Slide school={school} locale={locale} active={i === idx} />
        </div>
      ))}

      {/* Arrows */}
      <button
        type="button"
        aria-label={t(dict.prevSchool, locale)}
        onClick={() => go(idx - 1)}
        className="absolute left-1 top-[21%] z-10 -translate-y-1/2 rounded-full border border-gold-500/40 bg-parchment-50/80 px-3 py-2.5 text-lg backdrop-blur transition-all hover:scale-110 hover:bg-gold-500/20 dark:bg-midnight-900/80 sm:left-3 lg:top-1/2"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label={t(dict.nextSchool, locale)}
        onClick={() => go(idx + 1)}
        className="absolute right-1 top-[21%] z-10 -translate-y-1/2 rounded-full border border-gold-500/40 bg-parchment-50/80 px-3 py-2.5 text-lg backdrop-blur transition-all hover:scale-110 hover:bg-gold-500/20 dark:bg-midnight-900/80 sm:right-3 lg:top-1/2"
      >
        ›
      </button>

      {/* Dots */}
      <nav
        aria-label={t(dict.schools, locale)}
        className="absolute bottom-1.5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2"
      >
        {schools.map((school, i) => (
          <button
            key={school.slug}
            type="button"
            title={school.name}
            aria-label={school.name}
            aria-current={i === idx}
            onClick={() => go(i)}
            className={`rounded-full transition-all duration-300 ${
              i === idx ? 'h-2.5 w-7' : 'h-2.5 w-2.5 opacity-40 hover:opacity-80'
            }`}
            style={{ backgroundColor: school.accent }}
          />
        ))}
      </nav>
    </section>
  );
}
