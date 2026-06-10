import type { School } from '@/data/types';

/**
 * Hand-crafted isometric SVG scenes.
 *
 * All coordinates go through a true isometric projection (30° axes) and all
 * fills reference CSS custom properties (--iso-*) defined in globals.css,
 * so every scene automatically re-paints itself for light and dark mode.
 */

type Pt3 = [number, number, number];

const COS30 = Math.cos(Math.PI / 6);
const SIN30 = Math.sin(Math.PI / 6);

/** Projects a 3D point into 2D isometric screen space. */
export function iso([x, y, z]: Pt3, originX = 260, originY = 200): [number, number] {
  return [originX + (x - y) * COS30, originY + (x + y) * SIN30 - z];
}

function poly(points: Pt3[]): string {
  return points
    .map((p) => iso(p).map((n) => n.toFixed(1)).join(','))
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
      <polygon points={poly([[x0, y0, zt], [x1, y0, zt], [x1, y1, zt], [x0, y1, zt]])} fill={top} />
      <polygon points={poly([[x0, y1, zt], [x1, y1, zt], [x1, y1, z], [x0, y1, z]])} fill={left} />
      <polygon points={poly([[x1, y0, zt], [x1, y1, zt], [x1, y1, z], [x1, y0, z]])} fill={right} />
    </g>
  );
}

/** A simple cylindrical column approximated with a box + capital. */
function Column({ cx, cy, z = 0, h = 64 }: { cx: number; cy: number; z?: number; h?: number }) {
  return (
    <g>
      <Box cx={cx} cy={cy} z={z} w={14} d={14} h={4} />
      <Box cx={cx} cy={cy} z={z + 4} w={9} d={9} h={h - 12} />
      <Box cx={cx} cy={cy} z={z + h - 8} w={15} d={15} h={8} />
    </g>
  );
}

/** Stepped platform that all scenes stand on. */
function Platform({ accent }: { accent: string }) {
  return (
    <g>
      <Box cx={0} cy={0} z={0} w={300} d={300} h={14} top="var(--iso-ground)" left="var(--iso-ground-dark)" right="var(--iso-ground-dark)" />
      <Box cx={0} cy={0} z={14} w={250} d={250} h={12} />
      <Box cx={0} cy={0} z={26} w={210} d={210} h={12} />
      {/* Accent inlay on the top step. */}
      <polygon
        points={poly([[-70, -70, 38.5], [70, -70, 38.5], [70, 70, 38.5], [-70, 70, 38.5]])}
        fill={accent}
        opacity={0.18}
      />
    </g>
  );
}

function Pediment({ z, accent }: { z: number; accent: string }) {
  return (
    <g stroke="var(--iso-line)" strokeWidth="1">
      <Box cx={0} cy={0} z={z} w={190} d={130} h={12} />
      {/* Triangular gable on the front face. */}
      <polygon
        points={poly([[-95, 65, z + 12], [95, 65, z + 12], [0, 65, z + 52]])}
        fill="var(--iso-marble-shade)"
      />
      <polygon
        points={poly([[95, -65, z + 12], [95, 65, z + 12], [0, 65, z + 52], [0, -65, z + 52]])}
        fill="var(--iso-marble-dark)"
      />
      <circle cx={iso([0, 65, z + 28])[0]} cy={iso([0, 65, z + 28])[1]} r={9} fill={accent} opacity={0.6} />
    </g>
  );
}

/** Greek temple: used by academy / lyceum / agora variants. */
function Temple({ accent, columns }: { accent: string; columns: number }) {
  const span = 150;
  const xs = Array.from({ length: columns }, (_, i) => -span / 2 + (span / (columns - 1)) * i);
  return (
    <g>
      <Platform accent={accent} />
      <Box cx={0} cy={0} z={38} w={180} d={120} h={8} />
      {xs.map((x) => (
        <g key={`front-${x}`}>
          <Column cx={x} cy={48} z={46} />
          <Column cx={x} cy={-48} z={46} />
        </g>
      ))}
      <Pediment z={112} accent={accent} />
    </g>
  );
}

/** Long covered porch — the Stoa. */
function Stoa({ accent }: { accent: string }) {
  const xs = [-100, -60, -20, 20, 60, 100];
  return (
    <g>
      <Platform accent={accent} />
      <Box cx={0} cy={-30} z={38} w={230} d={70} h={70} />
      {xs.map((x) => (
        <Column key={x} cx={x} cy={40} z={38} h={70} />
      ))}
      <Box cx={0} cy={5} z={108} w={250} d={150} h={10} />
      <Box cx={0} cy={5} z={118} w={210} d={110} h={8} top={accent} left={accent} right="var(--iso-marble-dark)" />
    </g>
  );
}

/** Tower with an armillary sphere — rationalism's observatory. */
function Observatory({ accent }: { accent: string }) {
  const [sx, sy] = iso([0, 0, 196]);
  return (
    <g>
      <Platform accent={accent} />
      <Box cx={0} cy={0} z={38} w={110} d={110} h={90} />
      <Box cx={0} cy={0} z={128} w={130} d={130} h={12} />
      <Box cx={0} cy={0} z={140} w={90} d={90} h={34} />
      {/* Armillary sphere */}
      <g stroke={accent} strokeWidth="2.5" fill="none" opacity="0.85">
        <circle cx={sx} cy={sy - 24} r={26} />
        <ellipse cx={sx} cy={sy - 24} rx={26} ry={9} />
        <ellipse cx={sx} cy={sy - 24} rx={9} ry={26} />
      </g>
      <Column cx={-44} cy={44} z={38} h={50} />
      <Column cx={44} cy={44} z={38} h={50} />
    </g>
  );
}

/** Parisian café — existentialism. */
function Cafe({ accent }: { accent: string }) {
  return (
    <g>
      <Platform accent={accent} />
      <Box cx={10} cy={-20} z={38} w={150} d={110} h={84} />
      {/* Awning */}
      <Box cx={10} cy={42} z={96} w={160} d={36} h={8} top={accent} left={accent} right="var(--iso-marble-dark)" />
      {/* Door & window hints on the front face */}
      <polygon points={poly([[ -20, 35.5, 38], [8, 35.5, 38], [8, 35.5, 88], [-20, 35.5, 88]])} fill="var(--iso-marble-dark)" />
      <polygon points={poly([[24, 35.5, 56], [62, 35.5, 56], [62, 35.5, 86], [24, 35.5, 86]])} fill={accent} opacity={0.35} />
      {/* Sidewalk table and chairs */}
      <Box cx={-70} cy={70} z={38} w={26} d={26} h={22} top={accent} left="var(--iso-marble-shade)" right="var(--iso-marble-dark)" />
      <Box cx={-100} cy={50} z={38} w={14} d={14} h={16} />
      <Box cx={-42} cy={92} z={38} w={14} d={14} h={16} />
    </g>
  );
}

/** Stacked-books library — critical philosophy. */
function Library({ accent }: { accent: string }) {
  return (
    <g>
      <Platform accent={accent} />
      <Box cx={0} cy={0} z={38} w={160} d={110} h={56} />
      <Box cx={0} cy={0} z={94} w={130} d={88} h={42} />
      <Box cx={0} cy={0} z={136} w={100} d={66} h={32} />
      {/* Giant books leaning by the entrance */}
      <Box cx={-92} cy={62} z={38} w={16} d={34} h={46} top={accent} left={accent} right="var(--iso-marble-dark)" />
      <Box cx={-72} cy={66} z={38} w={12} d={30} h={38} />
      <Column cx={70} cy={66} z={38} h={48} />
    </g>
  );
}

const SCENES: Record<School['scene'], (accent: string) => JSX.Element> = {
  agora: (a) => <Temple accent={a} columns={3} />,
  academy: (a) => <Temple accent={a} columns={4} />,
  lyceum: (a) => <Temple accent={a} columns={5} />,
  stoa: (a) => <Stoa accent={a} />,
  observatory: (a) => <Observatory accent={a} />,
  cafe: (a) => <Cafe accent={a} />,
  library: (a) => <Library accent={a} />,
};

export function IsometricScene({
  scene,
  accent,
  className = '',
}: {
  scene: School['scene'];
  accent: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 520 420"
      role="img"
      aria-hidden="true"
      className={`h-auto w-full drop-shadow-xl ${className}`}
    >
      {/* Ambient glow that follows the theme. */}
      <ellipse cx="260" cy="290" rx="220" ry="80" fill="var(--iso-glow)" />
      {SCENES[scene](accent)}
    </svg>
  );
}
