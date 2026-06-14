# Φ Philosophia

> **EN** · A bilingual, interactive encyclopedia of the great schools of philosophy — with AI-generated philosopher figures, rotatable 3D busts, isometric city illustrations and quizzes that are different every time you play.
>
> **PT-BR** · Uma enciclopédia interativa e bilíngue das grandes escolas da filosofia — com figuras de filósofos geradas por IA, bustos 3D rotacionáveis, ilustrações isométricas de cidades e quizzes diferentes a cada rodada.

![CI](https://github.com/ghiberti85/philosophia/actions/workflows/ci.yml/badge.svg)

## ✨ Features

| Feature | Details |
| --- | --- |
| 🏛 **8 schools of thought** | Socratic Philosophy, Platonism, Aristotelianism, Stoicism, Epicureanism, Rationalism, German Idealism, Existentialism — each with core ideas, key thinkers, deep-dive essays and bibliography |
| 🗿 **23 philosophers** | 9 core + 14 secondary thinkers, each with biography, contributions, quotes, traits and remarkable facts |
| 🖼 **AI-generated figure images** | DALL-E WebP statue images (diorama art style) for all 23 philosophers — shown in dashboard cards and modal portraits |
| 🔄 **Rotatable 3D busts** | react-three-fiber toon busts on each philosopher's detail page (`/philosophers/[slug]`) — procedurally generated from `BustLook` config |
| 📚 **Bibliography card** | 5 curated essential works per school — bilingual title, author, year and contextual annotation |
| 🎴 **Accordion dossiers** | Philosopher modals with collapsible sections (Biography, Contributions, Quotes, Traits, Facts) — fully accessible without horizontal scrolling |
| 🔍 **Deep-dive ideas** | Each core idea expands into a full essay panel; historical context opens a multi-paragraph long-read |
| 🎲 **138-question quiz bank** | Three pools (ancient, modern, extra) — each round draws 5 random questions with shuffled options; best score persisted in `localStorage` |
| 📜 **Quote of the day** | Deterministic daily rotation across all philosophers' quotes |
| 🕰 **Interactive timeline rail** | Navigate all 8 schools across 24 centuries with prev/next buttons and keyboard arrow support |
| 🏙 **Isometric city scenes** | AI-generated isometric illustrations per school (PNG) displayed in the hero panel; procedural SVG fallback (IsoScene) repaints for light/dark mode |
| 📱 **PWA** | Installable on desktop and mobile — works offline via Workbox service worker, manifest and native splash screens |
| 🌗 **Dark / light mode** | `next-themes`, system-aware, with "parchment & gold" (light) and "midnight & candlelight" (dark) themes |
| 🌍 **i18n (EN / PT-BR)** | Type-safe localization layer; every `Localized<T>` record fails to compile if a translation is missing |
| ✅ **Content integrity tests** | Vitest + Testing Library suite validates every translation, slug cross-reference, quiz option count and id uniqueness |

## 🧱 Tech stack

| Layer | Tech |
| --- | --- |
| Framework | [Next.js 14](https://nextjs.org) — App Router, React 18, TypeScript strict, static generation per locale |
| 3D | [react-three-fiber](https://docs.pmnd.rs/react-three-fiber) + drei + three.js — cel-shaded toon busts with volumetric spotlight, gold dust particles, ContactShadows |
| Styling | Custom CSS design system ("Codex × HUD" skin, `color-mix(in oklch)` adaptive tokens, Playfair Display + JetBrains Mono) + Tailwind CSS utilities |
| Theming | [next-themes](https://github.com/pacocoursey/next-themes) — dark/light with artwork that adapts |
| PWA | [next-pwa](https://github.com/shadowwalker/next-pwa) + Workbox — offline cache, installable, Web App Manifest |
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
│   ├── philosophers.ts        # 9 core philosophers (re-exports combined array)
│   ├── philosophers-extra.ts  # 14 secondary philosophers
│   ├── dictionary.ts          # All UI strings, EN + PT-BR
│   └── quizzes-*.ts           # 138 questions across ancient / modern / extra pools
├── lib/                       # i18n helpers, seeded RNG, quiz engine, quote-of-day
└── test/                      # Vitest setup
public/
├── figures/                   # AI-generated philosopher figure images (WebP, 23 philosophers)
├── scenes/                    # Isometric city illustrations per school (PNG)
├── models/                    # Optional .glb photogrammetry scans (see docs/3D-MODELS.md)
├── icon-*.png                 # PWA icons (96, 180, 192, 512 px + maskable variants)
└── manifest.json              # Web App Manifest
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for design decisions, and
[docs/ADDING-CONTENT.md](docs/ADDING-CONTENT.md) for a step-by-step guide to adding
a new philosopher, school, quiz question or language.

## 🗿 Philosopher rendering — two contexts

**Dashboard (main page):** Shows the `figureImage` WebP (DALL-E generated statue) in cards and the modal portrait. All 23 philosophers have one.

**Detail page (`/philosophers/[slug]`):** Always renders the interactive 3D bust via react-three-fiber — a procedural toon character built from `BustLook` config (skin, hair, cloth, hairstyle, beard, accessories like laurel or headband). A `modelPath` field can swap the procedural mesh for a scanned `.glb` file (see [docs/3D-MODELS.md](docs/3D-MODELS.md)).

## 📄 License

MIT — content curated for educational purposes.
