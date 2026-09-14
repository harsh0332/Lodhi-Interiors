/* Lodhi Interiors — module 07: closing CTA + footer + cursor + mobile action bar.
   Registers factories only. Nothing runs at load time.
   Requires /motion/_shared/scroll-engine.js. */
(function (LM) {
  "use strict";
  if (!LM) { return; }

  /* ================= MODULE A — closing call to action ===============
     data-motion-module="closing-cta"
       data-motion="mask"   wrapper with overflow:hidden, one child element
       data-motion-item     each action
     root options: data-motion-start, data-motion-duration, data-motion-stagger */
  LM.register("closing-cta", function (root, ctx) {
    var line = ctx.items("[data-motion='mask'] > *");
    var actions = ctx.items("[data-motion-item]");
    var all = line.concat(actions);

    function build() {
      var tl = ctx.gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: ctx.str("start", "top 80%"),
          toggleActions: "play none none none"
        },
        onComplete: function () {
          ctx.gsap.set(line, { clearProps: "transform" });
          ctx.gsap.set(actions, { opacity: 1, y: 0 });
        }
      });
      tl.from(line, {
        yPercent: 108,
        duration: ctx.num("duration", 0.6),
        ease: ctx.ease(ctx.str("ease", "cinematic"))
      });
      /* fromTo + immediateRender:false — the hidden pre-state lives in CSS
         (gated on data-motion-engine), so a torn-down timeline can never
         bake opacity:0 in. */
      tl.fromTo(actions, { opacity: 0, y: 12 }, {
        immediateRender: false,
        opacity: 1,
        y: 0,
        duration: ctx.DURATION.base,
        ease: ctx.ease("entrance"),
        stagger: ctx.num("stagger", ctx.STAGGER.base)
      }, 0.2);   /* 200ms after the line starts */

      return function () {
        if (tl.scrollTrigger) { tl.scrollTrigger.kill(); }
        tl.kill();
        ctx.gsap.set(line, { clearProps: "transform" });
        ctx.gsap.set(actions, { opacity: 1, y: 0 });
      };
    }

    ctx.respond({
      desktop: build,
      mobile: build,
      reduced: function () { ctx.gsap.set(all, { clearProps: "transform,opacity" }); }
    });

    return { destroy: function () {} };
  });

  /* ================= MODULE B — footer ===============================
     data-motion-module="footer"
       data-motion-item   each block, in DOM order
                          (desktop: left→right, mobile: top→bottom)
     One pass, 500ms, 60ms stagger, 20px rise.

     Note on the "footer fixed behind the page" uncover variant: not shipped.
     See README notes — it requires the page content to become its own
     transformed/absolutely-positioned layer, which breaks ScrollTrigger end
     measurement for every other pinned module and fights Lenis on resize and
     on anchor jumps. The simple staggered rise is the shipped behaviour. */
  LM.register("footer", function (root, ctx) {
    var blocks = ctx.items("[data-motion-item]");

    function build() {
      var tl = ctx.gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: ctx.str("start", "top 90%"),
          once: true
        }
      });
      tl.from(blocks, {
        opacity: 0,
        y: 20,
        duration: ctx.num("duration", ctx.DURATION.base),
        ease: ctx.ease("entrance"),
        stagger: ctx.num("stagger", 0.06)
      });
      return function () {
        if (tl.scrollTrigger) { tl.scrollTrigger.kill(); }
        tl.kill();
        ctx.gsap.set(blocks, { clearProps: "transform,opacity" });
      };
    }

    ctx.respond({
      desktop: build,
      mobile: build,
      reduced: function () { ctx.gsap.set(blocks, { clearProps: "transform,opacity" }); }
    });

    return { destroy: function () {} };
  });

  /* ================= MODULE C — brass cursor ring ====================
     data-motion-module="cursor" on an empty aria-hidden element.
       data-motion-grow="<selector>"   what makes it grow (default below)
     Desktop / hover / fine pointer only. Destroy removes the element. */
  LM.register("cursor", function (root, ctx) {
    var GROW = ctx.str("grow", "a, button, [data-motion-cursor='grow']");
    var listeners = [];

    function on(target, type, fn) {
      target.addEventListener(type, fn, { passive: true });
      listeners.push([target, type, fn]);
    }
    function off() {
      listeners.forEach(function (l) { l[0].removeEventListener(l[1], l[2]); });
      listeners = [];
    }

    ctx.respond({
      desktop: function () {
        var shown = false;
        ctx.gsap.set(root, {
          xPercent: -50, yPercent: -50, scale: 1, opacity: 0,
          x: window.innerWidth / 2, y: window.innerHeight / 2
        });
        /* quickTo rides gsap's existing ticker — no extra rAF loop. */
        var xTo = ctx.gsap.quickTo(root, "x", { duration: 0.35, ease: "power3" });
        var yTo = ctx.gsap.quickTo(root, "y", { duration: 0.35, ease: "power3" });
        var scaleTo = ctx.gsap.quickTo(root, "scale", { duration: 0.25, ease: ctx.ease("snap") });

        on(window, "pointermove", function (e) {
          if (e.pointerType && e.pointerType !== "mouse") { return; }
          xTo(e.clientX); yTo(e.clientY);
          if (!shown) { shown = true; ctx.gsap.to(root, { opacity: 1, duration: 0.25 }); }
        });
        on(document, "pointerover", function (e) {
          if (e.target.closest && e.target.closest(GROW)) { scaleTo(2.3); }
        });
        on(document, "pointerout", function (e) {
          if (e.target.closest && e.target.closest(GROW)) { scaleTo(1); }
        });
        on(document, "mouseleave", function () { ctx.gsap.to(root, { opacity: 0, duration: 0.2 }); shown = false; });

        return function () {
          off();
          ctx.gsap.killTweensOf(root);
          ctx.gsap.set(root, { clearProps: "all" });
        };
      },
      mobile: function () { ctx.gsap.set(root, { opacity: 0 }); },
      reduced: function () { ctx.gsap.set(root, { opacity: 0 }); }
    });

    return {
      destroy: function () {
        off();
        ctx.gsap.killTweensOf(root);
        if (root.parentNode) { root.parentNode.removeChild(root); }
      }
    };
  });

  /* ================= MODULE D — sticky mobile action bar =============
     data-motion-module="mobile-action-bar"
       data-motion-after="<selector>"   show once this element is scrolled past
       data-motion-until="<selector>"   hide once this element enters view
     Mobile / coarse pointer only. 250ms slide. Reduced motion: no slide,
     it simply appears and disappears at the same scroll positions. */
  LM.register("mobile-action-bar", function (root, ctx) {
    var after = document.querySelector(ctx.str("after", "[data-motion-hero]"));
    var until = document.querySelector(ctx.str("until", "[data-motion-module='closing-cta']"));
    var triggers = [];

    function make(animate) {
      var past = false, blocked = false;

      function apply(instant) {
        var on = past && !blocked;
        var to = { yPercent: on ? 0 : 110, autoAlpha: on ? 1 : 0 };
        if (!animate || instant) { ctx.gsap.set(root, to); return; }
        to.duration = ctx.num("duration", ctx.DURATION.fast);
        to.ease = ctx.ease(on ? "entrance" : "exit");
        to.overwrite = true;
        ctx.gsap.to(root, to);
      }

      ctx.gsap.set(root, { yPercent: 110, autoAlpha: 0 });

      if (after) {
        triggers.push(ctx.ScrollTrigger.create({
          trigger: after,
          start: "bottom top",
          onEnter: function () { past = true; apply(); },
          onLeaveBack: function () { past = false; apply(); }
        }));
      } else {
        past = true;
      }

      if (until) {
        triggers.push(ctx.ScrollTrigger.create({
          trigger: until,
          start: "top bottom",
          onEnter: function () { blocked = true; apply(); },
          onLeaveBack: function () { blocked = false; apply(); }
        }));
      }

      apply(true);

      return function () {
        triggers.forEach(function (st) { st.kill(); });
        triggers = [];
        ctx.gsap.killTweensOf(root);
        ctx.gsap.set(root, { clearProps: "all" });
      };
    }

    ctx.respond({
      desktop: function () { ctx.gsap.set(root, { autoAlpha: 0 }); },
      mobile: function () { return make(true); },
      reduced: function () { return make(false); }
    });

    return {
      destroy: function () {
        triggers.forEach(function (st) { st.kill(); });
        triggers = [];
        ctx.gsap.killTweensOf(root);
      }
    };
  });
})(window.LodhiMotion);
