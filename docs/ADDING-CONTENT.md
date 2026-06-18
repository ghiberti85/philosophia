# Adding content

All content is typed TypeScript under `src/data/`. The compiler and the
data-integrity test suite (`npm test`) will catch anything you miss.

## Add a philosopher

### Core philosophers (`philosophers.ts`)

The file `src/data/philosophers.ts` holds the 9 core philosophers that appear
in every school's main panel. Add a record here if the philosopher is central
to one of the 8 schools and needs full treatment (biography, contributions,
quotes, traits, facts, quiz pool).

1. **Create the record** following the `Philosopher` type (`src/data/types.ts`).
   Every text field is a `{ en, pt }` record — TypeScript will not compile if a
   language key is missing.
2. **Add a figure image** (required for dashboard display): generate a statue
   image with DALL-E, convert to WebP and place it at `public/figures/<slug>.webp`:
   ```bash
   python3 -c "from PIL import Image; Image.open('in.png').save('public/figures/<slug>.webp', quality=82)"
   ```
   Then set:
   ```ts
   figureImage: '/figures/<slug>.webp',
   ```
   If omitted, a monogram letter is shown instead in the dashboard cards and modal.
3. **Link it to a school**: add the slug to `schoolSlugs` *and* add the
   philosopher's slug to that school's `philosopherSlugs` in `src/data/schools.ts`
   (the integrity tests enforce both directions).
4. **Configure the bust** (used on the `/philosophers/[slug]` detail page):
   pick `marble`/`pedestal` colors and `headWidth`, `beard`, `hair` values in
   `[0, 1]`. Use the `look` sub-config for the toon character style (skin, hair,
   cloth, hairstyle, beard, accessories). Optionally set `modelPath` for a `.glb`
   photogrammetry scan (see [3D-MODELS.md](3D-MODELS.md)).
5. **Write the quiz pool**: add at least **6 questions** (rounds use 5; pools
   must be larger than a round) in `quizzes-ancient.ts` or `quizzes-modern.ts`.
   Convention: **`options[0]` is the correct answer** — it is shuffled at
   runtime. Use unique ids like `'<slug>-1'`.
6. Run `npm test`. Pages, routes, timeline and quiz index pick the new
   philosopher up automatically.

### Extra philosophers (`philosophers-extra.ts`)

Secondary and tertiary philosophers (disciples, heirs, associated thinkers)
live in `src/data/philosophers-extra.ts`. The structure is identical to
`philosophers.ts` but the file uses a JSON-style array exported as
`philosophersExtra`. Add new records here when a philosopher is associated with
a school but not one of its primary figures.

The `figureImage` field works the same way — place the WebP in `public/figures/`
and reference it.

## Add a figure image to an existing philosopher

1. Generate the image with DALL-E (prompt: "antique marble statue of [name],
   diorama art style, dark background"). Target ~600 × 900 px portrait.
2. Convert to WebP at quality 82:
   ```bash
   python3 -c "from PIL import Image; Image.open('in.png').save('public/figures/<slug>.webp', quality=82)"
   ```
3. Open `src/data/philosophers.ts` or `src/data/philosophers-extra.ts` and add:
   ```ts
   figureImage: '/figures/<slug>.webp',
   ```
4. No further changes needed — `PhilosopherCard` and the dossier modal detect
   the field automatically.

## Add a school

1. Add a record to `src/data/schools.ts` with:
   - `scene`: one of `agora`, `academy`, `lyceum`, `stoa`, `observatory`,
     `cafe`, `library`
   - `accent`: hex color for the school's identity color
   - `keyWorks`: array of 5 `KeyWork` objects (see below)
2. **Add a scene image** (strongly recommended): generate an AI isometric city
   illustration (1536 × 1024 px, 3:2 ratio) and save it to
   `public/scenes/<slug>.png`. The hero panel renders the image at its natural
   3:2 ratio — no cropping, no overlay.
3. If no PNG is provided, the procedural SVG fallback (`IsoScene.tsx`) is shown.
   To add a brand-new SVG scene type, add a function in `IsoScene.tsx`, register
   it in the `SCENES` map, and add the name to the `School['scene']` union in
   `types.ts`.

## Add or update bibliography (key works)

Each school has a `keyWorks?: KeyWork[]` field. The `KeyWork` interface is:

```ts
interface KeyWork {
  title: Localized;    // { en: 'original title', pt: 'título em português' }
  author: Localized;   // { en: '...', pt: '...' }
  year: string;        // e.g. '380 BC' or '1781'
  note?: Localized;    // short contextual annotation { en, pt }
}
```

Aim for **5 works per school** — a mix of primary sources and influential
secondary works. The bibliography renders in the "Bibliography" stat card modal.

## Add historical events

Each school has associated historical events drawn from `src/data/historical-events.ts`.
The `HistoricalEvent` interface is:

```ts
interface HistoricalEvent {
  slug: string;                          // unique identifier
  name: Localized;                       // { en: '...', pt: '...' }
  description: Localized;                // short tooltip, 1–2 sentences
  year: string;                          // e.g. '399 BC' or 'c. 1776' or '1642–1651'
  category: 'war' | 'revolution' | 'discovery' | 'art' | 'construction' | 'disaster';
  schoolSlugs: string[];                 // associated schools
  significance: 1 | 2 | 3 | 4 | 5;      // visual weight (stars shown in modal)
  context?: Localized;                   // optional deep-dive context for modal
  iconName?: 'war' | 'book' | 'bolt' | 'landmark';  // optional icon override
}
```

**Adding an event:**

1. Open `src/data/historical-events.ts`.
2. Add a new entry to the `historicalEvents` array with all required fields bilingual.
3. Set `schoolSlugs` to the school(s) that overlap this event's time period.
4. For significance: 5 = transformative (e.g., WWI, Scientific Revolution), 1 = contextual.
5. **No further changes needed** — `HistoricalEventsPanel` queries `getEventsFor(schoolSlug)`
   and renders the top 6 events automatically; clicking opens `EventDetailModal` with
   the full context.

**Convention:** `options[0]` is significant (shown prominently in the panel); aim for
**6–10 events per school** to ensure good coverage without cluttering the dashboard.

## Add a language

1. Extend the tuple in `src/lib/i18n.ts`:
   ```ts
   export const LOCALES = ['en', 'pt', 'es'] as const;
   ```
2. Add labels to `LOCALE_LABELS` / `LOCALE_HTML_LANG`.
3. Follow the compiler: every `Localized` record in `src/data/` now fails until
   the new key is filled in. The integrity suite verifies it too.
4. Add translations to `src/data/dictionary.ts` for all UI strings.
5. The locale routes, switcher and static params derive from `LOCALES` —
   no further wiring needed.

## Add quiz questions to an existing pool

Append to the philosopher's block in the quiz data files with the next id.
Keep exactly **4 distinct options per locale** and remember the
`options[0] = correct` convention.

## Add a UI string

All user-visible UI strings (labels, tooltips, headings) live in
`src/data/dictionary.ts` as `Localized` values:

```ts
myNewLabel: { en: 'My label', pt: 'Minha legenda' },
```

Reference it in components via `t(dict.myNewLabel, locale)`. TypeScript will
enforce that both locales are always provided.
