'use client';

import { useRef, useState, type CSSProperties, type ReactNode } from 'react';

/**
 * Pointer-tracking 3D tilt: the card leans toward the cursor with a moving
 * light glare, like a physical miniature on a table. Resets smoothly on
 * leave; inert on touch devices (no pointer hover) by simply never tilting
 * far, since touchmove is not tracked.
 */
export function TiltCard({
  children,
  className = '',
  max = 8,
  glare: glareEnabled = true,
}: {
  children: ReactNode;
  className?: string;
  /** Maximum tilt in degrees. */
  max?: number;
  /** Disable the light glare (e.g. for transparent cut-out images). */
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<CSSProperties['transform']>();
  const [glare, setGlare] = useState({ x: 50, y: 35, opacity: 0 });

  const onPointerMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType === 'touch') return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (0.5 - py) * 2 * max;
    const ry = (px - 0.5) * 2 * max;
    setTransform(`perspective(1100px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(1.03)`);
    setGlare({ x: px * 100, y: py * 100, opacity: 1 });
  };

  const reset = () => {
    setTransform(undefined);
    setGlare((g) => ({ ...g, opacity: 0 }));
  };

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      className={`relative transition-transform duration-300 ease-out will-change-transform ${className}`}
      style={{ transform }}
    >
      {children}
      {/* Moving light glare */}
      {glareEnabled && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.28), rgba(255,255,255,0) 55%)`,
          }}
        />
      )}
    </div>
  );
}
