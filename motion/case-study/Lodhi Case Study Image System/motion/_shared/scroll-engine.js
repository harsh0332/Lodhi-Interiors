/* Lodhi Interiors — scroll engine + module registry (shared, 1.0.0)
   Owns the ONLY Lenis instance and the ONLY ScrollTrigger bridge.
   Modules must never construct Lenis or touch gsap.ticker. */
(function (global) {
  "use strict";

  var gsap = global.gsap;
  var ScrollTrigger = global.ScrollTrigger;
  if (!gsap || !ScrollTrigger) {
    global.console && console.error("[LodhiMotion] GSAP + ScrollTrigger must load first.");
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  var reduced = global.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var MEDIA = {
    desktop: "(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    mobile: "(max-width: 899px), (hover: none), (pointer: coarse)",
    reduced: "(prefers-reduced-motion: reduce)"
  };

  var EASE = { entrance: "power2.out", exit: "power2.in", cinematic: "expo.out", snap: "power4.out" };
  var DURATION = {
    fast: 0.25, base: 0.5, slow: 0.7, cinematic: 0.9,
    ms: { fast: 250, base: 500, slow: 700, cinematic: 900 }
  };
  var STAGGER = { base: 0.08, wide: 0.14 };

  var registry = Object.create(null);
  var mounted = new WeakMap();
  var mm = gsap.matchMedia();
  var lenis = null;

  /* ---- Lenis: one instance, never under reduced motion ---- */
  if (!reduced && global.Lenis) {
    lenis = new global.Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  document.documentElement.setAttribute("data-motion-engine", "on");

  /* ---- helpers ---- */
  function attr(root, name, fallback) {
    var v = root.getAttribute("data-motion-" + name);
    return v === null || v === "" ? fallback : v;
  }

  function makeCtx(root) {
    return {
      gsap: gsap,
      ScrollTrigger: ScrollTrigger,
      mm: mm,
      MEDIA: MEDIA,
      EASE: EASE,
      DURATION: DURATION,
      STAGGER: STAGGER,
      lenis: lenis,
      reduced: reduced,
      ease: function (key) { return EASE[key] || EASE.entrance; },
      str: function (name, fallback) { return attr(root, name, fallback); },
      num: function (name, fallback) {
        var v = parseFloat(attr(root, name, NaN));
        return isNaN(v) ? fallback : v;
      },
      items: function (selector) {
        return Array.prototype.slice.call(root.querySelectorAll(selector));
      }
    };
  }

  /* respond(branches, root)
     Registers the three branches on the shared matchMedia and hands back the
     created contexts so a per-root destroy can revert just this module. */
  function respond(branches, root) {
    var contexts = [];
    function add(query, fn) {
      if (typeof fn !== "function") return;
      mm.add(query, function (ctx) { return fn(ctx, root); });
      var c = mm.contexts[mm.contexts.length - 1];
      if (c) contexts.push(c);
    }
    if (reduced) {
      add(MEDIA.reduced, branches.reduced);
    } else {
      add(MEDIA.desktop, branches.desktop);
      add(MEDIA.mobile, branches.mobile);
    }
    return contexts;
  }

  function roots(scope) {
    var node = scope || document;
    var list = [];
    if (node.nodeType === 1 && node.hasAttribute("data-motion-module")) list.push(node);
    return list.concat(Array.prototype.slice.call(node.querySelectorAll("[data-motion-module]")));
  }

  function register(name, factory) { registry[name] = factory; }

  function init(scope) {
    roots(scope).forEach(function (el) {
      if (mounted.has(el)) return;
      var factory = registry[el.getAttribute("data-motion-module")];
      if (!factory) return;
      var instance = factory(el, makeCtx(el)) || {};
      mounted.set(el, instance);
      el.setAttribute("data-motion-ready", "");
    });
    ScrollTrigger.refresh();
  }

  function destroy(scope) {
    roots(scope).forEach(function (el) {
      var instance = mounted.get(el);
      if (!instance) return;
      if (instance.contexts) instance.contexts.forEach(function (c) { c.revert(); });
      if (typeof instance.destroy === "function") instance.destroy();
      mounted.delete(el);
      el.removeAttribute("data-motion-ready");
    });
    if (!scope) {
      mm.revert();
      ScrollTrigger.getAll().forEach(function (st) { st.kill(); });
    }
  }

  function refresh() { ScrollTrigger.refresh(); }

  global.LodhiMotion = {
    version: "1.0.0",
    register: register,
    init: init,
    destroy: destroy,
    refresh: refresh,
    respond: respond,
    reduced: reduced,
    lenis: lenis,
    MEDIA: MEDIA,
    EASE: EASE,
    DURATION: DURATION,
    STAGGER: STAGGER
  };

  global.addEventListener("load", refresh);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
})(window);
