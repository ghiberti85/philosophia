# Φ Philosophia

> **EN** · A bilingual, interactive encyclopedia of the great schools of philosophy with AI-generated philosopher figures, isometric city illustrations and quizzes that are different every time you play.
>
> **PT-BR** · Uma enciclopédia interativa e bilíngue das grandes escolas da filosofia com figuras de filósofos geradas por IA, ilustrações isométricas de cidades e quizzes diferentes a cada rodada.

![CI](https://github.com/ghiberti85/philosophia/actions/workflows/ci.yml/badge.svg)

## ✨ Features

| Feature                           | Details                                                                                                                                                                                                                                                            |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 🏛 **8 schools of thought**       | Socratic Philosophy, Platonism, Aristotelianism, Stoicism, Epicureanism, Rationalism, German Idealism, Existentialism — each with core ideas, key thinkers, deep-dive essays and bibliography                                                                      |
| 🗿 **23 philosophers**            | 9 core + 14 secondary thinkers, each with biography, contributions, quotes, traits and remarkable facts                                                                                                                                                            |
| 🖼 **AI-generated figure images** | DALL-E WebP statue images (diorama art style) for all 23 philosophers — shown in dashboard cards and modal portraits                                                                                                                                               |
| 📚 **Bibliography card**          | 5 curated essential works per school — bilingual title, author, year and contextual annotation                                                                                                                                                                     |
| 🎴 **Accordion dossiers**         | Philosopher modals with collapsible sections (Biography, Contributions, Quotes, Traits, Facts) — fully accessible without horizontal scrolling                                                                                                                     |
| 🔍 **Deep-dive ideas**            | Each core idea expands into a full essay panel; historical context opens a multi-paragraph long-read                                                                                                                                                               |
| 🎲 **138-question quiz bank**     | Three pools (ancient, modern, extra) — each round draws 5 random questions with shuffled options; best score persisted in `localStorage`                                                                                                                           |
| 📜 **Quote of the day**           | Deterministic daily rotation across all philosophers' quotes                                                                                                                                                                                                       |
| ⚔️ **Parallel historical events** | Wars, revolutions, discoveries, and cultural milestones shown alongside each school's timeline period — click to explore context and significance                                                                                                                  |
| 🕸 **Influence map**              | Force-directed canvas graph at `/graph` (zero dependencies): 23 philosophers as nodes coloured by school, arrows meaning "shaped the thought of" — hover traces a full lineage, click opens a dossier card, drag rearranges; mirrored as a crawlable lineage index |
| 🔗 **Dynamic OG images**          | Per-philosopher, per-school and per-locale Open Graph cards generated at build time with `ImageResponse` (name, epithet, quote, school accent) — every shared link becomes a poster                                                                                |
| 📲 **Score sharing**              | Web Share API button on quiz results (clipboard fallback on desktop) — "I scored 5/5 on the Socrates quiz, can you beat me?"                                                                                                                                       |
| 🕰 **Interactive timeline rail**  | Navigate all 8 schools across 24 centuries with prev/next buttons and keyboard arrow support                                                                                                                                                                       |
| 🏙 **Isometric city scenes**      | AI-generated isometric illustrations per school (PNG) fill the hero panel at natural 3:2 ratio — no cropping, no overlay, procedural SVG fallback for light/dark mode                                                                                              |
| 📱 **PWA**                        | Installable on desktop and mobile — works offline via Workbox service worker, Web App Manifest and native splash screens                                                                                                                                           |
| 🌗 **Dark / light mode**          | `next-themes`, system-aware, with "parchment & gold" (light) and "midnight & candlelight" (dark) themes                                                                                                                                                            |
| 🌍 **i18n (EN / PT-BR)**          | Type-safe localization layer; every `Localized<T>` record fails to compile if a translation is missing                                                                                                                                                             |
| ✅ **Content integrity tests**    | Vitest + Testing Library suite validates every translation, slug cross-reference, quiz option count and id uniqueness                                                                                                                                              |
| ✨ **View Transitions API**       | Morphing hero transitions between schools using `document.startViewTransition()` + `flushSync` for React state sync                                                                                                                                                |
| ⌨️ **Typewriter taglines**        | School tagline types character-by-character when switching schools, with `aria-live` for screen-readers                                                                                                                                                            |
| 🔢 **Animated Roman numerals**    | Stat counters count up from zero on school change using an ease-out cubic rAF loop                                                                                                                                                                                 |

## 🧱 Tech stack

| Layer      | Tech                                                                                                                                                       |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework  | [Next.js 14](https://nextjs.org) — App Router, React 18, TypeScript strict, static generation per locale                                                   |
| Styling    | Custom CSS design system ("Codex × HUD" skin, `color-mix(in oklch)` adaptive tokens) + Tailwind CSS utilities                                              |
| Fonts      | `next/font/google` — Playfair Display, Cormorant Garamond, JetBrains Mono, Source Sans 3 (self-hosted at build time, no render-blocking CDN request)       |
| Theming    | [next-themes](https://github.com/pacocoursey/next-themes) — dark/light with artwork that adapts                                                            |
| Animations | [Framer Motion v12](https://www.framer.com/motion/) — `AnimatePresence` modal transitions, `MotionConfig reducedMotion="user"`                             |
| PWA        | [@serwist/next](https://serwist.pages.dev) + Workbox — offline cache, installable, Web App Manifest                                                        |
| Testing    | [Vitest](https://vitest.dev) + Testing Library + [Playwright](https://playwright.dev) E2E — logic, content integrity, full quiz round, browser smoke tests |
| Quality    | ESLint (`next/core-web-vitals` + `next/typescript`) + Prettier + Husky + lint-staged — enforced in CI                                                      |
| SEO        | Native Next.js `sitemap.xml` + `robots.txt` generators + JSON-LD structured data (Organization, WebSite)                                                   |
| Security   | HTTP security headers via `next.config.mjs`: `X-Frame-Options`, `X-Content-Type-Options`, `HSTS`, `Referrer-Policy`, `Permissions-Policy`                  |

## 🚀 Getting started

```bash
npm install
npm run dev        # http://localhost:3000 (redirects to /en; /pt for Portuguese)
```

Other scripts:

```bash
npm run lint       # ESLint (next/core-web-vitals + typescript)
npm test           # run the test suite once
npm run test:watch # watch mode
npm run build      # production build (static) — also runs typecheck
npm start          # serve the production build
```

## 📁 Project structure

```
src/
├── app/[locale]/              # App Router — all routes pre-rendered in /en and /pt
│   ├── page.tsx               # Dashboard (main entry point)
│   ├── sitemap.ts             # /sitemap.xml — all school + philosopher routes in EN + PT
│   ├── robots.ts              # /robots.txt
│   └── (content)/
│       ├── schools/           # Schools index + [slug] detail pages (+ dynamic OG images)
│       ├── philosophers/      # Philosophers index + [slug] detail pages (+ dynamic OG images)
│       ├── graph/             # Influence map (force-directed canvas graph)
│       └── quiz/              # Quiz index + [slug] per-philosopher quiz
├── components/
│   ├── dashboard/             # Dashboard shell: Dashboard.tsx, Philosopher.tsx,
│   │                          #   QuizModal.tsx, IsoScene.tsx, ui.tsx, dashboard.css
│   ├── graph/                 # InfluenceGraph.tsx — canvas force simulation, no graph lib
│   └── bust/                  # FigureViewer (detail-page hero) + dormant 3D bust fallback
├── data/
│   ├── types.ts               # School, Philosopher, KeyWork, BustConfig, BustLook…
│   ├── schools.ts             # 8 schools — coreIdeas, keyWorks, philosopherSlugs, accent
│   ├── school-details.ts      # Per-idea deep-dive essays + long historical context
│   ├── philosophers.ts        # 9 core philosophers (re-exports combined array)
│   ├── philosophers-extra.ts  # 14 secondary philosophers
│   ├── dictionary.ts          # All UI strings, EN + PT-BR
│   └── quizzes-*.ts           # 138 questions across ancient / modern / extra pools
├── lib/                       # i18n helpers, seeded RNG, quiz engine, quote-of-day
└── test/                      # Vitest setup
public/
├── figures/                   # AI-generated philosopher figure images (WebP, 23 philosophers)
├── scenes/                    # AI-generated isometric city illustrations per school (PNG)
├── models/                    # Optional .glb photogrammetry scans (see docs/3D-MODELS.md)
├── icon-*.png                 # PWA icons (96, 180, 192, 512 px + maskable variants)
└── manifest.json              # Web App Manifest
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for design decisions, and
[docs/ADDING-CONTENT.md](docs/ADDING-CONTENT.md) for a step-by-step guide to adding
a new philosopher, school, quiz question or language.

## 🗿 Philosopher figures

All 23 philosophers have an AI-generated DALL-E statue image (`figureImage`) in WebP format, displayed in diorama art style in dashboard cards and modal portraits. Images live in `/public/figures/<slug>.webp`.

## 📄 License

MIT — content curated for educational purposes.
