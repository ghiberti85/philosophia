'use client';

import dynamic from 'next/dynamic';
import type { BustConfig } from '@/data/types';
import { BustErrorBoundary } from './BustErrorBoundary';

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

export function BustViewer({
  config,
  label,
  years,
  hint,
}: {
  config: BustConfig;
  label: string;
  years: string;
  hint: string;
}) {
  return (
    <figure className="w-full">
      <div className="bust-stage relative h-[300px] w-full overflow-hidden rounded-t-2xl border border-b-0 border-gold-500/25 sm:h-[380px] md:h-[480px] lg:h-[540px]">
        <BustErrorBoundary>
          <PhilosopherBust config={config} label={label} />
        </BustErrorBoundary>
        <p className="pointer-events-none absolute bottom-3 left-0 right-0 text-center text-[10px] uppercase tracking-[0.25em] text-parchment-100/50">
          {hint}
        </p>
      </div>
      {/* Engraved museum plaque */}
      <figcaption className="bust-plaque rounded-b-2xl px-6 py-3 text-center">
        <span className="block font-display text-lg uppercase tracking-[0.3em] text-midnight-900 sm:text-xl">
          {label}
        </span>
        <span className="block text-[11px] uppercase tracking-[0.35em] text-midnight-900/70">
          {years}
        </span>
      </figcaption>
    </figure>
  );
}
