# `image-slot.js` — DO NOT PORT

`enveme/image-slot.js` is a **Claude Design authoring scaffold**, not production code. It is a custom `<image-slot>` web component that lets the *designer* drag-and-drop an image onto a placeholder while editing in the Claude Design canvas. It persists drops to a `.image-slots.state.json` sidecar via `window.omelette.writeFile`, and is **read-only outside the omelette runtime** (i.e. it does nothing useful in production).

## Why it must not ship

- It depends on `window.omelette`, which does not exist in the deployed Next.js app.
- It stores images as base64 data-URLs in a JSON sidecar — wrong for production (bloat, no CDN, no caching).
- Production images for ENVEME come from the **GarageOS CMS → Firebase Storage → `public/gallery` / `public/journal`** pipeline (master spec Workstreams A4/B3/C7).

## What to do instead

Wherever the design uses `<image-slot id="…" src="…" placeholder="…">` (the contact-sheet gallery in `content.js`, `renderGallery`), the React port renders a normal **`next/image`** fed by a CMS URL from `fetchPublicGallery()`. Preserve the *visual* frame treatment (the `.frameblk .holder` corner-ticks, aspect ratios, `wide`/`tall` spans, the `.fcap` caption row) — just swap the fillable component for a static optimised image.

The canonical `image-slot.js` lives in DesignSync (`projectId 180b40dd-18fe-4d68-9792-5562868a16d1`, `enveme/image-slot.js`) if anyone ever needs to inspect it. It is intentionally **not vendored** into this repo to avoid an agent porting it by mistake.
