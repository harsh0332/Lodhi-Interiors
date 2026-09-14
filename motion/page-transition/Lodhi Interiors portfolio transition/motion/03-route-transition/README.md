# Module 03 — portfolio → case study transition

Registers `route-transition`. Depends only on the shared layer (tokens, motion.css,
scroll-engine). GSAP 3.12.5 + ScrollTrigger + Lenis 1.1.18, pinned CDN. No Barba, no Swup.

## Files

    route-transition.js   the module (register + capture/play)
    index.html            demo: work index, six images
    case-study.html       demo: full-bleed hero destination
    demo.css              demo page styling only (not shared)
    img/*.svg             striped placeholders — drop real photography here

Open `index.html`, click any card, then use “← Work index” to test the reverse.
Demo paths are relative (`../_shared/…`); production uses `/motion/_shared/…`.

## Markup contract

| Attribute | On | Meaning |
|---|---|---|
| `data-motion-module="route-transition"` | work grid, case-study section | mount point |
| `data-motion="transition-link"` | `<a>` | clickable source; its `<img>` is captured |
| `data-motion="transition-target"` | destination figure | the media the clone lands on |
| `data-transition-key="slug"` | link + target | pairs them. `auto` on a link = reuse the last key (back links). `any` on a target = accept whatever arrives |
| `data-transition-source="sel"` | link | source image lives elsewhere (back link → hero) |
| `data-transition-dir="back"` | link | recorded in the payload, for analytics/logic |
| `data-motion="mask"` | destination heading | child element is masked up |
| `data-motion="fade-up"` | fact-row cells | faded in under the landing clone |
| `data-motion-item` / `data-motion-exit` | index cells, body copy | fade + drop back on exit |
| `data-motion-page` | page `<main>` | scope for the exit fade |

No ids, no classes are queried. A React port re-emits these attributes and the module
runs unchanged.

## The handover — what the React port must wire

Two functions, deliberately independent, because the two pages are not the same document:

```js
LodhiMotion.RouteTransition.capture(linkEl, { dir, scope });  // on click, source page
LodhiMotion.RouteTransition.play(scopeEl);                    // after destination mounts
```

State handed from capture → play (here: `sessionStorage["lodhi:tx"]`, JSON):

```js
{
  key:  "p-03",                       // pairs with the destination target
  src:  "/img/p-03.jpg",              // img.currentSrc — the exact rendered source
  alt:  "Arera penthouse, kitchen",
  rect: { x, y, w, h },               // viewport-relative bounding rect of the source img
  t:    1757740000000,                // Date.now(); payload is dead after 1500ms
  dir:  "forward" | "back",
  from: "/work"                       // origin route, for reverse pairing
}
```

Plus `sessionStorage["lodhi:tx:last"]` — the last key used, so a back link can declare
`data-transition-key="auto"`.

**Next.js App Router:**

1. Replace sessionStorage with a module-scope ref (or context) — same shape, same
   1500 ms freshness check. Keep sessionStorage as the fallback for hard navigations.
2. Source page: `onClick` on the `<Link>` calls `capture(e.currentTarget)` and returns.
   Never `preventDefault`, never `await`; `router.push` proceeds in the same tick.
3. Destination: in a `useLayoutEffect` on the hero component, call
   `play(sectionRef.current)`; if it returns `false`, reveal the hero content instantly
   (`revealNow` equivalent). Effect cleanup calls
   `LodhiMotion.RouteTransition.teardown()`.
4. `play` is one-shot: it consumes and clears the payload on first call, so a double
   mount in dev Strict Mode cannot run it twice.
5. The exit fade lives on the source page and dies with its unmount — it is never
   awaited.

## Motion

- Desktop: clone at the destination rect, animated **from** `x/y/scale` + `clip-path`
  inset **to** identity over **600 ms**, `expo.out` (cinematic). Uniform cover scale
  keeps the photograph undistorted; the clip-path inset trims the frame to the source
  rect’s aspect, so the crop opens as the image grows. Clone fades out over the last
  160 ms onto the real hero, then the overlay layer is removed.
- Under the clone, from 280 ms: title masked up (`yPercent 110 → 0`), fact row fading in
  with an 80 ms stagger.
- Index exit: remaining cells to `opacity 0, y 10` over 250 ms, `power2.in`.
- Only `transform`, `opacity` and `clip-path` are animated. No layout property is
  touched, nothing reflows, so the transition holds 60 fps.
- Reverse: identical maths, source = hero rect, destination = the grid cell with the
  stored key.

## Skip paths (all produce a plain instant navigation)

`prefers-reduced-motion: reduce` · `navigator.connection.saveData` or `effectiveType`
in slow-2g/2g/3g · source `<img>` missing or zero-sized · no matching destination target ·
payload older than 1500 ms · `document.hidden` · GSAP absent.

`capture` bails before writing anything, so `play` has nothing to find; the destination
simply reveals its final state. Nothing is ever queued behind a frame budget: capture is
one `getBoundingClientRect` plus a string write, and if it cannot complete the click
still navigates.

No orphaned overlay: the layer is removed on `onComplete`, on `onInterrupt`, on a 1400 ms
watchdog, on `pagehide`, on matchMedia branch change, and in `destroy()`. `destroy()` also
removes every click listener and the `pagehide` / `pageshow` handlers.

## Mobile: cross-fade vs nothing — recommendation

Both are implemented; the coarse-pointer branch currently runs the **250 ms cross-fade**,
and that is what I recommend on a mid-range Android.

Why: the cross-fade is a single composited `opacity` tween on one already-decoded
bitmap — no scale, no clip-path, so no per-frame rasterisation, and it does not care how
long the navigation itself took. It costs roughly one paint and survives on a throttled
mid-range GPU where the desktop FLIP would drop frames as the clip-path re-rasterises a
full-bleed image.

What it buys: continuity. On mobile the card is nearly full width already, so the FLIP has
almost no distance to travel — the expensive part of the desktop motion is the part
mobile does not need. The cross-fade only has to hide the hard cut, and 250 ms is enough
that the hero does not appear to flash.

Choosing nothing is defensible only on cold, slow connections, where the hero image may
not be decoded when the cross-fade ends and you get a fade to empty space. That case is
already covered by the `saveData` / slow-`effectiveType` skip, so “nothing” is reached by
policy rather than as the default.

To switch the default to nothing, change the mobile branch in `play()` to `return false;`.

## Version

1.0.0 — initial module.
