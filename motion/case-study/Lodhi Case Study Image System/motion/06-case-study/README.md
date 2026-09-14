# Module 06 — case study image system

Three independently mountable sub-modules for the individual project page.

| Sub-module | `data-motion-module` | Desktop | Touch / narrow | Reduced motion |
|---|---|---|---|---|
| A full-bleed reveals | `case-fullbleed` | clip-path wipe + 1.06→1 internal scale, 800ms cinematic; caption +150ms | same wipe, always upward, 700ms | all images at full size, captions visible, zero tweens |
| B gallery | `case-gallery` | CSS grid, staggered fade-up | horizontal scroll-snap, next image peeks at 78% width | scroller still scrolls and snaps |
| C before / after | `case-compare` | draggable divider, pointer + keyboard, `role="slider"` + `aria-valuenow` | images stack with Before / After labels, no divider | divider fully operable, no transition |

## Markup contract

**A** — root `[data-motion-module="case-fullbleed"]`, each photograph in a frame
`[data-motion="reveal"]` (the clip-path target, `overflow: hidden`, reserved
`--ar`) containing one `<img>` (the scale target), with the caption as
`[data-motion="caption"]` inside the same `<figure>`.
Wipe direction alternates automatically by index (even = from bottom edge,
odd = from top edge); override per figure with `data-motion-wipe="up|down"`.
Root options: `data-motion-start`, `data-motion-once`.

**B** — root `[data-motion-module="case-gallery"]` with one `[data-motion-group]`
containing `[data-motion-item]` children. `data-motion-stagger` optional.
There is deliberately **no** wheel, touch or scroll handler: direction locking
stays with the browser, so a mostly-vertical gesture always scrolls the page.
`overscroll-behavior-x: contain` keeps the horizontal rubber-band out of the
page chain; `scroll-snap-stop: always` prevents skipping past images.

**C** — root `[data-motion-module="case-compare"]` with
`[data-motion="compare-stage"]` holding two absolutely stacked layers and
`[data-motion="handle"]`. The handle is authored with its ARIA attributes in the
markup; the module only updates `aria-valuenow` / `aria-valuetext`. Keys:
arrows ±2, Shift+arrow / PageUp / PageDown ±10, Home / End. The position is
published as `--pos` (percent, drives the after layer's `clip-path`) and
`--pos-px` (drives the handle's `translate3d`), so nothing but transform and
clip-path changes while dragging.

## Performance

- Only `clip-path`, `transform` and `opacity` are animated. No layout property
  is ever touched.
- Every ratio is reserved twice — `width`/`height` on the `<img>` plus
  `aspect-ratio` on the frame — so CLS is 0 on a throttled connection.
- ScrollTriggers are created through `ScrollTrigger.batch()` (`batchMax` 3–4,
  `interval` 0.12), so a fourteen-photograph page does not carry fourteen eager
  triggers, and reveals that come into view together share one tick.
- `once: true` everywhere: triggers self-retire after they play.

## Lazy-loading recommendation

Use native lazy-loading, and decouple *loading* from *revealing*:

1. Above-the-fold photograph: no `loading` attribute, `fetchpriority="high"`.
2. Everything else: `loading="lazy" decoding="async"` with explicit
   `width`/`height`. The browser's own lazy margin starts the fetch well before
   the element reaches the reveal trigger (`top 82%`), so in practice the bitmap
   is already decoded when the wipe runs.
3. The reveal itself is gated on paintability, not on the trigger:
   `whenPaintable()` plays the timeline immediately if `img.complete &&
   naturalWidth > 0`, otherwise on `load` / `error`. An image that arrives late
   still gets its wipe instead of popping in unanimated.
4. A 1200ms (900ms on touch) fallback timer releases the gate regardless, so a
   stalled or failed request can never leave a photograph hidden behind a
   clip-path. All pre-animation gating is scoped to
   `html[data-motion-engine="on"]` inside
   `@media (prefers-reduced-motion: no-preference)` — no-JS and reduced-motion
   visitors see the final state from the first paint.
5. If you later add LQIP/blur placeholders, put them as a background on the
   frame, never as a second animated `<img>` — one decode per photograph.

## Mount / unmount

```js
LodhiMotion.init(sectionEl);     // React useEffect
LodhiMotion.destroy(sectionEl);  // useEffect return — reverts this root's
                                 // matchMedia contexts and its own listeners
```

Nothing runs at file load: `motion.js` only registers the three factories.
