import Link from 'next/link';
import { dict } from '@/data/dictionary';
import { t, type Locale } from '@/lib/i18n';
import { LocaleSwitcher } from './LocaleSwitcher';
import { ThemeToggle } from './ThemeToggle';

export function Header({ locale }: { locale: Locale }) {
  const nav = [
    { href: `/${locale}/schools`, label: t(dict.schools, locale) },
    { href: `/${locale}/philosophers`, label: t(dict.philosophers, locale) },
    { href: `/${locale}/quiz`, label: t(dict.quizzes, locale) },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-gold-500/20 bg-parchment-50/80 backdrop-blur-md dark:bg-midnight-900/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href={`/${locale}`} className="flex items-baseline gap-2">
          <span className="font-display text-2xl tracking-wide text-gold-600 dark:text-gold-300">
            Φ
          </span>
          <span className="font-display text-xl tracking-widest">PHILOSOPHIA</span>
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
        <div className="flex items-center gap-3">
          <LocaleSwitcher locale={locale} />
          <ThemeToggle locale={locale} />
        </div>
      </div>
      {/* Mobile nav */}
      <nav className="flex items-center justify-center gap-6 border-t border-gold-500/10 px-4 py-2 text-xs uppercase tracking-wider md:hidden">
        {nav.map((item) => (
          <Link key={item.href} href={item.href} className="hover:text-gold-600">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
