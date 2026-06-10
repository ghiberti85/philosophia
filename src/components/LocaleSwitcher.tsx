'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LOCALES, type Locale } from '@/lib/i18n';

/** Swaps the locale segment of the current path, preserving the rest of the URL. */
export function switchLocalePath(pathname: string, target: Locale): string {
  const segments = pathname.split('/');
  // pathname always starts with '/', so segments[1] is the locale.
  segments[1] = target;
  return segments.join('/') || `/${target}`;
}

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? `/${locale}`;

  return (
    <div className="flex items-center gap-1 rounded-full border border-gold-500/40 p-1 text-xs font-semibold uppercase tracking-wider">
      {LOCALES.map((l) => (
        <Link
          key={l}
          href={switchLocalePath(pathname, l)}
          aria-current={l === locale ? 'true' : undefined}
          className={`rounded-full px-2.5 py-1 transition-colors ${
            l === locale
              ? 'bg-gold-500 text-white dark:bg-gold-400 dark:text-midnight-900'
              : 'hover:bg-gold-500/10'
          }`}
        >
          {l === 'pt' ? 'PT' : 'EN'}
        </Link>
      ))}
    </div>
  );
}
