# Using realistic scanned 3D busts

Out of the box every philosopher renders a **procedural marble bust** driven by
the `bust` config in `src/data/philosophers.ts`. To upgrade any philosopher to a
museum-grade, photoreal scan:

## 1. Find a scan

Good sources of classical bust scans (check the license of each model):

- [Scan the World / MyMiniFactory](https://www.myminifactory.com/scantheworld/) —
  thousands of museum photogrammetry scans, including Socrates, Plato,
  Aristotle, Seneca and Marcus Aurelius (mostly CC-BY-NC).
- [Smithsonian 3D](https://3d.si.edu/) — CC0 scans.
- [Sketchfab](https://sketchfab.com/search?features=downloadable&q=bust) —
  filter by downloadable + license.

## 2. Convert and optimize to GLB

Models usually come as `.obj`/`.stl`. Convert to a compressed GLB (target
< 5 MB) with [gltf-transform](https://gltf-transform.dev/):

```bash
npm install -g @gltf-transform/cli
# obj → glb can be done in Blender (File ▸ Export ▸ glTF 2.0), then:
gltf-transform optimize input.glb socrates.glb --compress draco
```

Center the model on the origin and scale it to roughly **2.2 units tall** so it
matches the procedural bust's framing (camera at `[0, 0.4, 4.2]`).

## 3. Drop it in and point the config at it

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

## 4. Credit the source

Add an attribution line to the philosopher's page content or the README,
as required by the model's license.
