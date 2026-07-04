'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Icon } from '@/components/dashboard/ui';
import { dict } from '@/data/dictionary';
import { t, type Locale } from '@/lib/i18n';

export function ThemeToggle({ locale }: { locale: Locale }) {
  const { resolvedTheme, setTheme } = useTheme();
  // next-themes only knows the real theme after hydration.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === 'dark';
  const label = t(isDark ? dict.switchToLight : dict.switchToDark, locale);

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="rounded border border-gold-500/40 p-2 leading-none transition-colors hover:bg-gold-500/10"
    >
      {/* Same SVG icon set as the dashboard topbar — unicode ☀/☾ render as
          colored emoji on iOS, so text glyphs are off-limits here. */}
      <Icon name={isDark ? 'sun' : 'moon'} />
    </button>
  );
}
