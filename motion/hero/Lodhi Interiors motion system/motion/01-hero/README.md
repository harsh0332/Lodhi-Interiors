# Module 01 — hero and first-load sequence

`/motion/01-hero/` · index.html · style.css · motion.js

The site's one orchestrated moment. Registers a single factory as
`LodhiMotion.register("hero", …)` and does nothing at load time.

## Files in this folder
- `index.html` — markup, including the art-directed `<picture>` pattern.
- `style.css` — component styles only; tokens and motion primitives come from `_shared/`.
- `motion.js` — the factory.
- `hero-landscape.svg`, `hero-portrait.svg` — striped placeholders. Replace with the real
  photograph (landscape ~16:10, portrait ~9:13). Keep `width`/`height` attributes accurate —
  they are what keeps CLS at zero.

Paths here are relative (`../_shared/tokens.css`) so the folder previews standalone;
switch to the absolute `/motion/_shared/…` form when it ships inside the site.

## Data attributes consumed

| Attribute | On | Effect |
|---|---|---|
| `data-motion-module="hero"` | `.hero` | Mount point. |
| `data-motion="media"` | image wrapper | Its `<img>` gets the blur→sharp + 1.05→1 tween and the parallax. |
| `data-motion="text-layer"` | copy wrapper | The faster-moving parallax layer. |
| `data-motion="mask"` | `<h1>` | Split into measured lines at runtime and revealed from 110%. |
| `data-motion-group` | support wrapper | Stagger container. |
| `data-motion-item` | lede, action | Fade up 16px after the headline. |
| `data-motion="cue"` | scroll cue | Fades in last, then breathes. |
| `data-motion-stagger` | `.hero` | Seconds between headline lines and between support items. Default `0.08`. |
| `data-motion-speed` | `.hero` | Parallax factor for the image, as a fraction of hero height. Default `0.08`. |
| `data-motion-start` / `data-motion-end` | `.hero` | ScrollTrigger bounds. Default `top top` / `bottom top`. |
| `data-motion-once` | `.hero` | Declared for contract parity; the intro is already once-per-session. |
| `data-motion-hover` | nav, action | Shared CSS hover transition from `motion.css`. |
| `data-motion-split` | `<h1>` | Written by the module after measuring. Do not author. |
| `data-motion-engine="on"` | `<html>` | Written by the engine. Gates every pre-animation rule. |

## Sequence budget (desktop)

| Step | Start | Duration |
|---|---|---|
| Image blur 12px→0, scale 1.05→1 | 0 | 900ms `cinematic` |
| Headline lines, 110%→0 | 100ms | 600ms each, 80ms stagger |
| Lede + action, fade up 16px | last line + 200ms | 500ms `entrance` |
| Cue fade in | support + 150ms | 250ms |

Ends at ~1.56s with a three-line headline. Mobile multiplies every duration by `0.7`.

## Safe to tune
- `data-motion-speed` — 0.04…0.12. Above 0.12 the image edge can approach the 16% overscan
  built into `.hero__media`; raise the overscan in `style.css` in step if you go higher.
- `data-motion-stagger` — 0.06…0.12.
- `TEXT_DEPTH` (motion.js) — 1.5…2.5. How much faster the text layer travels than the image.
- `CUE_LOOP` — distance 4…8px, duration 2.8…4s. Set `CUE_LOOP` aside and delete the
  `breathe()` calls if the loop reads as distracting; nothing else depends on it.
- `MOBILE_FACTOR` — 0.65…0.8.
- Blur seed `blur(12px)` — 8…16px. Blur is the only filter used; it is GPU-composited and
  runs on the image element alone.
- `.hero__img { object-position }` in `style.css`, per breakpoint, to hold the room's focal point.

## Not tunable without breaking the contract
- Only `transform`, `opacity`, `filter` and `clip-path` are animated. The image's paint is
  never gated on JS (no opacity-from-zero), because it is the LCP element.
- The headline's masks are measured at runtime with the display face active (`fonts.ready`
  raced against a 400ms timer — never a rAF, which does not fire in a hidden tab). A
  `ResizeObserver` on `.hero__copy` catches genuine reflows, and a settle pass ~300ms after mount
  (plus `window.load`) re-measures unconditionally and remounts the root when the live desktop
  media query disagrees with whether the parallax trigger exists — so a mount that commits before
  the page's layout/media state settles self-corrects, and 360 / 768 / 1440 all clip correctly.
  `<picture>` art direction is evaluated at first fetch only; a browser does not re-select a
  source for an already-loaded image, so judge the desktop crop on a cold load above 900px.
- The headline is never hidden by CSS: the markup is the final state, so a stall leaves the hero
  readable rather than blank.
- `reduced` branch creates no tween: image sharp and unscaled, all text visible, no parallax,
  no loop.
- `destroy()` disconnects the ResizeObserver, kills the cue loop, reverts the matchMedia branches
  (which kills the parallax ScrollTrigger) and restores the headline's original text node.
