/* Lodhi Interiors — scroll engine 1.0.0
   Owns the ONLY Lenis instance and the ONLY ScrollTrigger bridge.
   Owns the module registry, mount/unmount, and the matchMedia contract.
   Modules must never construct Lenis or touch gsap.ticker. */
(function (global) {
  "use strict";

  var gsap = global.gsap;
  var ScrollTrigger = global.ScrollTrigger;
  if (!gsap || !ScrollTrigger) {
    console.warn("[LodhiMotion] GSAP + ScrollTrigger are required.");
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  var reduced = global.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var MEDIA = {
    desktop: "(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    mobile: "(max-width: 899px), (hover: none), (pointer: coarse)",
    reduced: "(prefers-reduced-motion: reduce)"
  };

  var EASE = {
    entrance: "power2.out",
    exit: "power2.in",
    cinematic: "expo.out",
    snap: "power4.out"
  };

  var DURATION = {
    fast: 0.25, base: 0.5, slow: 0.7, cinematic: 0.9,
    ms: { fast: 250, base: 500, slow: 700, cinematic: 900 }
  };

  var STAGGER = { tight: 0.05, base: 0.08, loose: 0.12 };

  /* ---- Lenis: single instance, never under reduced motion --------- */
  var lenis = null;
  function startSmoothScroll() {
    if (lenis || reduced || !global.Lenis) return;
    lenis = new global.Lenis({
      duration: 1.05,
      easing: function (t) { return 1 - Math.pow(1 - t, 3); },
      smoothWheel: true,
      wheelMultiplier: 1,   /* gesture distance unchanged — no scroll-jacking */
      touchMultiplier: 1
    });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  /* ---- Registry ---------------------------------------------------- */
  var factories = {};
  var mounted = new WeakMap();
  var contexts = [];

  function ctxFor(root) {
    return {
      gsap: gsap,
      ScrollTrigger: ScrollTrigger,
      MEDIA: MEDIA,
      EASE: EASE,
      DURATION: DURATION,
      STAGGER: STAGGER,
      lenis: lenis,
      reduced: reduced,
      ease: function (key) { return EASE[key] || EASE.entrance; },
      num: function (name, fallback) {
        var v = root.getAttribute("data-motion-" + name);
        if (v === null || v === "") return fallback;
        var n = parseFloat(v);
        return isNaN(n) ? fallback : n;
      },
      str: function (name, fallback) {
        var v = root.getAttribute("data-motion-" + name);
        return v === null || v === "" ? fallback : v;
      },
      items: function (selector) {
        return Array.prototype.slice.call(root.querySelectorAll(selector));
      }
    };
  }

  /* respond(branches, root) — every tween in every module lives here.
     Each branch may return a cleanup function (GSAP matchMedia contract). */
  function respond(branches, root) {
    var mm = gsap.matchMedia();
    if (branches.desktop) mm.add(MEDIA.desktop, branches.desktop);
    if (branches.mobile) mm.add(MEDIA.mobile, branches.mobile);
    if (branches.reduced) mm.add(MEDIA.reduced, branches.reduced);
    var rec = { mm: mm, root: root || null };
    contexts.push(rec);
    return mm;
  }

  function revertContexts(scope) {
    contexts = contexts.filter(function (rec) {
      var inScope = !scope || rec.root === scope || (rec.root && scope.contains(rec.root));
      if (inScope) { try { rec.mm.revert(); } catch (e) {} }
      return !inScope;
    });
  }

  function roots(scope) {
    var node = scope || document;
    var list = [];
    if (node !== document && node.hasAttribute && node.hasAttribute("data-motion-module")) list.push(node);
    return list.concat(Array.prototype.slice.call(node.querySelectorAll("[data-motion-module]")));
  }

  function init(scope) {
    document.documentElement.setAttribute("data-motion-engine", "on");
    startSmoothScroll();
    roots(scope).forEach(function (root) {
      if (mounted.has(root)) return;                 /* idempotent per element */
      var name = root.getAttribute("data-motion-module");
      var factory = factories[name];
      if (!factory) { console.warn("[LodhiMotion] no module registered for", name); return; }
      var instance = factory(root, ctxFor(root)) || {};
      mounted.set(root, instance);
      root.setAttribute("data-motion-ready", "");
    });
    return API;
  }

  function destroy(scope) {
    roots(scope).forEach(function (root) {
      var instance = mounted.get(root);
      if (instance && typeof instance.destroy === "function") {
        try { instance.destroy(); } catch (e) { console.warn(e); }
      }
      mounted.delete(root);
      root.removeAttribute("data-motion-ready");
    });
    revertContexts(scope || null);
    ScrollTrigger.getAll().forEach(function (st) {
      var t = st.trigger || st.pin;
      if (!scope || (t && (t === scope || scope.contains(t)))) st.kill(true);
    });
    ScrollTrigger.refresh();
    return API;
  }

  function refresh() { ScrollTrigger.refresh(); return API; }

  var API = {
    version: "1.0.0",
    register: function (name, factory) { factories[name] = factory; return API; },
    init: init,
    destroy: destroy,
    refresh: refresh,
    respond: respond,
    MEDIA: MEDIA, EASE: EASE, DURATION: DURATION, STAGGER: STAGGER,
    get lenis() { return lenis; },
    reduced: reduced
  };

  global.LodhiMotion = API;
})(window);
