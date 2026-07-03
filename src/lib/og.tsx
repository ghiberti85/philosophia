import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { ReactNode } from 'react';

/**
 * Shared bits for the dynamic Open Graph images (opengraph-image.tsx files).
 *
 * Everything is rendered by satori at build time, so styles are inline (no
 * Tailwind) and the display fonts are read from committed static TTFs — see
 * src/assets/fonts/README.md.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

const PALETTE = {
  background: '#171106',
  surface: 'rgba(250, 247, 242, 0.04)',
  text: '#f5efe2',
  muted: 'rgba(245, 239, 226, 0.62)',
  gold: '#c2922f',
};

export async function ogFonts() {
  const dir = join(process.cwd(), 'src', 'assets', 'fonts');
  const [bold, italic] = await Promise.all([
    readFile(join(dir, 'PlayfairDisplay-Bold.ttf')),
    readFile(join(dir, 'PlayfairDisplay-MediumItalic.ttf')),
  ]);
  return [
    { name: 'Playfair', data: bold, weight: 700 as const, style: 'normal' as const },
    { name: 'Playfair', data: italic, weight: 500 as const, style: 'italic' as const },
  ];
}

/** Parchment-on-midnight card frame with the gold wordmark, shared by every OG image. */
export function OgFrame({
  accent = PALETTE.gold,
  children,
}: {
  accent?: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: PALETTE.background,
        backgroundImage: `radial-gradient(circle at 85% 10%, ${accent}33 0%, transparent 55%)`,
        color: PALETTE.text,
        fontFamily: 'Playfair',
        padding: 44,
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          border: `2px solid ${accent}59`,
          borderRadius: 28,
          backgroundColor: PALETTE.surface,
          padding: '52px 64px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ width: 46, height: 4, backgroundColor: accent, borderRadius: 2 }} />
          <div style={{ fontSize: 28, letterSpacing: 10, color: PALETTE.gold }}>PHILOSOPHIA</div>
        </div>
        {children}
      </div>
    </div>
  );
}

export const ogStyles = {
  palette: PALETTE,
  title: {
    fontSize: 84,
    fontWeight: 700,
    lineHeight: 1.05,
    marginTop: 42,
    display: 'flex',
  },
  subtitle: {
    fontSize: 36,
    fontStyle: 'italic',
    marginTop: 18,
    color: PALETTE.muted,
    display: 'flex',
  },
  caption: {
    fontSize: 24,
    letterSpacing: 6,
    marginTop: 26,
    color: PALETTE.muted,
    textTransform: 'uppercase' as const,
    display: 'flex',
  },
  quote: (accent: string) => ({
    marginTop: 'auto',
    display: 'flex',
    fontSize: 30,
    fontStyle: 'italic',
    lineHeight: 1.35,
    color: PALETTE.muted,
    borderLeft: `4px solid ${accent}`,
    paddingLeft: 28,
  }),
};
