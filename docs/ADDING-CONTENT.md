# Adding content

All content is typed TypeScript under `src/data/`. The compiler and the
data-integrity test suite (`npm test`) will catch anything you miss.

## Add a philosopher

1. **Create the record** in `src/data/philosophers.ts`, following the
   `Philosopher` type (`src/data/types.ts`). Every text field is a
   `{ en, pt }` record — TypeScript will not let you skip a language.
2. **Link it to a school**: add the slug to `schoolSlugs` *and* add the
   philosopher's slug to that school's `philosopherSlugs` in
   `src/data/schools.ts` (the integrity tests enforce both directions).
3. **Design the bust**: pick `marble`/`pedestal` colors and `headWidth`,
   `beard`, `hair` values in `[0, 1]`. Optionally set `modelPath` for a real
   scan (see [3D-MODELS.md](3D-MODELS.md)).
4. **Write the quiz pool**: add at least **6 questions** (rounds use 5; pools
   must be larger than a round) in `quizzes-ancient.ts` or `quizzes-modern.ts`.
   Convention: **`options[0]` is the correct answer** — it is shuffled at
   runtime. Use unique ids like `'<slug>-1'`.
5. Run `npm test`. Pages, routes, timeline and quiz index pick the new
   philosopher up automatically.

## Add a school

1. Add a record to `src/data/schools.ts` with a `scene` (one of `agora`,
   `academy`, `lyceum`, `stoa`, `observatory`, `cafe`, `library`) and an
   `accent` hex color.
2. Want a brand-new illustration? Add a scene function in
   `src/components/IsometricScene.tsx`, register it in the `SCENES` map and add
   the name to the `School['scene']` union in `types.ts`.

## Add a language

1. Extend the tuple in `src/lib/i18n.ts`:
   ```ts
   export const LOCALES = ['en', 'pt', 'es'] as const;
   ```
2. Add labels to `LOCALE_LABELS` / `LOCALE_HTML_LANG`.
3. Follow the compiler: every `Localized` record in `src/data/` now fails until
   the new key is filled in. The integrity suite verifies it too.
4. The locale routes, switcher and static params derive from `LOCALES` —
   no further wiring needed.

## Add quiz questions to an existing pool

Append to the philosopher's block in the quiz data files with the next id.
Keep exactly **4 distinct options per locale** and remember the
`options[0] = correct` convention.
