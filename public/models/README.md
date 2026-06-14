# 3D model drop zone

Place optimized `.glb` bust scans here (e.g. `socrates.glb`) and reference them
via `bust.modelPath` in `src/data/philosophers.ts` or `philosophers-extra.ts`.

See [docs/3D-MODELS.md](../../docs/3D-MODELS.md) for sourcing, conversion and
optimization instructions. Keep files under ~5 MB (Draco-compressed).

> **Note**: For a lighter-weight alternative, consider using AI-generated statue
> images (`figureImage` field pointing to `/public/figures/<slug>.webp`), which
> are preferred over `.glb` files in the rendering pipeline. See docs/3D-MODELS.md
> for the full priority order.
