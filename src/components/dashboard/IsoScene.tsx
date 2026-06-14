'use client';

import type { School } from '@/data/types';
import type { ReactNode } from 'react';

/**
 * Procedural isometric architectural scene (theme + accent aware).
 * 2:1 dimetric projection: x = depth-right, y = depth-left, z = up.
 * Fills reference the --iso-* custom properties from dashboard.css so the
 * scene re-paints itself for every school accent and for dark mode.
 */
export function IsoScene({ scene = 'stoa' }: { scene?: School['scene'] }) {
  const W = 760;
  const H = 440;
  const TW = 46; // tile half-width (px)
  const TH = 23; // tile half-height (px)
  const ZU = 30; // z-unit (px)
  const ox = W / 2;
  const oy = 232;
  const P = (x: number, y: number, z = 0): [number, number] => [ox + (x - y) * TW, oy + (x + y) * TH - z * ZU];
  const pts = (arr: [number, number][]) => arr.map((p) => p.join(',')).join(' ');

  // a cuboid spanning [x0,x1]x[y0,y1]x[z0,z1] → top + two visible faces
  const Box = ({
    x0, y0, x1, y1, z0, z1, top, left, right, flute,
  }: {
    x0: number; y0: number; x1: number; y1: number; z0: number; z1: number;
    top: string; left: string; right: string; flute?: boolean;
  }) => {
    const T: [number, number][] = [P(x0, y0, z1), P(x1, y0, z1), P(x1, y1, z1), P(x0, y1, z1)];
    const R: [number, number][] = [P(x1, y0, z1), P(x1, y0, z0), P(x1, y1, z0), P(x1, y1, z1)];
    const Lf: [number, number][] = [P(x1, y1, z1), P(x1, y1, z0), P(x0, y1, z0), P(x0, y1, z1)];
    const flutes: ReactNode[] = [];
    if (flute) {
      const n = 3;
      for (let i = 1; i <= n; i++) {
        const fx = x0 + ((x1 - x0) * i) / (n + 1);
        const a = P(fx, y1, z1);
        const b = P(fx, y1, z0);
        flutes.push(
          <line key={`fr${i}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="var(--iso-line)" strokeWidth="1" opacity="0.5" />
        );
      }
    }
    return (
      <g>
        <polygon points={pts(Lf)} fill={left} />
        <polygon points={pts(R)} fill={right} />
        <polygon points={pts(T)} fill={top} />
        {flutes}
      </g>
    );
  };

  const cfg = {
    stoa: { cols: 6, pediment: true, motif: 'urn' },
    agora: { cols: 4, pediment: false, motif: 'urn' },
    academy: { cols: 5, pediment: true, motif: 'tree' },
    lyceum: { cols: 5, pediment: false, motif: 'tree' },
    observatory: { cols: 3, pediment: false, motif: 'dome' },
    library: { cols: 4, pediment: true, motif: 'urn' },
    cafe: { cols: 3, pediment: false, motif: 'lamp' },
  }[scene] ?? { cols: 6, pediment: true, motif: 'urn' };

  const depth = 2.2;
  const span = cfg.cols + 0.6;

  const columns: ReactNode[] = [];
  for (let i = 0; i < cfg.cols; i++) {
    const cx = 0.55 + i * ((span - 0.9) / Math.max(1, cfg.cols - 1));
    columns.push(
      <g className="iso-float" style={{ animationDelay: `${i * 0.5}s` }} key={`c${i}`}>
        {/* capital */}
        <Box x0={cx - 0.34} y0={0.0} x1={cx + 0.34} y1={0.34} z0={3.78} z1={4.05} top="var(--iso-col-top)" left="var(--iso-col-l)" right="var(--iso-col-r)" />
        {/* shaft */}
        <Box x0={cx - 0.24} y0={0.05} x1={cx + 0.24} y1={0.29} z0={0.2} z1={3.8} top="var(--iso-col-top)" left="var(--iso-col-l)" right="var(--iso-col-r)" flute />
        {/* base */}
        <Box x0={cx - 0.34} y0={0.0} x1={cx + 0.34} y1={0.34} z0={0.0} z1={0.22} top="var(--iso-col-top)" left="var(--iso-col-l)" right="var(--iso-col-r)" />
      </g>
    );
  }

  // back wall columns (depth) — a faint second row for parallax
  const backCols: ReactNode[] = [];
  for (let i = 0; i < cfg.cols; i++) {
    const cx = 0.55 + i * ((span - 0.9) / Math.max(1, cfg.cols - 1));
    backCols.push(
      <Box key={`bc${i}`} x0={cx - 0.2} y0={depth - 0.2} x1={cx + 0.2} y1={depth} z0={0.2} z1={3.7}
        top="var(--iso-col-l)" left="var(--iso-col-r)" right="var(--iso-col-r)" />
    );
  }

  // pediment triangle (screen-space, sitting on the beam front edge)
  const beamZ = 4.4;
  const bl = P(0.1, 0, beamZ);
  const br = P(span, 0, beamZ);
  const apex = [(bl[0] + br[0]) / 2, Math.min(bl[1], br[1]) - 58];
  const motifPos = P(span + 1.0, depth + 0.6, 0);

  return (
    <div className="iso" aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice">
        <defs>
          <radialGradient id={`isosky-${scene}`} cx="50%" cy="20%" r="90%">
            <stop offset="0%" stopColor="var(--iso-sky-1)" />
            <stop offset="100%" stopColor="var(--iso-sky-2)" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width={W} height={H} fill={`url(#isosky-${scene})`} />
        {/* sun / moon disc */}
        <circle className="iso-sun" cx={W * 0.5} cy={92} r={54} fill="var(--iso-sun)" opacity="0.9" />
        <circle cx={W * 0.5} cy={92} r={70} fill="none" stroke="var(--iso-sun)" strokeWidth="1" opacity="0.4" />

        {/* ground diamond */}
        <polygon points={pts([P(-1.4, -1.4), P(span + 1.4, -1.4), P(span + 1.4, depth + 1.4), P(-1.4, depth + 1.4)])} fill="var(--iso-ground)" opacity="0.7" />

        {/* stepped platform (3 slabs) */}
        <Box x0={-0.7} y0={-0.7} x1={span + 0.7} y1={depth + 0.7} z0={-0.66} z1={-0.44} top="var(--iso-step-top)" left="var(--iso-step-l)" right="var(--iso-step-r)" />
        <Box x0={-0.45} y0={-0.45} x1={span + 0.45} y1={depth + 0.45} z0={-0.44} z1={-0.22} top="var(--iso-step-top)" left="var(--iso-step-l)" right="var(--iso-step-r)" />
        <Box x0={-0.2} y0={-0.2} x1={span + 0.2} y1={depth + 0.2} z0={-0.22} z1={0.0} top="var(--iso-step-top)" left="var(--iso-step-l)" right="var(--iso-step-r)" />

        {backCols}
        {columns}

        {/* entablature beam across the front */}
        <Box x0={-0.1} y0={-0.05} x1={span} y1={0.42} z0={4.05} z1={beamZ} top="var(--iso-beam-top)" left="var(--iso-beam-l)" right="var(--iso-beam-r)" />

        {/* pediment */}
        {cfg.pediment && (
          <g>
            <polygon points={`${bl[0]},${bl[1]} ${br[0]},${br[1]} ${apex[0]},${apex[1]}`} fill="var(--iso-pediment)" />
            <polygon points={`${bl[0]},${bl[1]} ${apex[0]},${apex[1]} ${apex[0] - 6},${apex[1] + 4} ${bl[0] + 6},${bl[1] + 4}`} fill="var(--iso-beam-r)" opacity="0.5" />
          </g>
        )}

        {/* motif (urn / dome / tree / lamp) — small depth accent */}
        <g transform={`translate(${motifPos[0]}, ${motifPos[1]})`} className="iso-float">
          {cfg.motif === 'urn' && (
            <g>
              <ellipse cx="0" cy="-2" rx="13" ry="6" fill="var(--iso-beam-l)" />
              <path d="M-12 -4 C -16 -22 16 -22 12 -4 Z" fill="var(--iso-beam-r)" />
              <ellipse cx="0" cy="-22" rx="9" ry="4" fill="var(--iso-beam-top)" />
            </g>
          )}
          {cfg.motif === 'dome' && (
            <g>
              <path d="M-16 0 A16 16 0 0 1 16 0 Z" fill="var(--iso-beam-r)" />
              <circle cx="0" cy="-16" r="3" fill="var(--iso-sun)" />
            </g>
          )}
          {cfg.motif === 'tree' && (
            <g>
              <rect x="-2" y="-14" width="4" height="16" fill="var(--iso-beam-r)" />
              <circle cx="0" cy="-20" r="13" fill="var(--iso-step-l)" />
              <circle cx="-7" cy="-14" r="8" fill="var(--iso-step-l)" />
              <circle cx="7" cy="-14" r="8" fill="var(--iso-step-l)" />
            </g>
          )}
          {cfg.motif === 'lamp' && (
            <g>
              <rect x="-1.5" y="-26" width="3" height="26" fill="var(--iso-beam-r)" />
              <circle cx="0" cy="-28" r="7" fill="var(--iso-sun)" opacity="0.9" />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
}
