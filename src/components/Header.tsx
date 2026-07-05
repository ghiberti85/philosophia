import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { LocaleSwitcher } from './LocaleSwitcher';
import { ThemeToggle } from './ThemeToggle';

/**
 * Top bar shared by the two screens of the app: the home dashboard and the
 * influence map. No nav links — the dashboard hero already links to the
 * influence map, and the wordmark links back home, so the bar stays clean
 * on mobile.
 */
export function Header({ locale }: { locale: Locale }) {
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
        <div className="flex items-center gap-2 sm:gap-3">
          <LocaleSwitcher locale={locale} />
          <ThemeToggle locale={locale} />
        </div>
      </div>
    </header>
  );
}
