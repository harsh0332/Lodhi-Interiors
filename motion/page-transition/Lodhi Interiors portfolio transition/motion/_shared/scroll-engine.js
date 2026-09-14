/* Lodhi Interiors — scroll engine + module registry (1.0.0)
   Owns the ONLY Lenis instance and the ONLY ScrollTrigger bridge.
   Modules never construct Lenis and never touch gsap.ticker. */
(function (global) {
  "use strict";

  var doc = global.document;
  var gsap = global.gsap;
  var ScrollTrigger = global.ScrollTrigger;

  var MEDIA = {
    desktop: "(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    mobile: "(max-width: 899px), (hover: none), (pointer: coarse)",
    reduced: "(prefers-reduced-motion: reduce)"
  };

  var EASE = { entrance: "power2.out", exit: "power2.in", cinematic: "expo.out", snap: "power4.out" };
  var DURATION = { fast: 0.25, base: 0.5, slow: 0.7, cinematic: 0.9 };
  DURATION.ms = { fast: 250, base: 500, slow: 700, cinematic: 900 };
  var STAGGER = { tight: 0.04, base: 0.08, loose: 0.14 };

  var reduced = !!(global.matchMedia && global.matchMedia(MEDIA.reduced).matches);

  var registry = {};
  var instances = [];   // [{ root, api }]
  var mm = null;
  var lenis = null;

  if (gsap && ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  /* ---- Lenis: one instance, never under reduced motion ---------------- */
  function boot() {
    if (reduced || !gsap || !global.Lenis || lenis) return;
    lenis = new global.Lenis({
      duration: 1.05,
      easing: function (t) { return 1 - Math.pow(1 - t, 3); },
      smoothWheel: true,
      syncTouch: false
    });
    if (ScrollTrigger) lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  function machine() {
    if (!mm && gsap) mm = gsap.matchMedia();
    return mm;
  }

  /* ---- respond(): the only place a module may create tweens ----------- */
  function respond(branches, scope) {
    var m = machine();
    if (!m) { if (branches.reduced) branches.reduced(); return; }
    if (branches.desktop) m.add(MEDIA.desktop, branches.desktop, scope);
    if (branches.mobile) m.add(MEDIA.mobile, branches.mobile, scope);
    if (branches.reduced) m.add(MEDIA.reduced, branches.reduced, scope);
  }

  function ctxFor(root) {
    return {
      gsap: gsap,
      ScrollTrigger: ScrollTrigger,
      mm: machine(),
      MEDIA: MEDIA, EASE: EASE, DURATION: DURATION, STAGGER: STAGGER,
      lenis: lenis,
      reduced: reduced,
      ease: function (key) { return EASE[key] || EASE.entrance; },
      num: function (name, fallback) {
        var v = root.getAttribute("data-motion-" + name);
        return v === null || v === "" ? fallback : parseFloat(v);
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

  function roots(scope) {
    var out = [];
    if (scope && scope.nodeType === 1 && scope.hasAttribute("data-motion-module")) out.push(scope);
    var host = scope && scope.nodeType === 1 ? scope : doc;
    return out.concat(Array.prototype.slice.call(host.querySelectorAll("[data-motion-module]")));
  }

  function init(scope) {
    boot();
    doc.documentElement.setAttribute("data-motion-engine", "on");
    roots(scope).forEach(function (root) {
      if (root.hasAttribute("data-motion-ready")) return;      // idempotent
      var factory = registry[root.getAttribute("data-motion-module")];
      if (!factory) return;
      var api = factory(root, ctxFor(root)) || {};
      instances.push({ root: root, api: api });
      root.setAttribute("data-motion-ready", "");
    });
    if (ScrollTrigger) ScrollTrigger.refresh();
  }

  function destroy(scope) {
    var targets = scope ? roots(scope) : instances.map(function (i) { return i.root; });
    instances = instances.filter(function (i) {
      if (targets.indexOf(i.root) === -1) return true;
      if (typeof i.api.destroy === "function") i.api.destroy();
      i.root.removeAttribute("data-motion-ready");
      return false;
    });
    if (!scope) {
      if (mm) { mm.revert(); mm = null; }
      if (ScrollTrigger) ScrollTrigger.getAll().forEach(function (st) { st.kill(); });
    }
  }

  function refresh() { if (ScrollTrigger) ScrollTrigger.refresh(); }

  global.LodhiMotion = {
    version: "1.0.0",
    MEDIA: MEDIA, EASE: EASE, DURATION: DURATION, STAGGER: STAGGER,
    reduced: reduced,
    get lenis() { return lenis; },
    register: function (name, factory) { registry[name] = factory; },
    respond: respond,
    init: init,
    destroy: destroy,
    refresh: refresh
  };
})(window);
