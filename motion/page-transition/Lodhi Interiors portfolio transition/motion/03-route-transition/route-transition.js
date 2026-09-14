/* Lodhi Interiors — module 03: portfolio → case study transition
   Registers "route-transition". Does nothing at load time.

   Two halves, deliberately separate so the Next.js port can wire them across
   a route change:

     LodhiMotion.RouteTransition.capture(linkEl, opts)  // runs on click, source page
     LodhiMotion.RouteTransition.play(scopeEl)          // runs after destination mounts

   Handover payload (sessionStorage key "lodhi:tx", see README):
     { key, src, alt, rect:{x,y,w,h}, t, dir, from }

   Navigation is never blocked: the click handler does not call preventDefault,
   does not await anything, and the animation is discarded if it cannot start.

   Markup contract
     data-motion-module="route-transition"   module root (work grid, or case-study hero)
     data-motion="transition-link"           clickable source (an <a> containing an <img>)
     data-motion="transition-target"         destination media on the other page
     data-transition-key="slug"              pairs a link with its target ("auto" = reuse
                                             last key, for back links; "any" on a target
                                             matches whatever arrives)
     data-transition-source="selector"       link whose source image lives elsewhere
     data-motion="mask" / "fade-up"          destination content revealed under the clone
     data-motion-item / data-motion-exit     elements that fade + drop back on exit
*/
(function (global) {
  "use strict";

  var LM = global.LodhiMotion;
  if (!LM) return;

  var STORE = "lodhi:tx";
  var LAST = "lodhi:tx:last";
  var MAX_AGE = 1500;              // stale handover → plain navigation
  var FLIP_DURATION = 0.6;         // 600ms, cinematic ease
  var FADE_DURATION = 0.25;        // mobile cross-fade
  var live = { layer: null, tl: null, watchdog: 0 };

  /* ---- skip paths ----------------------------------------------------- */
  function mq(q) { return !!(global.matchMedia && global.matchMedia(q).matches); }
  function isReduced() { return mq("(prefers-reduced-motion: reduce)"); }
  function isCoarse() { return mq("(hover: none), (pointer: coarse), (max-width: 899px)"); }
  function isSlow() {
    var c = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (!c) return false;
    if (c.saveData) return true;
    return ["slow-2g", "2g", "3g"].indexOf(c.effectiveType) > -1;
  }

  /* ---- handover state ------------------------------------------------- */
  function write(state) {
    try {
      sessionStorage.setItem(STORE, JSON.stringify(state));
      if (state.key) sessionStorage.setItem(LAST, state.key);
    } catch (e) {}
  }
  function read() {
    try { var raw = sessionStorage.getItem(STORE); return raw ? JSON.parse(raw) : null; }
    catch (e) { return null; }
  }
  function clearState() { try { sessionStorage.removeItem(STORE); } catch (e) {} }
  function lastKey() { try { return sessionStorage.getItem(LAST); } catch (e) { return null; } }

  /* ---- capture: click on the source page ------------------------------ */
  function capture(link, opts) {
    opts = opts || {};
    if (!global.gsap || isReduced() || isSlow()) return false;

    var sel = link.getAttribute("data-transition-source");
    var img = sel ? document.querySelector(sel)
                  : (link.matches("img") ? link : link.querySelector("img"));
    if (!img) img = document.querySelector("[data-motion='transition-target'] img");
    if (!img) return false;                                   // source missing → skip

    var r = img.getBoundingClientRect();
    if (!r.width || !r.height) return false;

    var key = link.getAttribute("data-transition-key") || "";
    if (key === "auto") key = lastKey() || "";

    write({
      key: key,
      src: img.currentSrc || img.src,
      alt: img.alt || "",
      rect: { x: r.left, y: r.top, w: r.width, h: r.height },
      t: Date.now(),
      dir: opts.dir || "forward",
      from: location.pathname + location.search
    });

    exit(link, opts.scope);
    return true;
  }

  /* The rest of the index fades and drops back very slightly. Decorative only —
     the browser is already navigating while this runs. */
  function exit(link, scope) {
    var page = (scope && scope.closest("[data-motion-page]")) ||
               document.querySelector("[data-motion-page]");
    if (!page) return;
    var nodes = Array.prototype.filter.call(
      page.querySelectorAll("[data-motion-item], [data-motion-exit]"),
      function (n) { return n !== link && !n.contains(link) && !link.contains(n); }
    );
    if (nodes.length) {
      global.gsap.to(nodes, {
        opacity: 0, y: 10, duration: LM.DURATION.fast, ease: LM.EASE.exit, overwrite: true
      });
    }
  }

  /* ---- overlay layer -------------------------------------------------- */
  function layer() {
    if (live.layer && live.layer.isConnected) return live.layer;
    var el = document.createElement("div");
    el.className = "lodhi-tx-layer";
    el.setAttribute("data-motion-tx-layer", "");
    el.setAttribute("aria-hidden", "true");
    document.body.appendChild(el);
    live.layer = el;
    return el;
  }
  function makeClone(state, dest) {
    var img = document.createElement("img");
    img.className = "lodhi-tx-clone";
    img.decoding = "sync";
    img.src = state.src;
    img.alt = "";
    img.style.left = dest.left + "px";
    img.style.top = dest.top + "px";
    img.style.width = dest.width + "px";
    img.style.height = dest.height + "px";
    layer().appendChild(img);
    return img;
  }
  function teardown() {
    if (live.tl) { live.tl.kill(); live.tl = null; }
    if (live.watchdog) { clearTimeout(live.watchdog); live.watchdog = 0; }
    if (live.layer) { live.layer.remove(); live.layer = null; }
  }

  /* ---- destination reveal --------------------------------------------- */
  function revealParts(root) {
    return {
      masks: Array.prototype.slice.call(root.querySelectorAll("[data-motion='mask'] > *")),
      fades: Array.prototype.slice.call(root.querySelectorAll("[data-motion='fade-up']"))
    };
  }
  function revealTimeline(root, tl, at) {
    var p = revealParts(root);
    if (p.masks.length) {
      tl.fromTo(p.masks, { y: 0, yPercent: 110 },
        { y: 0, yPercent: 0, duration: LM.DURATION.slow, ease: LM.EASE.cinematic, stagger: LM.STAGGER.tight }, at);
    }
    if (p.fades.length) {
      tl.fromTo(p.fades, { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: LM.DURATION.base, ease: LM.EASE.entrance, stagger: LM.STAGGER.base }, at + 0.12);
    }
  }
  /* Skip path: the destination must still be readable, instantly. */
  function revealNow(root) {
    var p = revealParts(root);
    if (!global.gsap) return;
    if (p.masks.length) global.gsap.set(p.masks, { y: 0, yPercent: 0 });
    if (p.fades.length) global.gsap.set(p.fades, { opacity: 1, y: 0 });
  }

  /* ---- play: destination page, after mount ---------------------------- */
  function findTarget(scope, key) {
    var host = scope && scope.nodeType === 1 ? scope : document;
    var hit = key && host.querySelector('[data-transition-key="' + key.replace(/"/g, "") + '"]');
    return hit ||
      host.querySelector("[data-motion='transition-target'][data-transition-key='any']") ||
      host.querySelector("[data-motion='transition-target']");
  }

  function play(scope) {
    var state = read();
    clearState();                                   // one-shot, always consumed
    if (!state || !global.gsap) return false;
    if (Date.now() - state.t > MAX_AGE) return false;
    if (isReduced() || isSlow() || document.hidden) return false;

    var target = findTarget(scope, state.key);
    if (!target) return false;
    var img = target.matches("img") ? target : target.querySelector("img");
    if (!img) return false;
    var dest = img.getBoundingClientRect();
    if (!dest.width || !dest.height) return false;

    return isCoarse() ? crossfade(target, dest, state) : flip(target, dest, state);
  }

  /* Desktop: transform + clip-path only, 600ms cinematic.
     Uniform cover scale keeps the photograph undistorted; clip-path trims the
     frame to the source rect's aspect, so the crop opens as the clone grows. */
  function flip(target, dest, state) {
    var s = Math.max(state.rect.w / dest.width, state.rect.h / dest.height);
    var dx = (state.rect.x + state.rect.w / 2) - (dest.left + dest.width / 2);
    var dy = (state.rect.y + state.rect.h / 2) - (dest.top + dest.height / 2);
    var ix = Math.max(0, (dest.width * s - state.rect.w) / 2 / s / dest.width * 100);
    var iy = Math.max(0, (dest.height * s - state.rect.h) / 2 / s / dest.height * 100);

    var clone = makeClone(state, dest);
    var tl = global.gsap.timeline({ onComplete: teardown, onInterrupt: teardown });
    live.tl = tl;

    tl.fromTo(clone,
      { x: dx, y: dy, scale: s, clipPath: "inset(" + iy + "% " + ix + "% " + iy + "% " + ix + "%)", force3D: true },
      { x: 0, y: 0, scale: 1, clipPath: "inset(0% 0% 0% 0%)", duration: FLIP_DURATION, ease: LM.EASE.cinematic }, 0)
      .to(clone, { opacity: 0, duration: 0.16, ease: "none" }, FLIP_DURATION - 0.14);

    revealTimeline(target.closest("[data-motion-module]") || document.documentElement, tl, 0.28);
    live.watchdog = setTimeout(teardown, 1400);     // no orphan overlay, ever
    return true;
  }

  /* Mobile: 250ms cross-fade of the same clone at the destination rect. */
  function crossfade(target, dest, state) {
    var clone = makeClone(state, dest);
    var tl = global.gsap.timeline({ onComplete: teardown, onInterrupt: teardown });
    live.tl = tl;
    tl.fromTo(clone, { opacity: 1 }, { opacity: 0, duration: FADE_DURATION, ease: LM.EASE.entrance }, 0);
    revealTimeline(target.closest("[data-motion-module]") || document.documentElement, tl, 0);
    live.watchdog = setTimeout(teardown, 900);
    return true;
  }

  LM.RouteTransition = {
    capture: capture,
    play: play,
    clear: clearState,
    teardown: teardown,
    read: read
  };

  /* ---- module factory -------------------------------------------------- */
  LM.register("route-transition", function (root, ctx) {
    var bound = [];
    var onHide = function () { teardown(); };
    /* bfcache restore: undo the exit fade this module applied before unload. */
    var onShow = function (e) {
      if (!e.persisted || !global.gsap) return;
      teardown();
      var page = root.closest("[data-motion-page]") || document;
      global.gsap.set(page.querySelectorAll("[data-motion-item], [data-motion-exit]"),
        { clearProps: "opacity,transform" });
    };

    ctx.items("[data-motion='transition-link']").forEach(function (link) {
      var onClick = function (e) {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        // No preventDefault: the route change fires now, animation is decorative.
        capture(link, { dir: link.getAttribute("data-transition-dir") || "forward", scope: root });
      };
      link.addEventListener("click", onClick);
      bound.push([link, onClick]);
    });

    global.addEventListener("pagehide", onHide);
    global.addEventListener("pageshow", onShow);

    function mount() {
      if (!play(root)) revealNow(root);
      return teardown;                               // matchMedia cleanup
    }

    LM.respond({
      desktop: mount,
      mobile: mount,
      reduced: function () { revealNow(root); }
    }, root);

    return {
      destroy: function () {
        bound.forEach(function (pair) { pair[0].removeEventListener("click", pair[1]); });
        bound.length = 0;
        global.removeEventListener("pagehide", onHide);
        global.removeEventListener("pageshow", onShow);
        teardown();
      }
    };
  });
})(window);
