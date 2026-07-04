'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { dict } from '@/data/dictionary';
import { t, type Locale } from '@/lib/i18n';
import { LocaleSwitcher } from './LocaleSwitcher';
import { ThemeToggle } from './ThemeToggle';

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? `/${locale}`;
  // The home dashboard and the influence map skip the secondary nav row —
  // both are immersive full-screen views; the row stays on the index/detail
  // pages where it is the primary way to move between sections on mobile.
  const showSecondaryNav = pathname !== `/${locale}` && pathname !== `/${locale}/graph`;

  const nav = [
    { href: `/${locale}/schools`, label: t(dict.schools, locale) },
    { href: `/${locale}/philosophers`, label: t(dict.philosophers, locale) },
    { href: `/${locale}/graph`, label: t(dict.influenceMapNav, locale) },
    { href: `/${locale}/quiz`, label: t(dict.quizzes, locale) },
  ];

  return (
    <header
      className="sticky top-0 z-40 border-b border-gold-500/20 bg-parchment-50/80 backdrop-blur-md dark:bg-midnight-900/80"
      // Keeps the installed PWA's status bar from overlapping the menu.
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-4">
        <Link href={`/${locale}`} className="flex min-w-0 items-baseline gap-1.5 sm:gap-2">
          <span className="shrink-0 font-display text-xl tracking-wide text-gold-600 dark:text-gold-300 sm:text-2xl">
            Φ
          </span>
          {/* Always visible, title case — same wordmark on every page. */}
          <span className="truncate font-display text-lg sm:text-xl">Philosophia</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm uppercase tracking-wider md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-gold-600 dark:hover:text-gold-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <LocaleSwitcher locale={locale} />
          <ThemeToggle locale={locale} />
        </div>
      </div>
      {/* Mobile nav — compact row with shorter labels */}
      {showSecondaryNav && (
        <nav className="flex items-center justify-around border-t border-gold-500/10 px-2 py-2 text-[10px] uppercase tracking-wider md:hidden">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="px-2 py-1 hover:text-gold-600">
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
