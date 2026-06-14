# 3D models and philosopher figures

Philosophia supports three rendering modes for each philosopher, in order of
priority:

| Priority | Field | Result |
|---|---|---|
| 1st | `figureImage` | AI-generated statue image (WebP) in diorama style |
| 2nd | `bust.modelPath` | Photogrammetry `.glb` scan rendered in the 3D bust viewer |
| 3rd | *(fallback)* | Procedural marble bust (primitives + physical material) |

---

## Option A — Philosopher figure images (recommended)

The quickest way to give a philosopher a distinctive look is an AI-generated
statue image in WebP format.

### Steps

1. **Generate or source the image** — a styled "antique marble statue" render
   works well. Target dimensions: ~600 × 900 px (portrait).
2. **Convert to WebP** at quality 82 (keeps file size under ~100 KB):
   ```bash
   python3 -c "
   from PIL import Image
   img = Image.open('input.png')
   img.save('public/figures/<slug>.webp', quality=82)
   "
   ```
3. **Reference it in data**:
   ```ts
   // src/data/philosophers.ts or philosophers-extra.ts
   figureImage: '/figures/<slug>.webp',
   ```

No other changes needed — `PhilosopherCard` and the dossier modal detect the
field and render the image automatically.

---

## Option B — Museum photogrammetry scans (`.glb`)

For game-grade 3D realism you can drop a scanned model into `public/models/`
and point `bust.modelPath` at it. This replaces the procedural bust in the
interactive 3D viewer.

### 1. Find a scan

Good sources of classical bust scans (check the license of each model):

- [Scan the World / MyMiniFactory](https://www.myminifactory.com/scantheworld/) —
  thousands of museum photogrammetry scans, including Socrates, Plato,
  Aristotle, Seneca and Marcus Aurelius (mostly CC-BY-NC).
- [Smithsonian 3D](https://3d.si.edu/) — CC0 scans.
- [Sketchfab](https://sketchfab.com/search?features=downloadable&q=bust) —
  filter by downloadable + license.

### 2. Convert and optimize to GLB

Models usually come as `.obj`/`.stl`. Convert to a compressed GLB (target
< 5 MB) with [gltf-transform](https://gltf-transform.dev/):

```bash
npm install -g @gltf-transform/cli
# obj → glb can be done in Blender (File ▸ Export ▸ glTF 2.0), then:
gltf-transform optimize input.glb socrates.glb --compress draco
```

Center the model on the origin and scale it to roughly **2.2 units tall** so it
matches the procedural bust's framing (camera at `[0, 0.4, 4.2]`).

### 3. Drop it in and point the config at it

```
public/models/socrates.glb
```

```ts
// src/data/philosophers.ts
bust: {
  marble: '#e8e2d4',
  pedestal: '#c2922f',
  headWidth: 0.85,
  beard: 0.9,
  hair: 0.35,
  modelPath: '/models/socrates.glb',   // ← add this line
},
```

That's it — `PhilosopherBust` detects `modelPath` and renders the scan with the
same lighting, shadow and rotation controls. No page code changes.

### 4. Credit the source

Add an attribution line to the philosopher's page content or the README,
as required by the model's license.

---

## Option C — Procedural bust (default)

When neither `figureImage` nor `bust.modelPath` is set, the component renders a
stylized marble bust from primitives. Configure it via `BustConfig`:

```ts
bust: {
  marble: '#e8e2d4',      // marble tint hex
  pedestal: '#b8860b',    // pedestal accent hex
  headWidth: 0.85,        // 0..1 — how wide the head is
  beard: 0.9,             // 0..1 — beard length
  hair: 0.35,             // 0..1 — hair volume (0 = bald)
  look: {                 // optional toon character override
    skin: '#c8a882',
    hair: '#3a2a1a',
    cloth: '#8b7355',
    clothAccent: '#d4a853',
    hairstyle: 'short',   // bald | short | curly | long | wig | updo | swept
    beard: 'full',        // none | trimmed | full | long | curly | goatee
    mustache: 'none',     // none | normal | grand
    laurel: false,        // golden laurel wreath
    headband: false,      // fabric headband
    collar: false,        // flat white collar / cravat
  },
},
```
