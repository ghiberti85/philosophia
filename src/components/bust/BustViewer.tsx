'use client';

import dynamic from 'next/dynamic';
import type { BustConfig } from '@/data/types';

/**
 * Client wrapper that loads the WebGL canvas only in the browser.
 * Three.js cannot run during SSR, and skipping it server-side also keeps
 * the initial HTML payload small.
 */
const PhilosopherBust = dynamic(() => import('./PhilosopherBust'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <span className="animate-pulse font-display text-4xl text-gold-500/60">Φ</span>
    </div>
  ),
});

export function BustViewer({ config, label, hint }: { config: BustConfig; label: string; hint: string }) {
  return (
    <div className="bust-stage relative h-[280px] w-full overflow-hidden rounded-2xl border border-gold-500/20 sm:h-[360px] md:h-[460px] lg:h-[520px]">
      <PhilosopherBust config={config} label={label} />
      <p className="pointer-events-none absolute bottom-3 left-0 right-0 text-center text-xs uppercase tracking-widest opacity-60">
        {hint}
      </p>
    </div>
  );
}
