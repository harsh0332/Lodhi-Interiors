/* Lodhi Interiors — scroll engine + module registry (shared) 1.0.0
   Owns the only Lenis instance and the only ScrollTrigger bridge.
   Requires: gsap 3.12.5, ScrollTrigger 3.12.5, lenis 1.1.18 (already loaded). */
(function (global) {
  "use strict";

  var gsap = global.gsap;
  var ScrollTrigger = global.ScrollTrigger;
  if (!gsap) { console.warn("[LodhiMotion] gsap missing — engine inert."); }

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

  var STAGGER = { base: 0.08 };

  var reduced = global.matchMedia && global.matchMedia(MEDIA.reduced).matches;
  var factories = {};
  var instances = [];
  var lenis = null;
  var booted = false;

  function boot() {
    if (booted || !gsap) { return; }
    booted = true;
    if (ScrollTrigger) { gsap.registerPlugin(ScrollTrigger); }

    /* The one and only Lenis instance + ScrollTrigger bridge. */
    if (!reduced && global.Lenis) {
      lenis = new global.Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 1 });
      if (ScrollTrigger) { lenis.on("scroll", ScrollTrigger.update); }
      gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
      gsap.ticker.lagSmoothing(0);
    }
    document.documentElement.setAttribute("data-motion-engine", "on");
  }

  /* --- respond: the only place tweens may be declared ------------------ */
  function respond(branches, root) {
    var mm = gsap.matchMedia();
    if (branches.desktop) { mm.add(MEDIA.desktop, branches.desktop); }
    if (branches.mobile) {
      mm.add(MEDIA.mobile, function (ctx) {
        /* mobile query intentionally overlaps `reduced`; the reduced branch wins. */
        if (reduced) { return; }
        return branches.mobile(ctx);
      });
    }
    if (branches.reduced) { mm.add(MEDIA.reduced, branches.reduced); }
    if (root) {
      var list = root.__lodhiMM || (root.__lodhiMM = []);
      list.push(mm);
    }
    return mm;
  }

  function makeCtx(root) {
    return {
      gsap: gsap,
      ScrollTrigger: ScrollTrigger,
      MEDIA: MEDIA,
      EASE: EASE,
      DURATION: DURATION,
      STAGGER: STAGGER,
      get lenis() { return lenis; },
      reduced: reduced,
      ease: function (key) { return EASE[key] || EASE.entrance; },
      num: function (name, fallback) {
        var v = parseFloat(root.getAttribute("data-motion-" + name));
        return isNaN(v) ? fallback : v;
      },
      str: function (name, fallback) {
        var v = root.getAttribute("data-motion-" + name);
        return (v === null || v === "") ? fallback : v;
      },
      flag: function (name) { return root.hasAttribute("data-motion-" + name); },
      items: function (sel) {
        return Array.prototype.slice.call(root.querySelectorAll(sel));
      },
      respond: function (branches) { return respond(branches, root); }
    };
  }

  function register(name, factory) { factories[name] = factory; }

  function roots(scope) {
    var host = scope || document;
    var list = Array.prototype.slice.call(host.querySelectorAll("[data-motion-module]"));
    if (scope && scope.hasAttribute && scope.hasAttribute("data-motion-module")) { list.unshift(scope); }
    return list;
  }

  function init(scope) {
    boot();
    if (!gsap) { return; }
    roots(scope).forEach(function (root) {
      if (root.hasAttribute("data-motion-ready")) { return; }
      var name = root.getAttribute("data-motion-module");
      var factory = factories[name];
      if (!factory) { console.warn("[LodhiMotion] no module registered for", name); return; }
      var api = factory(root, makeCtx(root)) || {};
      root.setAttribute("data-motion-ready", name);
      instances.push({ root: root, api: api });
    });
    if (ScrollTrigger) { ScrollTrigger.refresh(); }
  }

  function teardown(entry) {
    try { if (entry.api && entry.api.destroy) { entry.api.destroy(); } }
    catch (e) { console.warn("[LodhiMotion] destroy failed", e); }
    var list = entry.root.__lodhiMM || [];
    list.forEach(function (mm) { mm.revert(); });
    entry.root.__lodhiMM = null;
    if (entry.root.isConnected) { entry.root.removeAttribute("data-motion-ready"); }
  }

  function destroy(scope) {
    var keep = [];
    instances.forEach(function (entry) {
      var inScope = !scope || scope === entry.root || (scope.contains && scope.contains(entry.root));
      if (inScope) { teardown(entry); } else { keep.push(entry); }
    });
    instances = keep;
    if (!scope && ScrollTrigger) {
      ScrollTrigger.getAll().forEach(function (st) { st.kill(); });
    }
  }

  function refresh() {
    if (lenis) { lenis.resize(); }
    if (ScrollTrigger) { ScrollTrigger.refresh(); }
  }

  global.LodhiMotion = {
    version: "1.0.0",
    MEDIA: MEDIA, EASE: EASE, DURATION: DURATION, STAGGER: STAGGER,
    get lenis() { return lenis; },
    reduced: reduced,
    register: register,
    respond: respond,
    init: init,
    destroy: destroy,
    refresh: refresh
  };
})(window);
