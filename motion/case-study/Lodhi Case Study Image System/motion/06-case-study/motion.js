/* Lodhi Interiors — module 06: case study image system
   Three independently mountable sub-modules:
     case-fullbleed  A — edge-to-edge clip-path reveals with alternating wipe
     case-gallery    B — touch horizontal scroll-snap scroller / desktop grid
     case-compare    C — before/after divider (drag + keyboard) / mobile stack
   Animates clip-path, transform, opacity only. Never creates content. */
(function (global) {
  "use strict";

  var L = global.LodhiMotion;
  if (!L) { global.console && console.error("[06-case-study] scroll-engine.js must load first."); return; }

  var WIPE = {
    up: "inset(0% 0% 100% 0%)",   /* opens from the bottom edge upward */
    down: "inset(100% 0% 0% 0%)"  /* opens from the top edge downward */
  };
  var OPEN = "inset(0% 0% 0% 0%)";

  /* Play the reveal only once the bitmap is actually decodable, so a late
     image can never appear un-animated — and can never stay hidden either:
     a hard fallback timer releases the gate no matter what the network does. */
  function whenPaintable(img, run, fallbackMs) {
    if (!img || (img.complete && img.naturalWidth > 0)) { run(); return function () {}; }
    var done = false;
    function fire() {
      if (done) return;
      done = true;
      clearTimeout(timer);
      img.removeEventListener("load", fire);
      img.removeEventListener("error", fire);
      run();
    }
    var timer = setTimeout(fire, fallbackMs || 1200);
    img.addEventListener("load", fire);
    img.addEventListener("error", fire);
    return function () {
      done = true;
      clearTimeout(timer);
      img.removeEventListener("load", fire);
      img.removeEventListener("error", fire);
    };
  }

  /* ------------------------------------------------------------------ *
   * A — full-bleed reveals
   * ------------------------------------------------------------------ */
  L.register("case-fullbleed", function (root, ctx) {
    var gsap = ctx.gsap;
    var start = ctx.str("start", "top 82%");
    var frames = ctx.items("[data-motion='reveal']").map(function (frame, i) {
      var dir = frame.getAttribute("data-motion-wipe") || (i % 2 ? "down" : "up");
      frame.setAttribute("data-motion-wipe", dir);
      return {
        frame: frame,
        img: frame.querySelector("img"),
        cap: frame.closest("figure") ? frame.closest("figure").querySelector("[data-motion='caption']") : null,
        dir: dir
      };
    });

    function finalState(f) {
      gsap.set(f.frame, { clipPath: "none" });
      gsap.set(f.img, { scale: 1 });
      if (f.cap) gsap.set(f.cap, { opacity: 1, y: 0 });
    }

    var contexts = L.respond({
      desktop: function () {
        var releases = [];
        var tweens = [];

        function reveal(frameEl) {
          var f = frames.filter(function (x) { return x.frame === frameEl; })[0];
          if (!f) return;
          releases.push(whenPaintable(f.img, function () {
            var tl = gsap.timeline({ onComplete: function () { finalState(f); } });
            tl.fromTo(f.frame,
              { clipPath: WIPE[f.dir] },
              { clipPath: OPEN, duration: 0.8, ease: ctx.ease("cinematic") }, 0);
            tl.fromTo(f.img,
              { scale: 1.06 },
              { scale: 1, duration: 0.8, ease: ctx.ease("cinematic") }, 0);
            if (f.cap) {
              tl.fromTo(f.cap,
                { opacity: 0, y: 8 },
                { opacity: 1, y: 0, duration: ctx.DURATION.base, ease: ctx.ease("entrance") }, 0.15);
            }
            tweens.push(tl);
          }));
        }

        /* Batched: one shared set of triggers, created lazily in proximity
           groups instead of one eager trigger per photograph. */
        var triggers = ctx.ScrollTrigger.batch(frames.map(function (f) { return f.frame; }), {
          interval: 0.12,
          batchMax: 3,
          start: start,
          once: true,
          onEnter: function (els) { els.forEach(reveal); }
        });

        return function () {
          triggers.forEach(function (t) { t.kill(); });
          tweens.forEach(function (t) { t.kill(); });
          releases.forEach(function (r) { r(); });
          frames.forEach(finalState);
        };
      },

      mobile: function () {
        var tweens = [];
        var releases = [];
        var triggers = ctx.ScrollTrigger.batch(frames.map(function (f) { return f.frame; }), {
          interval: 0.12,
          batchMax: 4,
          start: "top 92%",
          once: true,
          onEnter: function (els) {
            els.forEach(function (frameEl) {
              var f = frames.filter(function (x) { return x.frame === frameEl; })[0];
              if (!f) return;
              releases.push(whenPaintable(f.img, function () {
                var tl = gsap.timeline({ onComplete: function () { finalState(f); } });
                tl.fromTo(f.frame, { clipPath: WIPE.up }, { clipPath: OPEN, duration: ctx.DURATION.slow, ease: ctx.ease("cinematic") }, 0);
                if (f.cap) tl.fromTo(f.cap, { opacity: 0 }, { opacity: 1, duration: ctx.DURATION.base, ease: ctx.ease("entrance") }, 0.15);
                tweens.push(tl);
              }, 900));
            });
          }
        });
        return function () {
          triggers.forEach(function (t) { t.kill(); });
          tweens.forEach(function (t) { t.kill(); });
          releases.forEach(function (r) { r(); });
          frames.forEach(finalState);
        };
      },

      reduced: function () {
        frames.forEach(finalState);
      }
    }, root);

    return { contexts: contexts, destroy: function () {} };
  });

  /* ------------------------------------------------------------------ *
   * B — gallery: touch scroller (CSS scroll-snap) / desktop grid
   * No wheel, touch or scroll handler exists, by design: direction locking
   * stays with the browser, so a vertical gesture always scrolls the page.
   * ------------------------------------------------------------------ */
  L.register("case-gallery", function (root, ctx) {
    var gsap = ctx.gsap;
    var group = root.querySelector("[data-motion-group]") || root;
    var items = ctx.items("[data-motion-item]");
    var imgs = items.map(function (it) { return it.querySelector("img"); });

    function finalState() {
      gsap.set(items, { clearProps: "opacity,transform" });
    }

    var contexts = L.respond({
      desktop: function () {
        var tl = gsap.timeline({
          scrollTrigger: { trigger: group, start: ctx.str("start", "top 85%"), once: true },
          onComplete: finalState
        });
        tl.fromTo(items,
          { opacity: 0, y: 22 },
          {
            opacity: 1, y: 0,
            duration: ctx.DURATION.slow,
            ease: ctx.ease("entrance"),
            stagger: ctx.num("stagger", ctx.STAGGER.base)
          });
        return function () { tl.kill(); finalState(); };
      },

      mobile: function () {
        /* One trigger for the whole strip — never one per slide. */
        var release = whenPaintable(imgs[0], function () {}, 800);
        var tl = gsap.timeline({
          scrollTrigger: { trigger: group, start: "top 92%", once: true },
          onComplete: finalState
        });
        tl.fromTo(group, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: ctx.DURATION.base, ease: ctx.ease("entrance") });
        return function () { tl.kill(); release(); finalState(); };
      },

      reduced: function () { finalState(); }
    }, root);

    return { contexts: contexts, destroy: function () {} };
  });

  /* ------------------------------------------------------------------ *
   * C — before / after
   * ------------------------------------------------------------------ */
  L.register("case-compare", function (root, ctx) {
    var gsap = ctx.gsap;
    var stage = root.querySelector("[data-motion='compare-stage']");
    var handle = root.querySelector("[data-motion='handle']");
    if (!stage || !handle) return { destroy: function () {} };

    var pos = parseFloat(handle.getAttribute("aria-valuenow")) || 50;
    var authoredTabindex = handle.getAttribute("tabindex") || "0";
    var proxy = { p: pos };

    function paint(p) {
      pos = Math.max(0, Math.min(100, p));
      stage.style.setProperty("--pos", pos + "%");
      var w = stage.clientWidth;
      /* Ignore a zero-width measurement: a stale --pos-px would pin the
         divider to the left edge, away from the seam it marks. */
      if (w > 0) stage.style.setProperty("--pos-px", (w * pos) / 100 + "px");
      handle.setAttribute("aria-valuenow", Math.round(pos));
      handle.setAttribute("aria-valuetext", Math.round(pos) + "% after");
    }

    function set(p, animate) {
      if (!animate) { gsap.killTweensOf(proxy); proxy.p = p; paint(p); return; }
      gsap.to(proxy, {
        p: Math.max(0, Math.min(100, p)),
        duration: ctx.DURATION.fast,
        ease: ctx.ease("snap"),
        overwrite: true,
        onUpdate: function () { paint(proxy.p); }
      });
    }

    paint(pos);
    /* Re-measure once layout has settled (fonts, lazy images, first frame). */
    var raf = global.requestAnimationFrame(function () { paint(pos); });

    var ro = null;
    if (global.ResizeObserver) {
      ro = new ResizeObserver(function () { paint(pos); });
      ro.observe(stage);
    }

    /* Interaction (not animation): live on desktop and under reduced motion,
       torn down on touch where the markup stacks instead. */
    function enableDrag(animateKeys) {
      var dragging = false;

      function pctFromClientX(x) {
        var r = stage.getBoundingClientRect();
        return ((x - r.left) / r.width) * 100;
      }
      function onDown(e) {
        if (e.button !== undefined && e.button !== 0) return;
        dragging = true;
        handle.setPointerCapture && handle.setPointerCapture(e.pointerId);
        root.setAttribute("data-motion-dragging", "");
        set(pctFromClientX(e.clientX), false);
        e.preventDefault();
      }
      function onMove(e) { if (dragging) set(pctFromClientX(e.clientX), false); }
      function onUp() { dragging = false; root.removeAttribute("data-motion-dragging"); }
      function onStageDown(e) {
        if (e.target === handle) return;
        handle.focus();
        set(pctFromClientX(e.clientX), animateKeys);
      }
      function onKey(e) {
        var step = e.shiftKey ? 10 : 2;
        var next = null;
        if (e.key === "ArrowLeft" || e.key === "ArrowDown") next = pos - step;
        else if (e.key === "ArrowRight" || e.key === "ArrowUp") next = pos + step;
        else if (e.key === "PageDown") next = pos - 10;
        else if (e.key === "PageUp") next = pos + 10;
        else if (e.key === "Home") next = 0;
        else if (e.key === "End") next = 100;
        if (next === null) return;
        e.preventDefault();
        set(next, animateKeys);
      }

      handle.addEventListener("pointerdown", onDown);
      handle.addEventListener("pointermove", onMove);
      handle.addEventListener("pointerup", onUp);
      handle.addEventListener("pointercancel", onUp);
      handle.addEventListener("keydown", onKey);
      stage.addEventListener("pointerdown", onStageDown);
      handle.setAttribute("tabindex", authoredTabindex === "-1" ? "0" : authoredTabindex);
      handle.removeAttribute("aria-hidden");
      paint(pos);

      return function () {
        handle.removeEventListener("pointerdown", onDown);
        handle.removeEventListener("pointermove", onMove);
        handle.removeEventListener("pointerup", onUp);
        handle.removeEventListener("pointercancel", onUp);
        handle.removeEventListener("keydown", onKey);
        stage.removeEventListener("pointerdown", onStageDown);
        gsap.killTweensOf(proxy);
        onUp();
      };
    }

    var contexts = L.respond({
      desktop: function () {
        var offDrag = enableDrag(true);
        var tl = gsap.timeline({ scrollTrigger: { trigger: root, start: ctx.str("start", "top 80%"), once: true } });
        tl.fromTo(stage, { opacity: 0, scale: 1.02 }, { opacity: 1, scale: 1, duration: ctx.DURATION.slow, ease: ctx.ease("cinematic") });
        tl.fromTo(handle, { opacity: 0 }, { opacity: 1, duration: ctx.DURATION.base, ease: ctx.ease("entrance") }, 0.15);
        return function () { offDrag(); tl.kill(); gsap.set([stage, handle], { clearProps: "all" }); paint(pos); };
      },
      mobile: function () {
        handle.setAttribute("tabindex", "-1");
        handle.setAttribute("aria-hidden", "true");
        return function () {
          handle.removeAttribute("aria-hidden");
          handle.setAttribute("tabindex", authoredTabindex === "-1" ? "0" : authoredTabindex);
          paint(pos);
        };
      },
      reduced: function () {
        var offDrag = enableDrag(false);
        return function () { offDrag(); };
      }
    }, root);

    return {
      contexts: contexts,
      destroy: function () {
        if (ro) ro.disconnect();
        global.cancelAnimationFrame(raf);
      }
    };
  });
})(window);
