# Φ Philosophia

> **EN** · A bilingual, interactive encyclopedia of the great schools of philosophy — with AI-generated philosopher figures, rotatable 3D busts, isometric illustrations and quizzes that are different every time you play.
>
> **PT-BR** · Uma enciclopédia interativa e bilíngue das grandes escolas da filosofia — com figuras de filósofos geradas por IA, bustos 3D rotacionáveis, ilustrações isométricas e quizzes diferentes a cada rodada.

![CI](https://github.com/ghiberti85/philosophia/actions/workflows/ci.yml/badge.svg)

## ✨ Features

| Feature | Details |
| --- | --- |
| 🏛 **7 schools of thought** | From Socratic philosophy to Existentialism — each with core ideas, key thinkers, and bibliography |
| 🗿 **23+ philosopher figures** | AI-generated statue images (WebP) displayed in diorama art style; falls back to procedural 3D marble busts (react-three-fiber) when no image is available |
| 📚 **Bibliography card** | 5 essential works per school with author, year and contextual notes — replacing the old "In Sequence" stat |
| 🎴 **Accordion dossiers** | Philosopher modals use a collapsible accordion (Biography, Contributions, Quotes, Traits, Facts) instead of tabs — better on mobile |
| 🖼 **Isometric SVG scenes** | Hand-crafted, theme-aware isometric illustrations (agora, stoa, observatory, café…) that repaint for light/dark mode via CSS custom properties |
| 🌗 **Dark / light mode** | `next-themes`, system-aware, with artwork that adapts to the selected mode |
| 🌍 **i18n (EN / PT-BR)** | Type-safe localization layer; missing translations fail at compile time |
| 🎲 **Randomized quizzes** | Each round draws 5 questions from a larger pool *and* shuffles the options — a unique experience every time, with best score persisted locally |
| 📜 **Quote of the day** | Deterministic daily rotation across all philosophers' quotes |
| 🕰 **Interactive timeline** | 24 centuries of thinkers at a glance |
| ✅ **Tested** | Unit/integration tests with Vitest + Testing Library, including a content-integrity suite that validates every translation and cross-reference |

## 🧱 Tech stack

- **[Next.js 14](https://nextjs.org)** (App Router, React 18, TypeScript strict) — pages statically generated per locale
- **[react-three-fiber](https://docs.pmnd.rs/react-three-fiber) + drei + three.js** — procedural 3D busts (fallback when no figure image)
- **Custom CSS design system** — "parchment & gold / midnight & candlelight" HUD aesthetic with `color-mix(in oklch)` adaptive tokens
- **[next-themes](https://github.com/pacocoursey/next-themes)** — dark/light mode
- **[Vitest](https://vitest.dev) + Testing Library** — tests

## 🚀 Getting started

```bash
npm install
npm run dev        # http://localhost:3000 (redirects to /en; /pt for Portuguese)
```

Other scripts:

```bash
npm test           # run the test suite once
npm run test:watch # watch mode
npm run build      # production build (static)
npm start          # serve the production build
```

## 📁 Project structure

```
src/
├── app/[locale]/          # App Router pages, fully localized under /en and /pt
│   ├── page.tsx           # Home: hero, schools grid, timeline, quote of the day
│   ├── schools/           # Schools index + detail pages
│   ├── philosophers/      # Philosophers index + detail (3D bust) pages
│   └── quiz/              # Quiz index + per-philosopher quiz
├── components/
│   ├── dashboard/         # Main single-page dashboard (Dashboard.tsx, ui.tsx, css)
│   └── bust/              # 3D bust (react-three-fiber, client-only)
├── data/
│   ├── types.ts           # School, Philosopher, KeyWork, BustConfig… type definitions
│   ├── schools.ts         # 7 schools with keyWorks bibliography
│   ├── philosophers.ts    # 9 core philosophers
│   ├── philosophers-extra.ts  # Additional philosophers (14+)
│   ├── dictionary.ts      # All UI strings, EN + PT-BR
│   └── quizzes-*.ts       # Quiz question pools per philosopher
├── lib/                   # i18n, random/quiz engine, quote-of-the-day
└── test/                  # Vitest setup
public/
├── figures/               # AI-generated philosopher statue images (WebP)
├── scenes/                # Isometric school illustrations (PNG)
└── models/                # Optional .glb bust scans (see docs/3D-MODELS.md)
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for design decisions, and
[docs/ADDING-CONTENT.md](docs/ADDING-CONTENT.md) for a step-by-step guide to adding
a new philosopher, school, quiz pool or language.

## 🗿 About the philosopher figures

Each philosopher has an AI-generated statue image (`figureImage` field pointing to
`/public/figures/<slug>.webp`). These are rendered in the card dossiers in a diorama
art style. When no `figureImage` is set the component falls back to the procedural
3D bust.

For game-grade 3D realism, you can also drop a scanned `.glb` (e.g. from the
[Scan the World](https://www.myminifactory.com/scantheworld/) museum archive — many
classical busts are CC-licensed) into `public/models/` and point
`bust.modelPath` at it. Full instructions in [docs/3D-MODELS.md](docs/3D-MODELS.md).

## 📄 License

MIT — content curated for educational purposes.
