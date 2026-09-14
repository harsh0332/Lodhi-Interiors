/* Lodhi Interiors — module 05: header + mobile menu
   Registers two factories. Nothing runs at load time.

   Data attribute API (module-defined)
   -----------------------------------
   data-motion-module="site-header"   header root
     data-motion-threshold   px of scroll before the solid state (default 80)
     data-motion-hysteresis  px of dead-band either side of it (default 16)
     data-motion-hide-after  px before the header may hide on scroll down (default 200)
     data-motion="nav-link"  a desktop nav link (brass rule is CSS, pointer only)
   data-motion-module="nav-overlay"   overlay root (must have an id)
     data-menu-trigger       the real <button aria-expanded aria-controls>
     data-motion="menu-item" the inner element inside each .menu__mask
     data-motion="menu-util" a footer utility link
*/
(function (LM) {
  "use strict";

  var MENU_EVENT = "lodhi:menu";

  /* ================= MODULE A — header ================================= */
  LM.register("site-header", function (root, ctx) {
    var THRESH = ctx.num("threshold", 80);
    var HYST = ctx.num("hysteresis", 16);
    var HIDE_AFTER = ctx.num("hide-after", 200);

    var solid = null;
    var hidden = false;
    var menuOpen = false;
    var lastY = scrollY();
    var anim = null;            // set per branch
    var listeners = [];

    function scrollY() {
      return window.scrollY || document.documentElement.scrollTop || 0;
    }

    function setSolid(next) {
      if (next === solid) return;
      solid = next;
      root.setAttribute("data-header-state", next ? "solid" : "over");
    }

    function show() {
      if (!hidden) return;
      hidden = false;
      root.setAttribute("data-header-hidden", "false");
      anim && anim.show();
    }

    function hide() {
      if (hidden || menuOpen || root.contains(document.activeElement)) return;
      hidden = true;
      root.setAttribute("data-header-hidden", "true");
      anim && anim.hide();
    }

    /* Hysteresis: two thresholds, so hovering the boundary cannot flicker. */
    function update() {
      var y = scrollY();
      var delta = y - lastY;

      if (!solid && y > THRESH + HYST) setSolid(true);
      else if (solid && y < THRESH - HYST) setSolid(false);

      if (menuOpen || root.contains(document.activeElement) || y <= HIDE_AFTER) {
        show();
      } else if (delta > 4) {
        hide();
      } else if (delta < -4) {
        show();
      }

      if (Math.abs(delta) > 1) lastY = y;
    }

    /* One rAF-throttled read, wired to Lenis when it exists. */
    function bind() {
      var queued = false;
      function onScroll() {
        if (queued) return;
        queued = true;
        requestAnimationFrame(function () { queued = false; update(); });
      }
      window.addEventListener("scroll", onScroll, { passive: true });
      listeners.push(function () { window.removeEventListener("scroll", onScroll); });
      if (ctx.lenis) {
        ctx.lenis.on("scroll", onScroll);
        listeners.push(function () { ctx.lenis.off("scroll", onScroll); });
      }
      // Focus inside the header must always reveal it.
      function onFocusIn() { show(); }
      root.addEventListener("focusin", onFocusIn);
      listeners.push(function () { root.removeEventListener("focusin", onFocusIn); });
      update();
    }

    function onMenu(e) {
      menuOpen = !!(e.detail && e.detail.open);
      root.setAttribute("data-menu-open", menuOpen ? "true" : "false");
      if (menuOpen) show();
      else update();
    }
    document.addEventListener(MENU_EVENT, onMenu);

    setSolid(scrollY() > THRESH + HYST);
    root.setAttribute("data-header-hidden", "false");
    root.setAttribute("data-menu-open", "false");

    LM.respond({
      desktop: function () {
        anim = {
          hide: function () {
            ctx.gsap.to(root, { yPercent: -100, duration: ctx.DURATION.base, ease: ctx.ease("exit"), overwrite: true });
          },
          show: function () {
            ctx.gsap.to(root, { yPercent: 0, duration: ctx.DURATION.fast, ease: ctx.ease("snap"), overwrite: true });
          }
        };
        bind();
        return function () {
          unbind();
          ctx.gsap.set(root, { clearProps: "transform" });
        };
      },
      mobile: function () {
        anim = {
          hide: function () {
            ctx.gsap.to(root, { yPercent: -100, duration: ctx.DURATION.fast, ease: ctx.ease("exit"), overwrite: true });
          },
          show: function () {
            ctx.gsap.to(root, { yPercent: 0, duration: ctx.DURATION.fast, ease: ctx.ease("snap"), overwrite: true });
          }
        };
        bind();
        return function () {
          unbind();
          ctx.gsap.set(root, { clearProps: "transform" });
        };
      },
      reduced: function () {
        // Same behaviour, zero animation: colour state and hide/reveal snap.
        root.setAttribute("data-motion-instant", "true");
        anim = {
          hide: function () { ctx.gsap.set(root, { yPercent: -100 }); },
          show: function () { ctx.gsap.set(root, { yPercent: 0 }); }
        };
        bind();
        return function () {
          unbind();
          root.removeAttribute("data-motion-instant");
          ctx.gsap.set(root, { clearProps: "transform" });
        };
      }
    }, root);

    function unbind() {
      listeners.splice(0).forEach(function (off) { off(); });
      anim = null;
    }

    return {
      destroy: function () {
        unbind();
        document.removeEventListener(MENU_EVENT, onMenu);
      }
    };
  });

  /* ================= MODULE B — mobile menu ============================ */
  LM.register("nav-overlay", function (root, ctx) {
    var trigger = document.querySelector('[data-menu-trigger][aria-controls="' + root.id + '"]');
    if (!trigger) {
      console.warn("LodhiMotion nav-overlay: no trigger found for #" + root.id);
      return {};
    }

    var items = ctx.items("[data-motion='menu-item']");
    var utils = ctx.items("[data-motion='menu-util']");
    var FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), input, select, textarea';

    var open = false;
    var anim = null;
    var lockedY = 0;
    var returnFocusTo = null;

    /* ---- scroll lock: no iOS jump ------------------------------------- */
    function lock() {
      lockedY = window.scrollY || document.documentElement.scrollTop || 0;
      if (ctx.lenis) ctx.lenis.stop();
      var b = document.body;
      b.style.position = "fixed";
      b.style.top = -lockedY + "px";
      b.style.left = "0";
      b.style.right = "0";
      b.style.width = "100%";
      b.setAttribute("data-scroll-locked", "true");
    }

    function unlock() {
      var b = document.body;
      b.style.position = "";
      b.style.top = "";
      b.style.left = "";
      b.style.right = "";
      b.style.width = "";
      b.removeAttribute("data-scroll-locked");
      window.scrollTo(0, lockedY);
      if (ctx.lenis) {
        ctx.lenis.scrollTo(lockedY, { immediate: true, force: true });
        ctx.lenis.start();
      }
    }

    /* ---- focus trap: trigger + overlay, wrapping both ends ------------- */
    function focusables() {
      var inside = Array.prototype.slice.call(root.querySelectorAll(FOCUSABLE))
        .filter(function (el) { return el.offsetParent !== null || el === document.activeElement; });
      return [trigger].concat(inside);
    }

    function onKeydown(e) {
      if (!open) return;
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      var list = focusables();
      if (!list.length) return;
      var first = list[0];
      var last = list[list.length - 1];
      var i = list.indexOf(document.activeElement);
      if (i === -1) {                       // focus escaped — pull it back in
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      } else if (e.shiftKey && i === 0) {   // wrap backwards
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && i === list.length - 1) {  // wrap forwards
        e.preventDefault();
        first.focus();
      }
    }

    function setClosedA11y(isOpen) {
      trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
      if (isOpen) {
        root.removeAttribute("inert");
        root.removeAttribute("aria-hidden");
        root.setAttribute("data-state", "open");
      } else {
        root.setAttribute("inert", "");
        root.setAttribute("aria-hidden", "true");
        root.setAttribute("data-state", "closed");
      }
    }

    function announce(isOpen) {
      document.dispatchEvent(new CustomEvent(MENU_EVENT, { detail: { open: isOpen, root: root } }));
    }

    function openMenu() {
      if (open) return;
      open = true;
      returnFocusTo = document.activeElement === trigger ? trigger : trigger;
      lock();
      setClosedA11y(true);
      announce(true);
      document.addEventListener("keydown", onKeydown, true);
      anim && anim.open();
      // Focus lands immediately — never waits on the wipe.
      var list = focusables();
      (list[1] || trigger).focus({ preventScroll: true });
    }

    function close() {
      if (!open) return;
      open = false;
      document.removeEventListener("keydown", onKeydown, true);
      var finish = function () {
        setClosedA11y(false);
        unlock();
        (returnFocusTo || trigger).focus({ preventScroll: true });
        announce(false);
      };
      if (anim) anim.close(finish);
      else finish();
    }

    function toggle() { open ? close() : openMenu(); }

    trigger.addEventListener("click", toggle);

    // Route change (hash nav, history) always closes.
    function onRoute() { if (open) close(); }
    window.addEventListener("hashchange", onRoute);
    window.addEventListener("popstate", onRoute);
    function onLinkClick(e) {
      if (e.target.closest("a[href]")) close();
    }
    root.addEventListener("click", onLinkClick);

    setClosedA11y(false);

    LM.respond({
      desktop: function () { return branchAnimated(); },
      mobile: function () { return branchAnimated(); },
      reduced: function () {
        trigger.setAttribute("data-motion-instant", "true");
        anim = {
          open: function () {
            ctx.gsap.set(root, { clipPath: "inset(0 0 0% 0)" });
            ctx.gsap.set(items.concat(utils), { yPercent: 0, opacity: 1 });
          },
          close: function (done) {
            ctx.gsap.set(root, { clipPath: "inset(0 0 100% 0)" });
            done();
          }
        };
        return function () {
          trigger.removeAttribute("data-motion-instant");
          anim = null;
          ctx.gsap.set([root].concat(items, utils), { clearProps: "all" });
        };
      }
    }, root);

    function branchAnimated() {
      var tl = null;
      anim = {
        open: function () {
          tl && tl.kill();
          ctx.gsap.set(items, { yPercent: 110, opacity: 1 });
          ctx.gsap.set(utils, { opacity: 0, yPercent: 40 });
          tl = ctx.gsap.timeline();
          tl.fromTo(root,
            { clipPath: "inset(0 0 100% 0)" },
            { clipPath: "inset(0 0 0% 0)", duration: 0.45, ease: ctx.ease("cinematic") }
          );
          tl.to(items, {
            yPercent: 0,
            duration: ctx.DURATION.slow,
            ease: ctx.ease("cinematic"),
            stagger: 0.06
          }, "-=0.18");
          tl.to(utils, {
            opacity: 1,
            yPercent: 0,
            duration: ctx.DURATION.base,
            ease: ctx.ease("entrance"),
            stagger: 0.05
          }, "-=0.35");
        },
        close: function (done) {
          tl && tl.kill();
          tl = ctx.gsap.timeline({ onComplete: done });
          tl.to(items.concat(utils), {
            opacity: 0,
            duration: 0.16,
            ease: ctx.ease("exit"),
            stagger: 0.02
          });
          tl.to(root, {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.32,
            ease: ctx.ease("exit")
          }, "-=0.06");
        }
      };
      return function () {
        tl && tl.kill();
        tl = null;
        anim = null;
        ctx.gsap.set([root].concat(items, utils), { clearProps: "all" });
      };
    }

    return {
      destroy: function () {
        if (open) close();
        document.removeEventListener("keydown", onKeydown, true);
        trigger.removeEventListener("click", toggle);
        root.removeEventListener("click", onLinkClick);
        window.removeEventListener("hashchange", onRoute);
        window.removeEventListener("popstate", onRoute);
        anim = null;
      }
    };
  });
})(window.LodhiMotion);
