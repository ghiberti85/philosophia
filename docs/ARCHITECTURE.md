# Architecture

This document explains the main design decisions behind Philosophia.

## Goals

1. **Portfolio quality** — clean, idiomatic, typed, tested code.
2. **Performance** — everything that can be static *is* static. The whole site
   (61 routes) is pre-rendered at build time; the only client-side JavaScript of
   any weight is the 3D bust canvas and the quiz engine.
3. **Wow factor on a budget** — no heavy binary assets in the repo. The
   isometric scenes are hand-written SVG and the busts are procedural meshes.

## Stack choice

The brief asked for React + Node. **Next.js 14 (App Router)** covers both: React
on the front end, a Node server/runtime for builds and serving, plus static
generation, routing, metadata and image handling out of the box. Because all
content is curated (not user-generated), there is no database — content lives in
typed TypeScript modules under `src/data/`, which gives:

- compile-time validation of every record (and every translation),
- zero-latency "queries" (plain array functions),
- trivially diffable content changes in code review.

If user accounts/scores-on-server were added later, the natural step is a small
API layer (Next.js route handlers) + SQLite/Postgres.

## Internationalization

A deliberate **lightweight custom i18n layer** (`src/lib/i18n.ts`) instead of a
library:

- The URL carries the locale: `/{locale}/...` (`/en`, `/pt`). The root `/`
  redirects to the default locale via `next.config.mjs`.
- Every translatable value is a `Localized<T> = Record<Locale, T>`. Adding a
  locale = extending one tuple; the compiler then flags every missing
  translation in data files.
- UI strings live in `src/data/dictionary.ts`; content strings live next to
  their entities. A test suite (`data-integrity.test.ts`) double-checks
  completeness at runtime too.

`generateStaticParams` pre-renders every page in every locale.

## Theming

`next-themes` toggles a `dark` class on `<html>`. Two mechanisms consume it:

1. **Tailwind `dark:` variants** for layout/typography.
2. **CSS custom properties** (`--iso-*` in `globals.css`) for the isometric
   artwork. The SVG scenes only reference variables, so the *same* markup
   renders a sunlit marble scene in light mode and a moonlit one in dark mode —
   "images that adapt to the theme" without shipping two asset sets.

## Isometric scenes

`IsometricScene.tsx` implements a real isometric projection (30° axes) in ~20
lines and composes scenes (temple, stoa, observatory, café, library) from a
single `Box`/`Column` vocabulary. Each school picks a scene + accent color in
its data record. SVG keeps them crisp at any size, ~2 KB each, and themable.

## 3D busts

`PhilosopherBust.tsx` (react-three-fiber) renders a classical herm-style bust
from a few primitives with a physical "marble" material. Each philosopher's
`BustConfig` (head width, hair, beard, palette) differentiates the silhouette.
Interaction is **rotation only** (OrbitControls with zoom/pan disabled, gentle
auto-rotate), per the design brief.

The component is loaded with `next/dynamic` + `ssr: false` (three.js cannot run
on the server) behind a Suspense placeholder, so it never blocks first paint.

A `modelPath` escape hatch swaps the procedural mesh for a scanned `.glb`
(see [3D-MODELS.md](3D-MODELS.md)) without touching any page code.

## Quiz engine

Pure logic lives in `src/lib/quiz.ts` + `src/lib/random.ts`:

- `sample` draws N distinct questions from the philosopher's pool (each pool has
  6 questions, rounds use 5).
- `prepareQuestion` shuffles the four options per question; the data convention
  is "first option = correct", and the shuffle tracks the correct index.
- Both accept an injectable RNG (`mulberry32` in tests) so the randomness is
  fully unit-testable and could power seeded "daily challenge" modes later.

`QuizEngine.tsx` is a small state machine (`intro → playing → results`) that
persists the best score per philosopher in `localStorage`.

## Testing strategy

- **Pure logic**: exhaustive unit tests with seeded RNG (shuffle invariants,
  sampling, score feedback boundaries).
- **Content**: a data-integrity suite validates every translation, slug
  cross-reference, option count and id uniqueness — content bugs fail CI, not
  production.
- **Components**: Testing Library drives a full quiz round through the real
  engine (no mocks of the logic).
- The WebGL canvas is intentionally not unit-tested (jsdom has no GL); its
  logic surface is kept near zero on purpose.

## CI

`.github/workflows/ci.yml` runs typecheck-equivalent build + tests on every
push/PR, so the badge in the README reflects real health.
