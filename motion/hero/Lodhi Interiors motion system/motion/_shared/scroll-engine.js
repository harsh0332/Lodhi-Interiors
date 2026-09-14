/* Lodhi Interiors — scroll engine + module registry (shared layer, 1.0.0)
   Owns the only Lenis instance, the only ScrollTrigger bridge, the shared
   matchMedia, and the data-attribute mount/unmount lifecycle.
   A module that constructs Lenis or touches gsap.ticker is a bug.
*/
(function (global) {
  "use strict";

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

  var DURATION = { fast: 0.25, base: 0.5, slow: 0.7, cinematic: 0.9 };
  DURATION.ms = { fast: 250, base: 500, slow: 700, cinematic: 900 };

  var STAGGER = { base: 0.08, wide: 0.14 };

  var reducedMQ = global.matchMedia
    ? global.matchMedia(MEDIA.reduced)
    : { matches: false };

  var registry = {};
  var records = [];
  var recordByRoot = new WeakMap();
  var orphanMMs = [];
  var lenis = null;
  var sharedMM = null;
  var booted = false;

  function boot() {
    if (booted) return;
    var gsap = global.gsap;
    if (!gsap) return;
    booted = true;

    if (global.ScrollTrigger) gsap.registerPlugin(global.ScrollTrigger);
    sharedMM = gsap.matchMedia();

    /* Under prefers-reduced-motion Lenis is never constructed. */
    if (!reducedMQ.matches && global.Lenis) {
      lenis = new global.Lenis({ duration: 1.05, smoothWheel: true });
      if (global.ScrollTrigger) lenis.on("scroll", global.ScrollTrigger.update);
      gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
      gsap.ticker.lagSmoothing(0);
    }

    document.documentElement.setAttribute("data-motion-engine", "on");
  }

  /* ---- ctx helpers ------------------------------------------------- */
  function makeCtx(root) {
    return {
      gsap: global.gsap,
      ScrollTrigger: global.ScrollTrigger,
      mm: sharedMM,
      lenis: lenis,
      reduced: reducedMQ.matches,
      MEDIA: MEDIA,
      EASE: EASE,
      DURATION: DURATION,
      STAGGER: STAGGER,
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
      },
      respond: function (branches) { return respond(branches, root); }
    };
  }

  /* ---- respond: three branches, always ---------------------------- */
  function respond(branches, root) {
    var gsap = global.gsap;
    if (!gsap) return null;
    var mm = gsap.matchMedia();
    var rec = root ? recordByRoot.get(root) : null;
    if (rec) rec.mms.push(mm); else orphanMMs.push(mm);

    if (branches.desktop) mm.add(MEDIA.desktop, branches.desktop);
    if (branches.mobile) mm.add(MEDIA.mobile, branches.mobile);
    if (branches.reduced) mm.add(MEDIA.reduced, branches.reduced);
    return mm;
  }

  /* ---- lifecycle --------------------------------------------------- */
  function rootsIn(scope) {
    var node = scope || document;
    var found = Array.prototype.slice.call(
      node.querySelectorAll("[data-motion-module]")
    );
    if (node.nodeType === 1 && node.hasAttribute("data-motion-module")) {
      found.unshift(node);
    }
    return found;
  }

  function init(scope) {
    boot();
    if (!global.gsap) {
      console.warn("[LodhiMotion] GSAP missing — markup stays at final state.");
      return;
    }
    rootsIn(scope).forEach(function (root) {
      if (root.hasAttribute("data-motion-ready")) return; /* idempotent */
      var name = root.getAttribute("data-motion-module");
      var factory = registry[name];
      if (!factory) {
        console.warn("[LodhiMotion] no module registered for", name);
        return;
      }
      var record = { root: root, mms: [], instance: null };
      records.push(record);
      recordByRoot.set(root, record);
      record.instance = factory(root, makeCtx(root)) || null;
      root.setAttribute("data-motion-ready", "");
    });
  }

  function revert(record) {
    record.mms.forEach(function (mm) { mm.revert(); });
    record.mms.length = 0;
    if (record.instance && typeof record.instance.destroy === "function") {
      record.instance.destroy();
    }
    record.root.removeAttribute("data-motion-ready");
    recordByRoot.delete(record.root);
  }

  function destroy(scope) {
    if (!scope) {
      records.slice().forEach(revert);
      records.length = 0;
      orphanMMs.forEach(function (mm) { mm.revert(); });
      orphanMMs.length = 0;
      if (sharedMM) sharedMM.revert();
      if (global.ScrollTrigger) {
        global.ScrollTrigger.getAll().forEach(function (st) { st.kill(); });
      }
      return;
    }
    var targets = rootsIn(scope);
    records.slice().forEach(function (record) {
      if (targets.indexOf(record.root) === -1) return;
      revert(record);
      records.splice(records.indexOf(record), 1);
    });
  }

  function refresh() {
    if (lenis) lenis.resize();
    if (global.ScrollTrigger) global.ScrollTrigger.refresh();
  }

  global.LodhiMotion = {
    MEDIA: MEDIA,
    EASE: EASE,
    DURATION: DURATION,
    STAGGER: STAGGER,
    get lenis() { return lenis; },
    get reduced() { return reducedMQ.matches; },
    register: function (name, factory) { registry[name] = factory; },
    respond: respond,
    init: init,
    destroy: destroy,
    refresh: refresh
  };
})(window);
