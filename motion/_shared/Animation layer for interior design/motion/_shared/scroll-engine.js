/* Lodhi Interiors — scroll engine
 * The single Lenis instance, the single ScrollTrigger bridge, the matchMedia
 * helper, and the module registry. Nothing else. Modules import this; they
 * never create a Lenis, never touch gsap.ticker, never call ScrollTrigger.refresh
 * on their own.
 *
 * Pinned dependencies (load before this file):
 *   gsap                3.12.5
 *   ScrollTrigger       3.12.5
 *   lenis               1.1.18   (window.Lenis)
 *
 * Exposes: window.LodhiMotion
 */
(function (global) {
  "use strict";

  var VERSION = "1.0.0";
  var GSAP_VERSION = "3.12.5";
  var LENIS_VERSION = "1.1.18";

  var gsap = global.gsap;
  if (!gsap) throw new Error("[LodhiMotion] GSAP 3.12.5 must be loaded before scroll-engine.js");
  var ScrollTrigger = global.ScrollTrigger || (gsap.core && gsap.core.globals && gsap.core.globals().ScrollTrigger);
  if (!ScrollTrigger) throw new Error("[LodhiMotion] ScrollTrigger 3.12.5 must be loaded before scroll-engine.js");
  gsap.registerPlugin(ScrollTrigger);

  /* ---- Eases: cubic-bezier (CSS) + GSAP equivalent ------------------ */
  var EASE = {
    entrance:  { css: "cubic-bezier(0.22, 0.61, 0.36, 1)", gsap: "power2.out" },
    exit:      { css: "cubic-bezier(0.55, 0.06, 0.68, 0.19)", gsap: "power2.in" },
    cinematic: { css: "cubic-bezier(0.16, 1, 0.3, 1)", gsap: "expo.out" },
    snap:      { css: "cubic-bezier(0.2, 0, 0, 1)", gsap: "power4.out" }
  };

  /* ---- Durations: seconds for GSAP, ms mirrored from motion.css ----- */
  var DURATION = {
    fast: 0.25,
    base: 0.5,
    slow: 0.7,
    cinematic: 0.9,
    ms: { fast: 250, base: 500, slow: 700, cinematic: 900 }
  };

  var STAGGER = { tight: 0.04, base: 0.08, loose: 0.12 };

  /* ---- matchMedia: exactly three branches, everywhere --------------- */
  var MEDIA = {
    desktop: "(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    mobile: "(max-width: 899px), (hover: none), (pointer: coarse)",
    reduced: "(prefers-reduced-motion: reduce)"
  };

  var mm = gsap.matchMedia();

  var prefersReduced = global.matchMedia
    ? global.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  /* ---- Lenis + ScrollTrigger bridge (created once) ------------------ */
  var lenis = null;

  function startLenis() {
    if (lenis) return lenis;
    if (prefersReduced) return null;           // native scroll under reduced motion
    if (!global.Lenis) throw new Error("[LodhiMotion] Lenis 1.1.18 must be loaded before scroll-engine.js");

    lenis = new global.Lenis({
      duration: 1.1,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.4
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop: function (value) {
        if (arguments.length) lenis.scrollTo(value, { immediate: true });
        return lenis.animatedScroll;
      },
      getBoundingClientRect: function () {
        return { top: 0, left: 0, width: global.innerWidth, height: global.innerHeight };
      }
    });

    return lenis;
  }

  /* ---- Module registry ---------------------------------------------
     register(name, factory) where factory(root, ctx) -> { destroy }
     Modules are matched by [data-motion-module="name"] within the root. */
  var registry = Object.create(null);
  var mounted = [];   // { name, el, instance }

  function register(name, factory) {
    if (registry[name]) console.warn("[LodhiMotion] module re-registered:", name);
    registry[name] = factory;
    return LodhiMotion;
  }

  function ctxFor(el) {
    return {
      gsap: gsap,
      ScrollTrigger: ScrollTrigger,
      mm: mm,
      MEDIA: MEDIA,
      EASE: EASE,
      DURATION: DURATION,
      STAGGER: STAGGER,
      lenis: lenis,
      reduced: prefersReduced,
      /* Convenience: gsapEase("cinematic") -> "expo.out" */
      ease: function (key) { return (EASE[key] || EASE.entrance).gsap; },
      /* Read a numeric data-motion-* value with a fallback. */
      num: function (name, fallback) {
        var v = el.getAttribute("data-motion-" + name);
        return v === null || v === "" ? fallback : parseFloat(v);
      },
      str: function (name, fallback) {
        var v = el.getAttribute("data-motion-" + name);
        return v === null || v === "" ? fallback : v;
      },
      /* Elements inside this module, in DOM order. */
      items: function (selector) {
        return Array.prototype.slice.call(el.querySelectorAll(selector || "[data-motion]"));
      }
    };
  }

  function init(root) {
    root = root || document;
    startLenis();
    document.documentElement.setAttribute("data-motion-engine", "on");

    var nodes = Array.prototype.slice.call(root.querySelectorAll("[data-motion-module]"));
    if (root.nodeType === 1 && root.hasAttribute && root.hasAttribute("data-motion-module")) nodes.unshift(root);

    nodes.forEach(function (el) {
      if (el.__lodhiMounted) return;
      var name = el.getAttribute("data-motion-module");
      var factory = registry[name];
      if (!factory) { console.warn("[LodhiMotion] no module registered for", name); return; }
      var instance = factory(el, ctxFor(el)) || {};
      el.__lodhiMounted = true;
      el.setAttribute("data-motion-ready", "");
      mounted.push({ name: name, el: el, instance: instance });
    });

    ScrollTrigger.refresh();
    return mounted.length;
  }

  function destroy(root) {
    var keep = [];
    mounted.forEach(function (m) {
      var inScope = !root || root === document || root === m.el || (root.contains && root.contains(m.el));
      if (!inScope) { keep.push(m); return; }
      if (typeof m.instance.destroy === "function") m.instance.destroy();
      m.el.__lodhiMounted = false;
      m.el.removeAttribute("data-motion-ready");
    });
    mounted = keep;
    if (!root || root === document) {
      mm.revert();
      ScrollTrigger.getAll().forEach(function (st) { st.kill(); });
      document.documentElement.removeAttribute("data-motion-engine");
    }
    ScrollTrigger.refresh();
  }

  function refresh() { ScrollTrigger.refresh(); }

  /* Utility every module uses: run one callback per branch.
     branches: { desktop(ctx), mobile(ctx), reduced(ctx) }
     Returns the gsap.Context-aware matchMedia so callers can revert. */
  function respond(branches, scope) {
    if (branches.desktop) mm.add(MEDIA.desktop, branches.desktop, scope);
    if (branches.mobile) mm.add(MEDIA.mobile, branches.mobile, scope);
    if (branches.reduced) mm.add(MEDIA.reduced, branches.reduced, scope);
    return mm;
  }

  var LodhiMotion = {
    version: VERSION,
    versions: { gsap: GSAP_VERSION, lenis: LENIS_VERSION, scrollTrigger: GSAP_VERSION },
    EASE: EASE,
    DURATION: DURATION,
    STAGGER: STAGGER,
    MEDIA: MEDIA,
    get lenis() { return lenis; },
    get reduced() { return prefersReduced; },
    mm: mm,
    register: register,
    respond: respond,
    init: init,
    destroy: destroy,
    refresh: refresh,
    start: startLenis,
    stop: function () { if (lenis) lenis.stop(); },
    resume: function () { if (lenis) lenis.start(); },
    scrollTo: function (target, opts) { if (lenis) lenis.scrollTo(target, opts); else if (target && target.scrollIntoView) global.scrollTo(0, target.getBoundingClientRect().top + global.scrollY); }
  };

  global.LodhiMotion = LodhiMotion;
})(window);
