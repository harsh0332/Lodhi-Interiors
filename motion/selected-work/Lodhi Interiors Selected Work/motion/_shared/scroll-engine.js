/* Lodhi Interiors — scroll engine + module registry (shared layer, v1.0.0)
   Owns: the single Lenis instance, the single ScrollTrigger bridge, the single
   gsap.matchMedia, and the module registry. Modules never touch these. */
(function (global) {
  "use strict";

  if (!global.gsap || !global.ScrollTrigger) {
    console.error("[LodhiMotion] GSAP + ScrollTrigger must load before scroll-engine.js");
    return;
  }

  var gsap = global.gsap;
  var ScrollTrigger = global.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);

  var EASE = {
    entrance: "power2.out",
    exit: "power2.in",
    cinematic: "expo.out",
    snap: "power4.out"
  };

  var DURATION = {
    fast: 0.25,
    base: 0.5,
    slow: 0.7,
    cinematic: 0.9,
    ms: { fast: 250, base: 500, slow: 700, cinematic: 900 }
  };

  var STAGGER = { base: 0.08, wide: 0.14 };

  var MEDIA = {
    desktop: "(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    mobile: "(max-width: 899px), (hover: none), (pointer: coarse)",
    reduced: "(prefers-reduced-motion: reduce)"
  };

  var reduced = global.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var registry = {};
  var instances = [];
  var mm = null;
  var lenis = null;
  var booted = false;
  var mounting = null; /* record currently being constructed */

  document.documentElement.setAttribute("data-motion-engine", "on");

  function matchMediaInstance() {
    if (!mm) mm = gsap.matchMedia();
    return mm;
  }

  /* The only Lenis instance and the only ScrollTrigger bridge. */
  function boot() {
    if (booted) return;
    booted = true;
    matchMediaInstance();
    if (reduced || !global.Lenis) return; /* reduced motion: native scroll only */

    lenis = new global.Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6
    });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  function readAttr(root, name) {
    return root.getAttribute("data-motion-" + name);
  }

  function makeCtx(root) {
    return {
      gsap: gsap,
      ScrollTrigger: ScrollTrigger,
      mm: matchMediaInstance(),
      MEDIA: MEDIA,
      EASE: EASE,
      DURATION: DURATION,
      STAGGER: STAGGER,
      get lenis() { return lenis; },
      reduced: reduced,
      ease: function (key) { return EASE[key] || EASE.entrance; },
      num: function (name, fallback) {
        var v = parseFloat(readAttr(root, name));
        return isNaN(v) ? fallback : v;
      },
      str: function (name, fallback) {
        var v = readAttr(root, name);
        return v === null || v === "" ? fallback : v;
      },
      items: function (selector) {
        return Array.prototype.slice.call(root.querySelectorAll(selector));
      }
    };
  }

  /* Every module tween lives inside this. Three branches, always. */
  function respond(branches, scope) {
    var media = matchMediaInstance();
    var record = mounting;
    ["desktop", "mobile", "reduced"].forEach(function (key) {
      var fn = branches[key];
      if (typeof fn !== "function") return;
      media.add(MEDIA[key], fn, scope || undefined);
      var contexts = media.contexts || [];
      var made = contexts[contexts.length - 1];
      if (record && made) record.contexts.push(made);
    });
  }

  function mount(el) {
    if (el.hasAttribute("data-motion-ready")) return; /* idempotent */
    var name = el.getAttribute("data-motion-module");
    var factory = registry[name];
    if (!factory) {
      console.warn('[LodhiMotion] no module registered for "' + name + '"');
      return;
    }
    boot();
    var record = { root: el, contexts: [], api: null };
    el.setAttribute("data-motion-ready", "");
    mounting = record;
    try {
      record.api = factory(el, makeCtx(el)) || null;
    } catch (err) {
      console.error('[LodhiMotion] module "' + name + '" failed to mount', err);
    }
    mounting = null;
    instances.push(record);
  }

  function unmount(record) {
    if (record.api && typeof record.api.destroy === "function") {
      try { record.api.destroy(); } catch (err) { console.error(err); }
    }
    record.contexts.forEach(function (c) {
      if (c && typeof c.kill === "function") c.kill(true);
    });
    record.contexts.length = 0;
    if (record.root) record.root.removeAttribute("data-motion-ready");
  }

  var LodhiMotion = {
    EASE: EASE,
    DURATION: DURATION,
    STAGGER: STAGGER,
    MEDIA: MEDIA,
    reduced: reduced,
    get lenis() { return lenis; },
    respond: respond,

    register: function (name, factory) {
      registry[name] = factory;
      return LodhiMotion;
    },

    init: function (root) {
      var scope = root || document;
      var nodes = [];
      if (scope.nodeType === 1 && scope.matches("[data-motion-module]")) nodes.push(scope);
      nodes = nodes.concat(
        Array.prototype.slice.call(scope.querySelectorAll("[data-motion-module]"))
      );
      nodes.forEach(mount);
      return LodhiMotion;
    },

    destroy: function (root) {
      if (!root) {
        instances.forEach(unmount);
        instances.length = 0;
        if (mm) mm.revert();
        ScrollTrigger.getAll().forEach(function (t) { t.kill(); });
        return LodhiMotion;
      }
      instances = instances.filter(function (record) {
        if (record.root === root || root.contains(record.root)) {
          unmount(record);
          return false;
        }
        return true;
      });
      return LodhiMotion;
    },

    refresh: function () {
      ScrollTrigger.refresh();
      if (lenis) lenis.resize();
      return LodhiMotion;
    }
  };

  global.LodhiMotion = LodhiMotion;
})(window);
