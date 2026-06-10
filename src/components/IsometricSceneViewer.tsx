'use client';

import dynamic from 'next/dynamic';
import type { School } from '@/data/types';

const IsometricScene3D = dynamic(() => import('./IsometricScene3D'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-parchment-100/50 dark:bg-midnight-800/50">
      <span className="animate-pulse font-display text-4xl text-gold-500/60">Φ</span>
    </div>
  ),
});

export function IsometricSceneViewer({
  scene,
  accent,
  className = '',
}: {
  scene: School['scene'];
  accent: string;
  className?: string;
}) {
  return (
    <div className={`aspect-[6/5] w-full overflow-hidden rounded-xl ${className}`}>
      <IsometricScene3D scene={scene} accent={accent} />
    </div>
  );
}
