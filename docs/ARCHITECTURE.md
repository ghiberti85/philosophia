# Architecture

This document explains the main design decisions behind Philosophia.

## Goals

1. **Portfolio quality** — clean, idiomatic, typed, tested code.
2. **Performance** — everything that can be static *is* static. The whole site
   is pre-rendered at build time; the only client-side JavaScript of any weight
   is the 3D bust canvas and the quiz engine.
3. **Wow factor on a budget** — no heavy binary assets in the repo (figures are
   WebP images, scenes are SVG, and 3D busts are procedural meshes).

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

1. **CSS custom properties** (`--color-*` tokens in `dashboard.css`) for the
   main dashboard using `color-mix(in oklch)` for adaptive accent colors.
2. **SVG `--iso-*` variables** in `globals.css` for isometric artwork — the same
   SVG markup renders a sunlit marble scene in light mode and a moonlit one in
   dark mode without shipping two asset sets.

## Dashboard layout

The main UI is a single-page **dashboard** (`src/components/dashboard/`) driven
by `Dashboard.tsx`. It renders six panel areas:

| Area | Component | Description |
|---|---|---|
| `hero` | `Hero` | School name, period, tagline, scene image, Read button |
| `stats` | `Stats` + `StatModal` | 4 stat cards: Sages, Core Tenets, Quiz Pool, Bibliography |
| `ideas` | `Tenets` + `IdeaModal` | Numbered list of core ideas; clicking opens a deep-dive modal |
| `thinkers` | `Thinkers` + `PhilosopherModal` | Philosopher cards; clicking opens the dossier accordion |
| `context` | `ContextQuiz` + `ContextModal` | School description + historical context + quiz CTA |
| `rail` | `Rail` | Horizontal 24-century timeline navigation |

### Stat cards

Each of the 4 stat cards (`kind: StatKind`) opens a `StatModal`:

- **Sages** — clickable list linking to philosopher dossiers
- **Core Tenets** — clickable list opening individual idea deep-dives
- **Quiz Pool** — per-philosopher question counts + start quiz button
- **Bibliography** — 5 key works per school (`school.keyWorks`), rendered as a
  styled list with title, author, year and contextual note

### Philosopher dossier (accordion)

`PhilosopherModal` renders the philosopher's data as a collapsible **accordion**
(not tabs). This gives mobile users access to all sections without horizontal
scrolling or tab-wrapping. Biography is open by default; all other sections
(Contributions, Quotes, Traits, Facts) start collapsed but can be opened
independently.

The `Accordion` component (`ui.tsx`) keeps an internal `Set<number>` of open
indices, supporting multiple sections open simultaneously.

## Philosopher figures

Each philosopher can have an AI-generated statue image (`figureImage?: string`
in `src/data/types.ts`). When present, the dossier renders the image from
`/public/figures/<slug>.webp` in the diorama art style.

When `figureImage` is absent the component falls back to the procedural 3D bust.
When `bust.modelPath` is set it renders a photogrammetry `.glb` scan instead.

Priority: `figureImage` > `modelPath` > procedural bust.

## Bibliography data

Each `School` has an optional `keyWorks?: KeyWork[]` field:

```ts
interface KeyWork {
  title: Localized;        // { en, pt } — bilingual title
  author: Localized;       // { en, pt }
  year: string;
  note?: Localized;        // { en, pt } — short contextual annotation
}
```

All 8 schools ship with 5 curated works each. The data lives in
`src/data/schools.ts` and renders in the Bibliography stat modal.

## Isometric scenes

`IsoScene.tsx` implements a real isometric projection (30° axes) in ~20
lines and composes scenes (agora, academy, lyceum, stoa, observatory, café,
library) from a `Box`/`Column` vocabulary. Each school picks a scene + accent
color in its data record. SVG keeps them crisp at any size (~2 KB each) and
themable.

Schools can also have a pre-rendered scene image (`cityImage?: string` / a PNG
in `public/scenes/<slug>.png`) that takes priority over the procedural SVG.

## 3D busts

`PhilosopherBust.tsx` (react-three-fiber) renders a classical herm-style bust
from a few primitives with a physical "marble" material. Each philosopher's
`BustConfig` (head width, hair, beard, palette) differentiates the silhouette.
The `BustLook` sub-config enables a stylized "toon character" rendering path
with skin, hair, garment and accessory (laurel, headband, collar) options.

Interaction is **rotation only** (OrbitControls with zoom/pan disabled, gentle
auto-rotate). The component is loaded with `next/dynamic` + `ssr: false` (three.js
cannot run on the server) behind a Suspense placeholder, so it never blocks first
paint.

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

`QuizModal` is a small state machine (`intro → playing → results`) that
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
