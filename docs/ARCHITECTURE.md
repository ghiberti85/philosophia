# Architecture

This document explains the main design decisions behind Philosophia.

## Goals

1. **Portfolio quality** — clean, idiomatic, typed, tested code.
2. **Performance** — everything that can be static _is_ static. The whole site
   is pre-rendered at build time; the only meaningful client-side JavaScript is
   the quiz engine and the 3D bust viewer (loaded only on philosopher detail pages).
3. **Wow factor on a budget** — no heavy binary assets committed to the repo;
   figures are WebP images, scenes are AI-generated PNGs with a procedural SVG
   fallback, and 3D busts on detail pages use procedural meshes.

## Stack choice

**Next.js 14 (App Router)** with React 18 and TypeScript strict. Because all
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
   main dashboard, using `color-mix(in oklch)` for per-school adaptive accent
   colors.
2. **SVG `--iso-*` variables** in `globals.css` for the procedural isometric
   fallback scenes — the same SVG renders in light or dark mode without shipping
   two asset sets.

## Dashboard layout

The main UI is a single-page **dashboard** (`src/components/dashboard/`) driven
by `Dashboard.tsx`. It renders seven panel areas:

| Area       | Component                                    | Description                                                                 |
| ---------- | -------------------------------------------- | --------------------------------------------------------------------------- |
| `hero`     | `Hero`                                       | School name, period, tagline, scene image (no overlay), Read button         |
| `stats`    | `Stats` + `StatModal`                        | 4 stat cards: Sages, Core Tenets, Quiz Pool, Bibliography                   |
| `ideas`    | `Tenets` + `IdeaModal`                       | Numbered list of core ideas; clicking opens a deep-dive modal               |
| `thinkers` | `Thinkers` + `PhilosopherModal`              | Philosopher cards; clicking opens the dossier accordion                     |
| `context`  | `ContextQuiz` + `ContextModal`               | School description + historical context + quiz CTA                          |
| `events`   | `HistoricalEventsPanel` + `EventDetailModal` | Parallel historical events (wars, revolutions, discoveries, art, disasters) |
| `rail`     | `Rail`                                       | Horizontal 24-century timeline navigation                                   |

### Hero image layout

The hero panel is a flex row: text body on the left (`flex: 1 1 auto`) and scene
image on the right (`flex: 0 0 58%`). The image is rendered in natural flow
(`position: relative; width: 100%; height: auto`) so its 3:2 aspect ratio
determines the hero height — no cropping, no letterboxing, no overlay at any
screen size. On mobile (`≤ 720px`) the layout stacks to a column with the image
first.

The scene PNG (`/public/scenes/<slug>.png`) loads via a `<SceneImage>` component
(defined inside `Dashboard.tsx`) that wraps `next/image`. If the image fails to
load, a React `useState` error flag switches the render to the procedural SVG
fallback (`IsoScene.tsx`). Using `next/image` enables automatic size optimization
and lazy loading; the `key={school.slug}` prop resets the error state on school
change.

### Stat cards

Each of the 4 stat cards (`kind: StatKind`) opens a `StatModal`:

- **Sages** — clickable list linking to philosopher dossiers
- **Core Tenets** — clickable list opening individual idea deep-dives
- **Quiz Pool** — per-philosopher question counts + start quiz button
- **Bibliography** — 5 key works per school (`school.keyWorks`), rendered as a
  styled list with bilingual title, author, year and contextual note

### Philosopher dossier (accordion)

`PhilosopherModal` renders the philosopher's data as a collapsible **accordion**
(not tabs). This gives mobile users access to all sections without horizontal
scrolling or tab-wrapping. Biography is open by default; all other sections
(Contributions, Quotes, Traits, Facts) start collapsed but can be opened
independently.

The `Accordion` component (`ui.tsx`) keeps an internal `Set<number>` of open
indices, supporting multiple sections open simultaneously.

## Philosopher figures — two rendering contexts

Philosopher visuals appear in two distinct contexts:

**Dashboard** (cards, `PhilosopherCard`, dossier modal `Portrait`):
Renders the DALL-E `figureImage` (WebP) when set; falls back to a monogram
initial letter. All 23 philosophers currently have a `figureImage`.

**Philosopher detail page** (`/philosophers/[slug]`):
Always renders an interactive 3D bust via `BustViewer` → `PhilosopherBust`
(react-three-fiber). The `bust.modelPath` field swaps the procedural mesh for a
scanned `.glb` file without touching page code. `figureImage` is not shown here.

## Bibliography data

Each `School` has an optional `keyWorks?: KeyWork[]` field:

```ts
interface KeyWork {
  title: Localized; // { en, pt } — bilingual title
  author: Localized; // { en, pt }
  year: string;
  note?: Localized; // { en, pt } — short contextual annotation
}
```

All 8 schools ship with 5 curated works each. The data lives in
`src/data/schools.ts` and renders in the Bibliography stat modal.

## Historical events panel

Each school has associated historical events drawn from `src/data/historical-events.ts`.
The `HistoricalEvent` interface captures:

```ts
interface HistoricalEvent {
  slug: string; // unique identifier
  name: Localized; // bilingual name
  description: Localized; // short tooltip text
  year: string; // formatted year(s), e.g. "431–404 BC"
  category: 'war' | 'revolution' | 'discovery' | 'art' | 'construction' | 'disaster';
  schoolSlugs: string[]; // associated schools
  significance: 1 | 2 | 3 | 4 | 5; // visual weight indicator
  context?: Localized; // optional deep-dive context
  iconName?: 'war' | 'book' | 'bolt' | 'landmark'; // optional icon override
}
```

`HistoricalEventsPanel` renders the top 6 events for the current school as a grid
of badges; clicking any badge opens `EventDetailModal` for a deep-dive. Events are
sorted by year and colored by category (red for wars, blue for discoveries, etc.).
The panel leverages the same `Localized<T>` pattern for bilingual support and appears
in the dashboard just before the timeline navigation.

## Isometric scenes

Each school has an AI-generated isometric city illustration at
`public/scenes/<slug>.png` (1536 × 1024 px, 3:2 ratio). This PNG is the
primary visual for the hero panel and school modals.

`IsoScene.tsx` implements a procedural isometric projection (30° axes) as an SVG
fallback, composing scenes from a `Box`/`Column` vocabulary. The fallback is
theme-aware (`--iso-*` CSS variables) and ~2 KB. The `School['scene']` field
selects which scene to render: `agora | academy | lyceum | stoa | observatory | cafe | library`.

## 3D busts (philosopher detail pages)

`PhilosopherBust.tsx` (react-three-fiber) renders a stylized bust from
primitives with a physical material. Each philosopher's `BustConfig` (head width,
hair, beard, marble palette) differentiates the silhouette. The `BustLook`
sub-config enables a toon character style with skin, hair, garment and accessories
(laurel, headband, collar).

The component is loaded with `next/dynamic` + `ssr: false` and never blocks first
paint. A `modelPath` field swaps the mesh for a scanned `.glb`
(see [3D-MODELS.md](3D-MODELS.md)).

## PWA

`next-pwa` (Workbox) wraps the Next.js config and generates a service worker at
build time. `public/manifest.json` declares name, icons, shortcuts and display
mode. PWA capability meta tags (`apple-mobile-web-app-capable`,
`apple-mobile-web-app-status-bar-style`, `apple-mobile-web-app-title`, `manifest`)
are declared once via `generateMetadata()` in `src/app/[locale]/layout.tsx`.
The `<head>` in the layout JSX only keeps tags that `generateMetadata` cannot
express: dual `theme-color` (light/dark media queries), `viewport` with
`viewport-fit=cover`, and the `apple-touch-icon` link. Icons (96, 180, 192,
512 px + maskable variants) are in `public/`.

## Security

HTTP security headers are set globally in `next.config.mjs` via `headers()`:

| Header                      | Value                                          |
| --------------------------- | ---------------------------------------------- |
| `X-Frame-Options`           | `DENY` — prevents clickjacking                 |
| `X-Content-Type-Options`    | `nosniff` — prevents MIME-type sniffing        |
| `Referrer-Policy`           | `strict-origin-when-cross-origin`              |
| `Permissions-Policy`        | `camera=(), microphone=(), geolocation=()`     |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |

The root redirect (`/` → `/en`) is `permanent: true` (HTTP 301) since the
default locale is fixed.

## Fonts

All typefaces are loaded via `next/font/google` in `src/app/[locale]/layout.tsx`,
which self-hosts the font files at build time and injects CSS variables on `<html>`:

| Variable             | Font                                                   |
| -------------------- | ------------------------------------------------------ |
| `--font-playfair`    | Playfair Display (display serif, cards and headings)   |
| `--font-cormorant`   | Cormorant Garamond (editorial display, modal titles)   |
| `--font-jetbrains`   | JetBrains Mono (monospace readouts, stat glyph labels) |
| `--font-source-sans` | Source Sans 3 (body copy, UI chrome)                   |

`dashboard.css` consumes these via `var(--font-*)` in the typography token
definitions. The previous `@import url("https://fonts.googleapis.com/...")` in
`dashboard.css` has been removed — it was a render-blocking external request that
caused layout shift before fonts loaded.

## Quiz engine

Pure logic in `src/lib/quiz.ts` + `src/lib/random.ts`:

- `sample` draws N distinct questions from the philosopher's pool.
- `prepareQuestion` shuffles the four options; the data convention is
  "first option = correct", tracked through the shuffle.
- Both accept an injectable RNG (`mulberry32`) for deterministic unit tests.

`QuizModal` is a small state machine (`intro → playing → results`) that persists
the best score per philosopher in `localStorage`.

## Testing strategy

- **Pure logic**: exhaustive unit tests with seeded RNG (shuffle invariants,
  sampling, score feedback boundaries).
- **Content**: a data-integrity suite validates every translation, slug
  cross-reference, option count and id uniqueness — content bugs fail CI, not
  production.
- **Components**: Testing Library drives a full quiz round through the real
  engine (no mocks of the logic).
- The WebGL canvas is intentionally not unit-tested (jsdom has no GL); its
  logic surface is kept near zero.

## Animation system

All motion is governed by a single accessibility gate: `MotionConfig reducedMotion="user"` wraps the entire React tree in `src/components/Providers.tsx`, so Framer Motion automatically disables animations when the OS `prefers-reduced-motion: reduce` flag is set. Custom hooks mirror this gate with `useReducedMotion()`.

### View Transitions API (school switching)

`Dashboard.tsx` wraps `setIdx` in `document.startViewTransition()` so the browser can morph named elements between paints. The key constraint is that React state changes must be synchronous inside the callback — solved with `flushSync`:

```ts
const doUpdate = () => flushSync(() => setIdxState(next));
if (typeof document !== 'undefined' && 'startViewTransition' in document) {
  (document as any).startViewTransition(doUpdate);
} else {
  doUpdate();
}
```

CSS assigns `view-transition-name` to three hero elements (`.hero__title`, `.hero__visual`, `.hero__period`) and custom `@keyframes` (`vt-slide-out-up`, `vt-slide-in-up`, `vt-fade-scale-out`, `vt-fade-scale-in`) control the morph animation. All rules are gated inside `@media (prefers-reduced-motion: no-preference)`.

### Shared-element transitions (philosopher card → modal)

Framer Motion `layoutId` moves the philosopher portrait from `PhilosopherCard` to `PhilosopherModal` in a continuous animated arc. Both components wrap `<Portrait>` with `<motion.div layoutId={\`portrait-${p.slug}\`}>`. A `<LayoutGroup>` at the Dashboard root scopes the shared elements so layout IDs remain unique across concurrent modals.

Modal enter/exit is handled by `AnimatePresence` in `ui.tsx` with spring physics (`stiffness: 380, damping: 30, mass: 0.8`). The `AnimatePresence` approach required removing the previous CSS `opacity`/`transform` transitions from `.modal` and `.modal-backdrop` to prevent conflicts.

### Snapshot ref pattern

When a modal closes, its data prop becomes `null` before the exit animation ends — which would flash blank content. The fix is a snapshot ref:

```ts
const snapshot = useRef<T | null>(null);
if (data) snapshot.current = data;
const active = snapshot.current; // always the last non-null value
```

Used in `PhilosopherModal`, `StatModal`, `IdeaModal`, `ContextModal`, and `EventDetailModal`.

### Typewriter hook (`useTypewriter`)

`src/components/dashboard/hooks.ts` exports `useTypewriter(text, speed)` which advances one character per `speed` ms via `setInterval`. Resets to empty string when `text` changes. Returns `{ display, done }`. The hero tagline renders the cursor span via CSS with a `tw-blink` animation; `aria-live="polite"` + `aria-atomic="true"` ensures screen-readers announce the completed phrase, not each character.

### Count-up hook (`useCountUp`)

`useCountUp(target, duration)` animates a numeric value from 0 to `target` using `requestAnimationFrame` and an ease-out cubic function (`1 - (1-t)^3`). Resets to 0 immediately when `target` changes. Stat panel numbers render as Roman numerals via a `roman()` helper wrapped in `AnimatedRoman`.

Both hooks skip animation and return the final value immediately when `useReducedMotion()` is true.

### Staggered card entrance

`PhilosopherCard` accepts a `delay` prop (ms). Cards in the `Thinkers` section render with `delay={200 + i * 55}` creating a cascade. The delay drives a CSS `--d` custom property on the `.reveal` class, which is gated in `@media (prefers-reduced-motion: no-preference)`.

## CI

`.github/workflows/ci.yml` runs on every push/PR with two jobs:

**`test-and-build`** (sequential):

1. `npm run lint` — ESLint with `next/core-web-vitals` + `next/typescript` rules
2. `npm test` — Vitest suite (50 tests across logic, content integrity, hooks and components)
3. `npm run build` — full Next.js production build, which also runs the TypeScript compiler

**`e2e`** (depends on `test-and-build`):

1. Installs Chromium via Playwright
2. Builds Next.js and starts the production server
3. Runs `npx playwright test` — browser smoke tests for navigation, school switching, quiz flow

The CI badge in the README reflects real health. Dependency updates are automated
via Dependabot (`.github/dependabot.yml`), grouped by ecosystem (Next.js, React
Three Fiber, testing tools), running weekly.
