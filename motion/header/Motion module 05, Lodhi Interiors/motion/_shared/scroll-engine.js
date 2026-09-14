/* Lodhi Interiors — scroll engine + module registry (shared layer) v1.0.0
   Owns the ONLY Lenis instance and the ONLY ScrollTrigger bridge.
   Modules must never construct Lenis or touch gsap.ticker.
*/
(function (global) {
  "use strict";

  if (global.LodhiMotion) return;

  var gsap = global.gsap;
  var ScrollTrigger = global.ScrollTrigger;
  if (!gsap) throw new Error("LodhiMotion: GSAP 3.12.5 must load first.");
  if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

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

  var STAGGER = { base: 0.08, tight: 0.06 };

  var reducedQuery = global.matchMedia
    ? global.matchMedia("(prefers-reduced-motion: reduce)")
    : { matches: false };

  var registry = {};
  var instances = [];
  var mm = gsap.matchMedia();
  var lenis = null;

  /* ---- Lenis: one instance, never under reduced motion ---------------- */
  function startEngine() {
    if (lenis || reducedQuery.matches || !global.Lenis) return null;
    lenis = new global.Lenis({
      duration: 1.05,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true
    });
    if (ScrollTrigger) {
      lenis.on("scroll", ScrollTrigger.update);
      ScrollTrigger.scrollerProxy && void 0;
    }
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    return lenis;
  }

  /* ---- ctx ------------------------------------------------------------ */
  function makeCtx(root) {
    function attr(name) { return root.getAttribute("data-motion-" + name); }
    return {
      gsap: gsap,
      ScrollTrigger: ScrollTrigger,
      mm: mm,
      MEDIA: MEDIA,
      EASE: EASE,
      DURATION: DURATION,
      STAGGER: STAGGER,
      get lenis() { return lenis; },
      get reduced() { return reducedQuery.matches; },
      ease: function (key) { return EASE[key] || EASE.entrance; },
      num: function (name, fallback) {
        var v = attr(name);
        if (v === null || v === "") return fallback;
        var n = parseFloat(v);
        return isNaN(n) ? fallback : n;
      },
      str: function (name, fallback) {
        var v = attr(name);
        return v === null || v === "" ? fallback : v;
      },
      items: function (selector) {
        return Array.prototype.slice.call(root.querySelectorAll(selector));
      },
      respond: function (branches) { return respond(branches, root); }
    };
  }

  /* ---- respond: three branches, always -------------------------------- */
  function respond(branches, scope) {
    if (branches.desktop) mm.add(MEDIA.desktop, branches.desktop, scope);
    if (branches.mobile) mm.add(MEDIA.mobile, branches.mobile, scope);
    if (branches.reduced) mm.add(MEDIA.reduced, branches.reduced, scope);
    return mm;
  }

  /* ---- mount / unmount ------------------------------------------------ */
  function roots(scope) {
    var node = scope || document;
    var list = Array.prototype.slice.call(node.querySelectorAll("[data-motion-module]"));
    if (node.nodeType === 1 && node.hasAttribute("data-motion-module")) list.unshift(node);
    return list;
  }

  function init(scope) {
    startEngine();
    roots(scope).forEach(function (root) {
      if (root.getAttribute("data-motion-ready") === "true") return;
      var name = root.getAttribute("data-motion-module");
      var factory = registry[name];
      if (!factory) {
        console.warn('LodhiMotion: no module registered for "' + name + '"');
        return;
      }
      var ctx = makeCtx(root);
      var api = factory(root, ctx) || {};
      root.setAttribute("data-motion-ready", "true");
      instances.push({ root: root, api: api });
    });
    if (ScrollTrigger) ScrollTrigger.refresh();
    return global.LodhiMotion;
  }

  function destroy(scope) {
    instances = instances.filter(function (entry) {
      var inside = !scope || scope === entry.root || (scope.contains && scope.contains(entry.root));
      if (!inside) return true;
      try { entry.api.destroy && entry.api.destroy(); } catch (e) { console.warn(e); }
      entry.root.removeAttribute("data-motion-ready");
      return false;
    });
    if (!scope) {
      mm.revert();
      if (ScrollTrigger) ScrollTrigger.getAll().forEach(function (st) { st.kill(); });
    }
    return global.LodhiMotion;
  }

  function refresh() { if (ScrollTrigger) ScrollTrigger.refresh(); }

  document.documentElement.setAttribute("data-motion-engine", "on");

  global.LodhiMotion = {
    version: "1.0.0",
    MEDIA: MEDIA, EASE: EASE, DURATION: DURATION, STAGGER: STAGGER,
    get lenis() { return lenis; },
    get reduced() { return reducedQuery.matches; },
    register: function (name, factory) { registry[name] = factory; return this; },
    respond: respond,
    init: init,
    destroy: destroy,
    refresh: refresh
  };
})(window);
