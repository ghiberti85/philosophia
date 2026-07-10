import type { JSX } from 'react';
import type { School } from '@/data/types';

/**
 * Hand-crafted isometric SVG scenes, v2.
 *
 * All coordinates go through a true isometric projection (30 deg axes) and
 * structural fills reference CSS custom properties (--iso-*) so every scene
 * automatically re-paints itself for light and dark mode. On top of that,
 * `.iso-day` / `.iso-night` layers cross-fade with the theme: a sun and its
 * haze by day, a moon, stars and lit braziers by night. Flames flicker and
 * glows bob via tiny CSS animations.
 */

type Pt3 = [number, number, number];

const COS30 = Math.cos(Math.PI / 6);
const SIN30 = Math.sin(Math.PI / 6);

/** Projects a 3D point into 2D isometric screen space. */
export function iso([x, y, z]: Pt3, originX = 260, originY = 210): [number, number] {
  return [originX + (x - y) * COS30, originY + (x + y) * SIN30 - z];
}

function poly(points: Pt3[]): string {
  return points
    .map((p) =>
      iso(p)
        .map((n) => n.toFixed(1))
        .join(','),
    )
    .join(' ');
}

/** An isometric box (top, left and right faces) centred at (cx, cy). */
function Box({
  cx,
  cy,
  z = 0,
  w,
  d,
  h,
  top = 'var(--iso-marble)',
  left = 'var(--iso-marble-shade)',
  right = 'var(--iso-marble-dark)',
}: {
  cx: number;
  cy: number;
  z?: number;
  w: number;
  d: number;
  h: number;
  top?: string;
  left?: string;
  right?: string;
}) {
  const x0 = cx - w / 2;
  const x1 = cx + w / 2;
  const y0 = cy - d / 2;
  const y1 = cy + d / 2;
  const zt = z + h;
  return (
    <g stroke="var(--iso-line)" strokeWidth="1">
      <polygon
        points={poly([
          [x0, y0, zt],
          [x1, y0, zt],
          [x1, y1, zt],
          [x0, y1, zt],
        ])}
        fill={top}
      />
      <polygon
        points={poly([
          [x0, y1, zt],
          [x1, y1, zt],
          [x1, y1, z],
          [x0, y1, z],
        ])}
        fill={left}
      />
      <polygon
        points={poly([
          [x1, y0, zt],
          [x1, y1, zt],
          [x1, y1, z],
          [x1, y0, z],
        ])}
        fill={right}
      />
    </g>
  );
}

/** A fluted column with base and capital. */
function Column({ cx, cy, z = 0, h = 64 }: { cx: number; cy: number; z?: number; h?: number }) {
  return (
    <g>
      <Box cx={cx} cy={cy} z={z} w={15} d={15} h={4} />
      <Box cx={cx} cy={cy} z={z + 4} w={10} d={10} h={h - 14} />
      {/* Flute highlight */}
      <polygon
        points={poly([
          [cx - 5, cy + 5, z + 4],
          [cx - 2, cy + 5, z + 4],
          [cx - 2, cy + 5, z + h - 10],
          [cx - 5, cy + 5, z + h - 10],
        ])}
        fill="rgba(255,255,255,0.22)"
        stroke="none"
      />
      <Box cx={cx} cy={cy} z={z + h - 10} w={13} d={13} h={4} />
      <Box cx={cx} cy={cy} z={z + h - 6} w={16} d={16} h={6} />
    </g>
  );
}

/** Cypress tree — stacked dark-green cones with a small trunk. */
function Tree({ cx, cy, z = 0, s = 1 }: { cx: number; cy: number; z?: number; s?: number }) {
  const [bx, by] = iso([cx, cy, z]);
  return (
    <g>
      <Box
        cx={cx}
        cy={cy}
        z={z}
        w={6 * s}
        d={6 * s}
        h={6 * s}
        top="#7a5b3a"
        left="#5e4429"
        right="#4a351f"
      />
      <g stroke="rgba(0,0,0,0.18)" strokeWidth="0.8">
        <ellipse cx={bx} cy={by - 26 * s} rx={11 * s} ry={22 * s} fill="var(--iso-tree, #4d6b46)" />
        <ellipse
          cx={bx - 3 * s}
          cy={by - 30 * s}
          rx={5 * s}
          ry={12 * s}
          fill="rgba(255,255,255,0.14)"
          stroke="none"
        />
      </g>
    </g>
  );
}

/** Brazier with a flame that lights up at night. */
function Brazier({ cx, cy, z = 0, uid }: { cx: number; cy: number; z?: number; uid: string }) {
  const [fx, fy] = iso([cx, cy, z + 22]);
  return (
    <g>
      <Box cx={cx} cy={cy} z={z} w={8} d={8} h={12} />
      <Box
        cx={cx}
        cy={cy}
        z={z + 12}
        w={16}
        d={16}
        h={6}
        top="#8a6b40"
        left="#6e5430"
        right="#594324"
      />
      <g className="iso-flame">
        <circle cx={fx} cy={fy} r={13} fill={`url(#flameGlow-${uid})`} />
        <path
          d={`M ${fx - 4} ${fy + 4} Q ${fx - 5} ${fy - 6} ${fx} ${fy - 11} Q ${fx + 5} ${fy - 5} ${fx + 4} ${fy + 4} Z`}
          fill="#f5a93f"
        />
        <path
          d={`M ${fx - 2} ${fy + 3} Q ${fx - 2} ${fy - 3} ${fx} ${fy - 6} Q ${fx + 2} ${fy - 2} ${fx + 2} ${fy + 3} Z`}
          fill="#ffe08a"
        />
      </g>
    </g>
  );
}

/** Amphora urn beside entrances. */
function Urn({ cx, cy, z = 0 }: { cx: number; cy: number; z?: number }) {
  const [bx, by] = iso([cx, cy, z]);
  return (
    <g stroke="var(--iso-line)" strokeWidth="0.8">
      <ellipse cx={bx} cy={by - 4} rx={6} ry={3} fill="var(--iso-marble-dark)" />
      <path
        d={`M ${bx - 6} ${by - 4} Q ${bx - 9} ${by - 14} ${bx - 4} ${by - 20} L ${bx + 4} ${by - 20} Q ${bx + 9} ${by - 14} ${bx + 6} ${by - 4} Z`}
        fill="var(--iso-marble-shade)"
      />
      <ellipse cx={bx} cy={by - 20} rx={4.5} ry={2} fill="var(--iso-marble)" />
    </g>
  );
}

/** Stepped platform with tiled inlay that all scenes stand on. */
function Platform({ accent }: { accent: string }) {
  const tiles: JSX.Element[] = [];
  for (let i = -2; i <= 2; i++) {
    for (let j = -2; j <= 2; j++) {
      if ((i + j) % 2 !== 0) continue;
      tiles.push(
        <polygon
          key={`${i}-${j}`}
          points={poly([
            [i * 36 - 16, j * 36 - 16, 38.5],
            [i * 36 + 16, j * 36 - 16, 38.5],
            [i * 36 + 16, j * 36 + 16, 38.5],
            [i * 36 - 16, j * 36 + 16, 38.5],
          ])}
          fill={accent}
          opacity={0.1}
        />,
      );
    }
  }
  return (
    <g>
      <Box
        cx={0}
        cy={0}
        z={0}
        w={310}
        d={310}
        h={14}
        top="var(--iso-ground)"
        left="var(--iso-ground-dark)"
        right="var(--iso-ground-dark)"
      />
      <Box cx={0} cy={0} z={14} w={258} d={258} h={12} />
      <Box cx={0} cy={0} z={26} w={214} d={214} h={12} />
      {tiles}
      {/* Accent border inlay on the top step */}
      <polygon
        points={poly([
          [-100, -100, 38.5],
          [100, -100, 38.5],
          [100, 100, 38.5],
          [-100, 100, 38.5],
        ])}
        fill="none"
        stroke={accent}
        strokeWidth="2"
        opacity={0.5}
      />
    </g>
  );
}

/** Sky: sun haze by day, moon + twinkling stars by night. */
function Sky({ uid }: { uid: string }) {
  const stars: [number, number, number][] = [
    [60, 60, 1.6],
    [120, 36, 1.2],
    [205, 64, 1.8],
    [318, 30, 1.3],
    [400, 70, 1.7],
    [460, 44, 1.2],
    [86, 120, 1.1],
    [432, 120, 1.4],
  ];
  return (
    <>
      <g className="iso-day">
        <circle cx="420" cy="64" r="40" fill={`url(#sunGlow-${uid})`} />
        <circle cx="420" cy="64" r="17" fill="#f5d98b" opacity="0.9" />
      </g>
      <g className="iso-night">
        <circle cx="420" cy="64" r="36" fill={`url(#moonGlow-${uid})`} />
        <circle cx="420" cy="64" r="14" fill="#dfe6f3" />
        <circle cx="426" cy="60" r="12.5" fill="var(--iso-sky)" />
        {stars.map(([x, y, r], i) => (
          <circle key={i} className="iso-star" cx={x} cy={y} r={r} fill="#dfe6f3" />
        ))}
      </g>
    </>
  );
}

/** Triangular pediment with accent medallion. */
function Pediment({ z, accent }: { z: number; accent: string }) {
  return (
    <g stroke="var(--iso-line)" strokeWidth="1">
      <Box cx={0} cy={0} z={z} w={196} d={134} h={12} />
      <polygon
        points={poly([
          [-98, 67, z + 12],
          [98, 67, z + 12],
          [0, 67, z + 54],
        ])}
        fill="var(--iso-marble-shade)"
      />
      <polygon
        points={poly([
          [98, -67, z + 12],
          [98, 67, z + 12],
          [0, 67, z + 54],
          [0, -67, z + 54],
        ])}
        fill="var(--iso-marble-dark)"
      />
      {/* Carved frieze line + medallion */}
      <polygon
        points={poly([
          [-92, 67.5, z + 16],
          [92, 67.5, z + 16],
          [92, 67.5, z + 19],
          [-92, 67.5, z + 19],
        ])}
        fill={accent}
        opacity={0.45}
        stroke="none"
      />
      <circle
        cx={iso([0, 67, z + 30])[0]}
        cy={iso([0, 67, z + 30])[1]}
        r={10}
        fill={accent}
        opacity={0.75}
      />
      <circle
        cx={iso([0, 67, z + 30])[0]}
        cy={iso([0, 67, z + 30])[1]}
        r={5}
        fill="var(--iso-marble)"
      />
    </g>
  );
}

/** Greek temple with colonnade, braziers, trees and urns. */
function Temple({ accent, columns, uid }: { accent: string; columns: number; uid: string }) {
  const span = 156;
  const xs = Array.from({ length: columns }, (_, i) => -span / 2 + (span / (columns - 1)) * i);
  return (
    <g>
      <Platform accent={accent} />
      <Box cx={0} cy={0} z={38} w={186} d={124} h={8} />
      {/* Inner cella wall, visible between columns */}
      <Box
        cx={0}
        cy={0}
        z={46}
        w={120}
        d={80}
        h={58}
        top="var(--iso-marble-shade)"
        left="var(--iso-marble-dark)"
        right="var(--iso-marble-dark)"
      />
      {xs.map((x) => (
        <g key={`cols-${x}`}>
          <Column cx={x} cy={50} z={46} />
          <Column cx={x} cy={-50} z={46} />
        </g>
      ))}
      <Pediment z={112} accent={accent} />
      <Tree cx={-128} cy={108} z={38} s={1.15} />
      <Tree cx={132} cy={96} z={38} s={0.9} />
      <Urn cx={-78} cy={86} z={38} />
      <Urn cx={78} cy={86} z={38} />
      <Brazier cx={-104} cy={56} z={38} uid={uid} />
      <Brazier cx={104} cy={56} z={38} uid={uid} />
    </g>
  );
}

/** Long covered porch with bench and philosophers' shade — the Stoa. */
function Stoa({ accent, uid }: { accent: string; uid: string }) {
  const xs = [-104, -62, -20, 22, 64, 106];
  return (
    <g>
      <Platform accent={accent} />
      <Box
        cx={0}
        cy={-34}
        z={38}
        w={238}
        d={66}
        h={72}
        top="var(--iso-marble-shade)"
        left="var(--iso-marble-dark)"
        right="var(--iso-marble-dark)"
      />
      {/* Painted fresco band (the "Stoa Poikile" was the painted porch) */}
      <polygon
        points={poly([
          [-115, -1.5, 74],
          [115, -1.5, 74],
          [115, -1.5, 94],
          [-115, -1.5, 94],
        ])}
        fill={accent}
        opacity={0.35}
        stroke="none"
      />
      {xs.map((x) => (
        <Column key={x} cx={x} cy={44} z={38} h={72} />
      ))}
      <Box cx={0} cy={4} z={110} w={258} d={152} h={10} />
      <Box
        cx={0}
        cy={4}
        z={120}
        w={218}
        d={112}
        h={9}
        top={accent}
        left={accent}
        right="var(--iso-marble-dark)"
      />
      {/* Marble bench + scattered scrolls */}
      <Box cx={-30} cy={92} z={38} w={64} d={14} h={10} />
      <Box cx={52} cy={92} z={38} w={8} d={8} h={3} top="#e9ddbe" left="#d3c39c" right="#c0ad84" />
      <Tree cx={-132} cy={104} z={38} s={1.1} />
      <Brazier cx={126} cy={92} z={38} uid={uid} />
      <Urn cx={104} cy={108} z={38} />
    </g>
  );
}

/** Tower with armillary sphere, telescope ledge and celestial accents. */
function Observatory({ accent, uid }: { accent: string; uid: string }) {
  const [sx, sy] = iso([0, 0, 206]);
  return (
    <g>
      <Platform accent={accent} />
      <Box cx={0} cy={0} z={38} w={114} d={114} h={92} />
      {/* Arched doorway */}
      <polygon
        points={poly([
          [-14, 57.5, 38],
          [14, 57.5, 38],
          [14, 57.5, 78],
          [-14, 57.5, 78],
        ])}
        fill="var(--iso-ground-dark)"
        stroke="none"
      />
      <Box cx={0} cy={0} z={130} w={136} d={136} h={12} />
      <Box cx={0} cy={0} z={142} w={92} d={92} h={36} />
      {/* Star chart band */}
      <polygon
        points={poly([
          [-46, 46.5, 150],
          [46, 46.5, 150],
          [46, 46.5, 168],
          [-46, 46.5, 168],
        ])}
        fill={accent}
        opacity={0.4}
        stroke="none"
      />
      {/* Armillary sphere, gently floating */}
      <g className="iso-float-slow">
        <circle cx={sx} cy={sy - 26} r={30} fill={`url(#sphereGlow-${uid})`} />
        <g stroke={accent} strokeWidth="2.6" fill="none" opacity="0.9">
          <circle cx={sx} cy={sy - 26} r={26} />
          <ellipse cx={sx} cy={sy - 26} rx={26} ry={9} />
          <ellipse cx={sx} cy={sy - 26} rx={9} ry={26} />
        </g>
        <circle cx={sx} cy={sy - 26} r={4} fill={accent} />
      </g>
      <Column cx={-46} cy={46} z={38} h={52} />
      <Column cx={46} cy={46} z={38} h={52} />
      <Tree cx={-122} cy={100} z={38} s={1.0} />
      <Brazier cx={112} cy={84} z={38} uid={uid} />
      <Urn cx={-86} cy={92} z={38} />
    </g>
  );
}

/** Parisian cafe with striped awning, chalkboard and lamppost. */
function Cafe({ accent, uid }: { accent: string; uid: string }) {
  const stripes = [-70, -42, -14, 14, 42, 70];
  const [lx, ly] = iso([-116, 64, 38]);
  return (
    <g>
      <Platform accent={accent} />
      <Box
        cx={12}
        cy={-22}
        z={38}
        w={154}
        d={112}
        h={86}
        top="var(--iso-marble-shade)"
        left="var(--iso-marble-dark)"
        right="var(--iso-marble-dark)"
      />
      {/* Door + warm-lit windows */}
      <polygon
        points={poly([
          [-20, 34.5, 38],
          [8, 34.5, 38],
          [8, 34.5, 90],
          [-20, 34.5, 90],
        ])}
        fill="var(--iso-ground-dark)"
        stroke="none"
      />
      <polygon
        points={poly([
          [24, 34.5, 58],
          [64, 34.5, 58],
          [64, 34.5, 88],
          [24, 34.5, 88],
        ])}
        fill={accent}
        opacity={0.3}
        stroke="none"
      />
      <g className="iso-night">
        <polygon
          points={poly([
            [24, 34.5, 58],
            [64, 34.5, 58],
            [64, 34.5, 88],
            [24, 34.5, 88],
          ])}
          fill="#f5c96a"
          opacity={0.85}
          stroke="none"
        />
        <polygon
          points={poly([
            [-20, 34.5, 60],
            [8, 34.5, 60],
            [8, 34.5, 90],
            [-20, 34.5, 90],
          ])}
          fill="#f5c96a"
          opacity={0.5}
          stroke="none"
        />
      </g>
      {/* Striped awning */}
      <Box
        cx={12}
        cy={42}
        z={96}
        w={168}
        d={38}
        h={8}
        top={accent}
        left={accent}
        right="var(--iso-marble-dark)"
      />
      {stripes.map((x, i) =>
        i % 2 === 0 ? (
          <polygon
            key={x}
            points={poly([
              [x - 2 + 12, 23, 104.5],
              [x + 12 + 12, 23, 104.5],
              [x + 12 + 12, 61, 104.5],
              [x - 2 + 12, 61, 104.5],
            ])}
            fill="rgba(255,255,255,0.45)"
            stroke="none"
          />
        ) : null,
      )}
      {/* Cafe name board */}
      <polygon
        points={poly([
          [-34, 34.8, 94],
          [58, 34.8, 94],
          [58, 34.8, 106],
          [-34, 34.8, 106],
        ])}
        fill="var(--iso-ground-dark)"
        stroke="none"
      />
      {/* Sidewalk tables and chairs */}
      <Box
        cx={-66}
        cy={72}
        z={38}
        w={26}
        d={26}
        h={22}
        top={accent}
        left="var(--iso-marble-shade)"
        right="var(--iso-marble-dark)"
      />
      <Box cx={-98} cy={52} z={38} w={14} d={14} h={16} />
      <Box cx={-38} cy={94} z={38} w={14} d={14} h={16} />
      <Box
        cx={56}
        cy={88}
        z={38}
        w={26}
        d={26}
        h={22}
        top={accent}
        left="var(--iso-marble-shade)"
        right="var(--iso-marble-dark)"
      />
      <Box cx={88} cy={70} z={38} w={14} d={14} h={16} />
      {/* Lamppost that glows at night */}
      <Box
        cx={-116}
        cy={64}
        z={38}
        w={5}
        d={5}
        h={64}
        top="#3a3f4c"
        left="#2c303b"
        right="#22252e"
      />
      <circle cx={lx} cy={ly - 68} r={6} fill="#dfe6f3" opacity={0.85} />
      <g className="iso-night iso-flame">
        <circle cx={lx} cy={ly - 68} r={16} fill={`url(#flameGlow-${uid})`} />
        <circle cx={lx} cy={ly - 68} r={6} fill="#ffe08a" />
      </g>
      <Tree cx={124} cy={104} z={38} s={0.85} />
    </g>
  );
}

/** Grand library: stacked tiers, giant leaning books, reading lectern. */
function Library({ accent, uid }: { accent: string; uid: string }) {
  return (
    <g>
      <Platform accent={accent} />
      <Box cx={0} cy={0} z={38} w={164} d={114} h={56} />
      {/* Tall arched windows */}
      {[-52, -18, 16, 50].map((x) => (
        <polygon
          key={x}
          points={poly([
            [x - 9, 57.5, 48],
            [x + 9, 57.5, 48],
            [x + 9, 57.5, 82],
            [x - 9, 57.5, 82],
          ])}
          fill={accent}
          opacity={0.3}
          stroke="none"
        />
      ))}
      <g className="iso-night">
        {[-52, -18, 16, 50].map((x) => (
          <polygon
            key={x}
            points={poly([
              [x - 9, 57.5, 48],
              [x + 9, 57.5, 48],
              [x + 9, 57.5, 82],
              [x - 9, 57.5, 82],
            ])}
            fill="#f5c96a"
            opacity={0.7}
            stroke="none"
          />
        ))}
      </g>
      <Box
        cx={0}
        cy={0}
        z={94}
        w={134}
        d={92}
        h={42}
        top="var(--iso-marble-shade)"
        left="var(--iso-marble-dark)"
        right="var(--iso-marble-dark)"
      />
      <Box cx={0} cy={0} z={136} w={102} d={68} h={32} />
      {/* Dome cap */}
      <circle
        cx={iso([0, 0, 184])[0]}
        cy={iso([0, 0, 184])[1]}
        r={20}
        fill={accent}
        opacity={0.85}
      />
      <circle cx={iso([0, 0, 190])[0]} cy={iso([0, 0, 190])[1]} r={10} fill="var(--iso-marble)" />
      {/* Giant leaning books by the entrance */}
      <Box
        cx={-94}
        cy={62}
        z={38}
        w={16}
        d={36}
        h={48}
        top={accent}
        left={accent}
        right="var(--iso-marble-dark)"
      />
      <Box
        cx={-72}
        cy={66}
        z={38}
        w={12}
        d={32}
        h={40}
        top="#9a4a5a"
        left="#7e3a48"
        right="#67303b"
      />
      <Box
        cx={-56}
        cy={70}
        z={38}
        w={10}
        d={28}
        h={33}
        top="#5b7fb9"
        left="#49679a"
        right="#3a527d"
      />
      {/* Lectern with open book */}
      <Box cx={78} cy={74} z={38} w={12} d={12} h={20} />
      <polygon
        points={poly([
          [68, 68, 60],
          [88, 68, 60],
          [88, 82, 57],
          [68, 82, 57],
        ])}
        fill="#f6efdd"
        stroke="var(--iso-line)"
      />
      <Brazier cx={108} cy={96} z={38} uid={uid} />
      <Tree cx={-124} cy={104} z={38} s={1.05} />
    </g>
  );
}

const SCENES: Record<School['scene'], (accent: string, uid: string) => JSX.Element> = {
  agora: (a, u) => <Temple accent={a} columns={3} uid={u} />,
  academy: (a, u) => <Temple accent={a} columns={4} uid={u} />,
  lyceum: (a, u) => <Temple accent={a} columns={5} uid={u} />,
  stoa: (a, u) => <Stoa accent={a} uid={u} />,
  observatory: (a, u) => <Observatory accent={a} uid={u} />,
  cafe: (a, u) => <Cafe accent={a} uid={u} />,
  library: (a, u) => <Library accent={a} uid={u} />,
};

export function IsometricScene({
  scene,
  accent,
  className = '',
  uid,
}: {
  scene: School['scene'];
  accent: string;
  className?: string;
  /** Unique suffix for gradient ids when the same scene renders twice on a page. */
  uid?: string;
}) {
  const id = uid ?? scene;
  return (
    <svg
      viewBox="0 0 520 430"
      role="img"
      aria-hidden="true"
      className={`h-auto w-full drop-shadow-xl ${className}`}
    >
      <defs>
        <radialGradient id={`sunGlow-${id}`}>
          <stop offset="0%" stopColor="rgba(245, 217, 139, 0.55)" />
          <stop offset="100%" stopColor="rgba(245, 217, 139, 0)" />
        </radialGradient>
        <radialGradient id={`moonGlow-${id}`}>
          <stop offset="0%" stopColor="rgba(223, 230, 243, 0.4)" />
          <stop offset="100%" stopColor="rgba(223, 230, 243, 0)" />
        </radialGradient>
        <radialGradient id={`flameGlow-${id}`}>
          <stop offset="0%" stopColor="rgba(245, 169, 63, 0.55)" />
          <stop offset="100%" stopColor="rgba(245, 169, 63, 0)" />
        </radialGradient>
        <radialGradient id={`sphereGlow-${id}`}>
          <stop offset="0%" stopColor="rgba(232, 200, 122, 0.35)" />
          <stop offset="100%" stopColor="rgba(232, 200, 122, 0)" />
        </radialGradient>
      </defs>
      <Sky uid={id} />
      {/* Ambient glow under the platform */}
      <ellipse cx="260" cy="305" rx="225" ry="78" fill="var(--iso-glow)" />
      {SCENES[scene](accent, id)}
    </svg>
  );
}
