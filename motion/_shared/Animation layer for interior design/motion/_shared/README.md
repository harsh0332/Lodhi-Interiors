# Lodhi Interiors — motion foundation

Shared layer every animation module imports. Plain HTML, CSS, vanilla JS. No build step.

## Pinned versions

| Dependency | Version | CDN |
| --- | --- | --- |
| GSAP | 3.12.5 | `https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js` |
| ScrollTrigger | 3.12.5 | `https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js` |
| Lenis | 1.1.18 | `https://cdn.jsdelivr.net/npm/lenis@1.1.18/dist/lenis.min.js` |

Nothing else is permitted. No jQuery, AOS, Locomotive, Swiper, lightbox plugins.

## Load order

```html
<link rel="stylesheet" href="/motion/_shared/tokens.css">
<link rel="stylesheet" href="/motion/_shared/motion.css">

<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.18/dist/lenis.min.js"></script>
<script src="/motion/_shared/scroll-engine.js"></script>
<!-- module files here -->
<script>LodhiMotion.init();</script>
```

`scroll-engine.js` owns the only Lenis instance and the only ScrollTrigger bridge:
`lenis.on('scroll', ScrollTrigger.update)`, `gsap.ticker.add(t => lenis.raf(t * 1000))`,
`gsap.ticker.lagSmoothing(0)`. A module that constructs Lenis or touches `gsap.ticker`
is a bug.

Under `prefers-reduced-motion: reduce` Lenis is never constructed — native scroll only.

## Data attribute API

Markup is the contract. No module may query by id or class. A React port re-emits the
same attributes and the same modules run unchanged.

| Attribute | On | Meaning |
| --- | --- | --- |
| `data-motion-module="name"` | module root | Mount point. `LodhiMotion.init()` finds these and runs the registered factory. |
| `data-motion="type"` | element | What this element does: `fade-up`, `reveal`, `mask`, `line`, `parallax`, … Module-defined, documented per module. |
| `data-motion-group` | element | Marks a stagger container. |
| `data-motion-item` | element | A member of the nearest group. |
| `data-motion-delay` | element | Seconds. Float. |
| `data-motion-stagger` | group | Seconds between items. Defaults to `STAGGER.base` (0.08). |
| `data-motion-duration` | element | Seconds. Overrides the module default. |
| `data-motion-ease` | element | One of `entrance`, `exit`, `cinematic`, `snap`. |
| `data-motion-start` | module root | ScrollTrigger `start`, e.g. `top 80%`. |
| `data-motion-end` | module root | ScrollTrigger `end`. |
| `data-motion-scrub` | module root | `true` or a number (seconds of smoothing). |
| `data-motion-once` | module root | Play once, never reverse. |
| `data-motion-speed` | element | Parallax factor, `-1`…`1`. |
| `data-motion-hover` | element | Opt in to the shared CSS hover transition. |
| `data-motion-ready` | element | Written *by* the engine after mount. Do not author it. |
| `data-motion-engine="on"` | `<html>` | Written by the engine. Gates pre-animation CSS so no-JS users see final state. |

Reserved namespace: any attribute beginning `data-motion-` belongs to this layer.

## Module contract

A module is one file that registers a factory and does nothing at load time.

```js
LodhiMotion.register("image-reveal", function (root, ctx) {
  var media = ctx.items("[data-motion='reveal']");

  LodhiMotion.respond({
    desktop: function () {
      var tl = ctx.gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: ctx.str("start", "top 75%"),
          once: root.hasAttribute("data-motion-once")
        }
      });
      tl.from(media, {
        clipPath: "inset(0% 0% 100% 0%)",
        scale: 1.06,
        duration: ctx.DURATION.cinematic,
        ease: ctx.ease("cinematic"),
        stagger: ctx.num("stagger", ctx.STAGGER.base)
      });
      return function () { tl.kill(); };        // matchMedia cleanup
    },
    mobile: function () {
      var tl = ctx.gsap.timeline({ scrollTrigger: { trigger: root, start: "top 85%", once: true } });
      tl.from(media, { opacity: 0, y: 16, duration: ctx.DURATION.base, ease: ctx.ease("entrance") });
      return function () { tl.kill(); };
    },
    reduced: function () {
      ctx.gsap.set(media, { clearProps: "all" });  // final state, zero tween
    }
  }, root);

  return { destroy: function () { /* module-owned listeners only */ } };
});
```

Rules the factory must obey:

1. Every tween lives inside `LodhiMotion.respond(...)` — three branches, always. The
   `reduced` branch creates no tween; it sets the final state or does nothing because
   the markup already *is* the final state.
2. Animate only `transform`, `opacity`, `filter`, `clip-path`. Never `width`, `height`,
   `top`, `left`, `margin`. Nothing may shift layout.
3. All content exists in the markup before JS runs. A module may hide an element for
   animation but may never create content.
4. Return `{ destroy }`. Kill only what the module made. `LodhiMotion.destroy()` reverts
   the shared matchMedia and kills stray ScrollTriggers on top of that.

### Mount / unmount

```js
LodhiMotion.init();              // whole document
LodhiMotion.init(sectionEl);     // one subtree — React useEffect mount
LodhiMotion.destroy(sectionEl);  // matching cleanup — useEffect return
LodhiMotion.destroy();           // everything, including the shared matchMedia
LodhiMotion.refresh();           // after fonts/images change measurable layout
```

`init` is idempotent per element: an already-mounted root is skipped.

## `ctx` passed to every factory

`gsap`, `ScrollTrigger`, `mm`, `MEDIA`, `EASE`, `DURATION`, `STAGGER`, `lenis`, `reduced`,
plus helpers: `ease(key)` → GSAP ease string, `num(name, fallback)` / `str(name, fallback)`
→ read `data-motion-*` off the root, `items(selector)` → elements in DOM order.

## Eases and durations

| Token | CSS | GSAP | Use |
| --- | --- | --- | --- |
| entrance | `cubic-bezier(0.22, 0.61, 0.36, 1)` | `power2.out` | Anything arriving |
| exit | `cubic-bezier(0.55, 0.06, 0.68, 0.19)` | `power2.in` | Anything leaving |
| cinematic | `cubic-bezier(0.16, 1, 0.3, 1)` | `expo.out` | Image reveals, clip-path, scale |
| snap | `cubic-bezier(0.2, 0, 0, 1)` | `power4.out` | Interface feedback |

Durations: `fast 250ms` · `base 500ms` · `slow 700ms` · `cinematic 900ms`.
CSS reads `--dur-*`; JS reads `LodhiMotion.DURATION.*` in seconds (`.ms` for milliseconds).

## matchMedia branches

| Branch | Query |
| --- | --- |
| desktop | `(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)` |
| mobile | `(max-width: 899px), (hover: none), (pointer: coarse)` |
| reduced | `(prefers-reduced-motion: reduce)` |

## Tokens

`tokens.css` sets colour, type, scale, spacing and surface rules on `:root`. Type pairing is
**Bodoni Moda** (display/headings) + **Archivo** (body/UI), each with a metric-matched
`@font-face` fallback so swap causes no shift. No shadow tokens, no gradient tokens, no radius
above 2px, 0 radius on media.

## Version history

- **1.0.0** — shared foundation: tokens, motion primitives, scroll engine, module registry.
