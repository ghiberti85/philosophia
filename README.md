# Φ Philosophia

> **EN** · A bilingual, interactive encyclopedia of the great schools of philosophy — with AI-generated philosopher figures, rotatable 3D busts, isometric city illustrations and quizzes that are different every time you play.
>
> **PT-BR** · Uma enciclopédia interativa e bilíngue das grandes escolas da filosofia — com figuras de filósofos geradas por IA, bustos 3D rotacionáveis, ilustrações isométricas de cidades e quizzes diferentes a cada rodada.

![CI](https://github.com/ghiberti85/philosophia/actions/workflows/ci.yml/badge.svg)

## ✨ Features

| Feature | Details |
| --- | --- |
| 🏛 **8 schools of thought** | Socratic Philosophy, Platonism, Aristotelianism, Stoicism, Epicureanism, Rationalism, German Idealism, Existentialism — each with core ideas, key thinkers, deep-dive essays and bibliography |
| 🗿 **23 philosopher figures** | AI-generated statue images (WebP, diorama art style) for all 23 philosophers; falls back to cel-shaded toon 3D busts (react-three-fiber) |
| 📚 **Bibliography card** | 5 curated essential works per school — author, year and contextual annotation, bilingual |
| 🎴 **Accordion dossiers** | Philosopher modals use a collapsible accordion (Biography, Contributions, Quotes, Traits, Facts) — all sections accessible without horizontal scrolling |
| 🔍 **Deep-dive ideas** | Each core idea expands into a full essay panel; historical context opens a multi-paragraph long-read |
| 🎲 **138-question quiz bank** | Three pools (ancient, modern, extra) — each round draws 5 random questions with shuffled options; best score persisted in `localStorage` |
| 📜 **Quote of the day** | Deterministic daily rotation across all philosophers' quotes |
| 🕰 **Interactive timeline rail** | Navigate all 8 schools across 24 centuries with prev/next buttons and keyboard arrow support |
| 🖼 **Isometric city scenes** | Hand-crafted isometric illustrations per school (PNG), with a procedural SVG fallback that repaints for light/dark mode |
| 🌗 **Dark / light mode** | `next-themes`, system-aware, with "parchment & gold" (light) and "midnight & candlelight" (dark) themes |
| 🌍 **i18n (EN / PT-BR)** | Type-safe localization layer; every `Localized<T>` record fails to compile if a translation is missing |
| ✅ **Content integrity tests** | Vitest + Testing Library suite validates every translation, slug cross-reference, quiz option count and id uniqueness |

## 🧱 Tech stack

| Layer | Tech |
| --- | --- |
| Framework | [Next.js 14](https://nextjs.org) — App Router, React 18, TypeScript strict, static generation per locale |
| 3D | [react-three-fiber](https://docs.pmnd.rs/react-three-fiber) + drei + three.js — cel-shaded toon busts with volumetric spotlight, gold dust particles, ContactShadows |
| Styling | Custom CSS design system — "Codex × HUD" skin, `color-mix(in oklch)` adaptive accent tokens, Playfair Display + JetBrains Mono |
| Theming | [next-themes](https://github.com/pacocoursey/next-themes) — dark/light with artwork that adapts |
| Testing | [Vitest](https://vitest.dev) + Testing Library — logic, content integrity, full quiz round |

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
├── app/[locale]/              # App Router — all routes pre-rendered in /en and /pt
│   ├── page.tsx               # Dashboard (main entry point)
│   └── (content)/
│       ├── schools/           # Schools index + [slug] detail pages
│       ├── philosophers/      # Philosophers index + [slug] detail pages
│       └── quiz/              # Quiz index + [slug] per-philosopher quiz
├── components/
│   ├── dashboard/             # Dashboard shell: Dashboard.tsx, Philosopher.tsx,
│   │                          #   QuizModal.tsx, IsoScene.tsx, ui.tsx, dashboard.css
│   └── bust/                  # Cel-shaded 3D bust (react-three-fiber, client-only)
├── data/
│   ├── types.ts               # School, Philosopher, KeyWork, BustConfig, BustLook…
│   ├── schools.ts             # 8 schools — coreIdeas, keyWorks, philosopherSlugs, accent
│   ├── school-details.ts      # Per-idea deep-dive essays + long historical context
│   ├── philosophers.ts        # 9 core philosophers
│   ├── philosophers-extra.ts  # 14 additional philosophers
│   ├── dictionary.ts          # All UI strings, EN + PT-BR
│   └── quizzes-*.ts           # 138 questions across ancient / modern / extra pools
├── lib/                       # i18n helpers, seeded RNG, quiz engine, quote-of-day
└── test/                      # Vitest setup
public/
├── figures/                   # 24 AI-generated philosopher statue images (WebP)
├── scenes/                    # Isometric city illustrations per school (PNG)
└── models/                    # Optional .glb photogrammetry scans (see docs/3D-MODELS.md)
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for design decisions, and
[docs/ADDING-CONTENT.md](docs/ADDING-CONTENT.md) for a step-by-step guide to adding
a new philosopher, school, quiz question or language.

## 🗿 Philosopher figure rendering

Three tiers, in order of priority:

1. **`figureImage`** — AI-generated WebP statue image displayed in diorama style (`/public/figures/<slug>.webp`). All 23 philosophers currently have one.
2. **`bust.modelPath`** — Photogrammetry `.glb` scan rendered in the interactive 3D viewer. Drop files into `public/models/` and point the config at them (see [docs/3D-MODELS.md](docs/3D-MODELS.md)).
3. **Procedural bust** — Cel-shaded toon character generated from `BustLook` config (skin, hair, cloth, hairstyle, beard, laurel, headband, collar). Each philosopher has a unique character design.

## 📄 License

MIT — content curated for educational purposes.
