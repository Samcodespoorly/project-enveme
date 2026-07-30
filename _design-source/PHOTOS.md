# Build photos — manifest & handling

The redesign references real build photos. They live in the DesignSync project (**"GarageOS"**, `projectId 180b40dd-18fe-4d68-9792-5562868a16d1`) under `enveme/photos/` and `uploads/`. They are **deliberately NOT vendored** into the repo as binaries.

## Where they belong

Production images reach the redesign through the **GarageOS CMS**, not the repo:
- **Gallery photos** → uploaded via the GarageOS Gallery editor (Workstream B3) → Firebase Storage → `public/gallery` → `fetchPublicGallery()` → contact-sheet section.
- **Journal photos** → uploaded via the GarageOS Journal block editor `image` blocks (Workstream A4) → Firebase Storage → `public/journal` → journal cards + `/build/[slug]` articles.

So the swarm does **not** copy these JPGs into `public/`. Instead: Sam (or a CMS-seeding task) uploads them through GarageOS once the CMS exists, and the redesign reads the resulting URLs.

## Filename → usage map (from `content.js` / gallery)

Journal entry photos (`content.js` `JOURNAL[].photos[].src`):
- `photos/vent-dash.jpg` — Factory AC vent in the burlwood dash
- `photos/vent-removed.jpg` — Vent pulled for measuring up
- `photos/vent-bench-2.jpg` — Centre trim & vents off the car
- `photos/soldering-acc.jpg` — Soldering the ACC tap into the loom
- `photos/hvac-1.jpg` — Climate stack out for access
- `photos/gaskets-cam.jpg` — Cam covers off for the gasket job
- `photos/gaskets-night.jpg` — Breather lines & plug leads
- `photos/engine-bay-kn.jpg` — 2JZ-GE bay / K&N drop-in

Contact-sheet gallery (`content.js` `GALLERY[]`): reuses the above plus
- `photos/vent-bench-1.jpg` — Trim & vent off the car
- `photos/dash-vents.jpg` — Centre vents · dash

Additional raw uploads in DesignSync `uploads/` (originals, various `IMG_*.JPG` and named vent shots) are Sam's source images — pick/crop as needed when seeding the CMS.

## 3D asset

`enveme/assets/toyota_soarer_modified.glb` is the hero car model used by `scene.js` (`loader.load('../assets/toyota_soarer_modified.glb', …)`). The ENVEME repo already ships a Soarer GLB in `public/` — **confirm which model to use** (the DesignSync one may be newer/different) before wiring D2. If using the DesignSync GLB, export it to `public/` and update the load path.
