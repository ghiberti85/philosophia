'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { dict } from '@/data/dictionary';
import { t, type Locale } from '@/lib/i18n';

export function ThemeToggle({ locale }: { locale: Locale }) {
  const { resolvedTheme, setTheme } = useTheme();
  // next-themes only knows the real theme after hydration.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';
  const label = t(isDark ? dict.switchToLight : dict.switchToDark, locale);

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="rounded-full border border-gold-500/40 p-2 text-lg leading-none transition-colors hover:bg-gold-500/10"
    >
      {/* Render a stable placeholder until mounted to avoid hydration mismatch. */}
      <span aria-hidden>{mounted ? (isDark ? '☀' : '☾') : '◐'}</span>
    </button>
  );
}
