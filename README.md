# Φ Philosophia

> **EN** · A bilingual, interactive encyclopedia of the great schools of philosophy — with rotatable 3D busts, isometric illustrations and quizzes that are different every time you play.
>
> **PT-BR** · Uma enciclopédia interativa e bilíngue das grandes escolas da filosofia — com bustos 3D rotacionáveis, ilustrações isométricas e quizzes diferentes a cada rodada.

![CI](https://github.com/ghiberti85/philosophia/actions/workflows/ci.yml/badge.svg)

## ✨ Features

| Feature | Details |
| --- | --- |
| 🏛 **7 schools of thought** | From Socratic philosophy to Existentialism, each with core ideas and key thinkers |
| 🗿 **9 philosophers, 3D busts** | Procedurally generated marble busts (react-three-fiber) with drag + auto rotation — swappable for real photogrammetry scans, see [docs/3D-MODELS.md](docs/3D-MODELS.md) |
| 🖼 **Isometric SVG scenes** | Hand-crafted, theme-aware isometric illustrations (temple, stoa, observatory, café…) that repaint for light/dark mode via CSS custom properties |
| 🌗 **Dark / light mode** | `next-themes`, system-aware, with artwork that adapts to the selected mode |
| 🌍 **i18n (EN / PT-BR)** | Type-safe localization layer; missing translations fail at compile time |
| 🎲 **Randomized quizzes** | Each round draws 5 questions from a larger pool *and* shuffles the options — a unique experience every time, with best score persisted locally |
| 📜 **Quote of the day** | Deterministic daily rotation across all philosophers' quotes |
| 🕰 **Interactive timeline** | 24 centuries of thinkers at a glance |
| ✅ **Tested** | 38 unit/integration tests with Vitest + Testing Library, including a content-integrity suite that validates every translation and cross-reference |

## 🧱 Tech stack

- **[Next.js 14](https://nextjs.org)** (App Router, React 18, TypeScript strict) — all 61 pages statically generated
- **[react-three-fiber](https://docs.pmnd.rs/react-three-fiber) + drei + three.js** — 3D busts
- **[Tailwind CSS](https://tailwindcss.com)** — classic "parchment & gold / midnight & candlelight" design system
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
├── components/            # UI components (Header, IsometricScene, QuizEngine…)
│   └── bust/              # 3D bust (react-three-fiber, client-only)
├── data/                  # All content: schools, philosophers, quiz pools
├── lib/                   # i18n, random/quiz engine, quote-of-the-day
└── test/                  # Vitest setup
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for design decisions, and
[docs/ADDING-CONTENT.md](docs/ADDING-CONTENT.md) for a step-by-step guide to adding
a new philosopher, school, quiz pool or language.

## 🗿 About the 3D models

The busts ship as lightweight **procedural models** (a few primitives + physical
marble material), parameterized per philosopher (`bust` config: head width, hair,
beard, marble/pedestal colors). This keeps the repo free of heavy binaries while
still delivering the rotatable-statue experience.

For game-grade realism, drop a scanned `.glb` (e.g. from the
[Scan the World](https://www.myminifactory.com/scantheworld/) museum archive — many
classical busts are CC-licensed) into `public/models/` and point
`bust.modelPath` at it. Full instructions in [docs/3D-MODELS.md](docs/3D-MODELS.md).

## 📄 License

MIT — content curated for educational purposes.
