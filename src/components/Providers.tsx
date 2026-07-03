'use client';

import { MotionConfig } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';
import { PWAUpdateListener } from './PWAUpdateListener';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <PWAUpdateListener />
        {children}
      </ThemeProvider>
    </MotionConfig>
  );
}
