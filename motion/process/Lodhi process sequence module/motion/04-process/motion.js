/* Lodhi Interiors — module 04
   A: data-motion-module="process"  — pinned index + scrolling detail
   B: data-motion-module="counters" — count-up figures, once only
   Independent factories: mount/unmount either subtree on its own via
   LodhiMotion.init(el) / LodhiMotion.destroy(el).
   Animates transform / opacity / clip-path only. Nothing shifts layout. */
(function (LM) {
  "use strict";
  if (!LM) return;

  /* Shared helper: refresh ScrollTrigger once fonts are in, once images are in,
     and on a debounced resize. A pinned section measured before the display
     serif loads will jump — this is the guard against that. */
  function refreshGuards(onRefresh) {
    var alive = true;
    var timer = null;

    function fire() {
      if (!alive) return;
      LM.refresh();
      if (onRefresh) onRefresh();
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(fire).catch(function () {});
    }

    var imgs = Array.prototype.slice.call(document.images).filter(function (img) { return !img.complete; });
    if (imgs.length) {
      var left = imgs.length;
      imgs.forEach(function (img) {
        function done() {
          img.removeEventListener("load", done);
          img.removeEventListener("error", done);
          if (--left === 0) fire();
        }
        img.addEventListener("load", done);
        img.addEventListener("error", done);
      });
    }
    if (document.readyState !== "complete") window.addEventListener("load", fire, { once: true });

    function onResize() {
      clearTimeout(timer);
      timer = setTimeout(fire, 180);
    }
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    return function teardown() {
      alive = false;
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }

  /* =================== MODULE A — process sequence ================== */
  LM.register("process", function (root, ctx) {
    var stages = ctx.items("[data-motion='stage']");
    var steps = ctx.items("[data-motion='detail']");

    function setActive(i) {
      for (var k = 0; k < stages.length; k++) {
        stages[k].classList.toggle("is-active", k === i);
      }
    }

    LM.respond({
      desktop: function () {
        var nav = root.querySelector("[data-motion='pin-col']");
        var inner = root.querySelector("[data-motion='pin-scope']");

        /* The pin: left column held for the length of the section.
           pinSpacing false — the grid track already reserves the space,
           so nothing in the document flow moves. */
        var pin = ctx.ScrollTrigger.create({
          trigger: inner,
          start: "top top+=" + Math.round(window.innerHeight * 0.14),
          end: "bottom bottom",
          pin: nav,
          pinSpacing: false,
          pinType: "transform",
          anticipatePin: 1,
          invalidateOnRefresh: true
        });

        /* Active-stage tracking. One trigger per detail block; the matching
           name transitions over 250ms in CSS. */
        var trackers = steps.map(function (step, i) {
          return ctx.ScrollTrigger.create({
            trigger: step,
            start: "top 55%",
            end: "bottom 55%",
            invalidateOnRefresh: true,
            onToggle: function (self) { if (self.isActive) setActive(i); }
          });
        });

        /* Detail blocks arrive with a quiet rise. */
        var tweens = steps.map(function (step) {
          return ctx.gsap.from(step, {
            opacity: 0,
            y: 28,
            duration: ctx.DURATION.slow,
            ease: ctx.ease("entrance"),
            scrollTrigger: {
              trigger: step,
              start: ctx.str("start", "top 82%"),
              once: true,
              invalidateOnRefresh: true
            }
          });
        });

        var stageIntro = ctx.gsap.from(stages, {
          opacity: 0,
          y: 10,
          duration: ctx.DURATION.base,
          ease: ctx.ease("entrance"),
          stagger: ctx.num("stagger", ctx.STAGGER.base),
          scrollTrigger: { trigger: root, start: "top 70%", once: true }
        });

        setActive(0);
        var teardownGuards = refreshGuards();

        return function () {
          teardownGuards();
          pin.kill(true);
          trackers.forEach(function (t) { t.kill(); });
          tweens.forEach(function (t) { if (t.scrollTrigger) t.scrollTrigger.kill(); t.kill(); });
          if (stageIntro.scrollTrigger) stageIntro.scrollTrigger.kill();
          stageIntro.kill();
          ctx.gsap.set(steps.concat(stages), { clearProps: "opacity,transform" });
          stages.forEach(function (s) { s.classList.remove("is-active"); });
        };
      },

      mobile: function () {
        /* No pin. Plain vertical sequence, each block fading and rising 24px. */
        var tweens = steps.map(function (step) {
          return ctx.gsap.from(step, {
            opacity: 0,
            y: 24,
            duration: ctx.DURATION.base,
            ease: ctx.ease("entrance"),
            scrollTrigger: { trigger: step, start: "top 88%", once: true }
          });
        });
        var teardownGuards = refreshGuards();
        return function () {
          teardownGuards();
          tweens.forEach(function (t) { if (t.scrollTrigger) t.scrollTrigger.kill(); t.kill(); });
          ctx.gsap.set(steps, { clearProps: "opacity,transform" });
        };
      },

      reduced: function () {
        /* Final state only. No pin, no tween — the markup already reads. */
        ctx.gsap.set(steps.concat(stages), { clearProps: "all" });
        setActive(0);
      }
    }, root);

    return {
      destroy: function () {
        stages.forEach(function (s) { s.classList.remove("is-active"); });
      }
    };
  });

  /* ======================= MODULE B — counters ====================== */
  LM.register("counters", function (root, ctx) {
    var figures = ctx.items("[data-motion='count']");
    var hasRun = false;

    /* Reserve the final width from the final value so no digit shifts layout. */
    var entries = figures.map(function (fig) {
      var valueEl = fig.querySelector("[data-motion='count-value']");
      var target = parseFloat(fig.getAttribute("data-motion-count-to"));
      var decimals = (fig.getAttribute("data-motion-count-to") || "").split(".")[1];
      var places = decimals ? decimals.length : 0;
      var final = target.toLocaleString("en-IN", {
        minimumFractionDigits: places,
        maximumFractionDigits: places
      });
      valueEl.style.minWidth = (final.length + 0.15).toFixed(2) + "ch";
      valueEl.style.display = "inline-block";
      valueEl.textContent = final;
      return { el: valueEl, to: target, places: places, final: final };
    });

    function render(entry, v) {
      entry.el.textContent = v.toLocaleString("en-IN", {
        minimumFractionDigits: entry.places,
        maximumFractionDigits: entry.places
      });
    }

    function countUp() {
      if (hasRun) return null;
      hasRun = true;
      var tweens = entries.map(function (entry) {
        var proxy = { v: 0 };
        render(entry, 0);
        return ctx.gsap.to(proxy, {
          v: entry.to,
          duration: 1.2,
          ease: ctx.ease("entrance"),
          onUpdate: function () { render(entry, proxy.v); },
          onComplete: function () { entry.el.textContent = entry.final; }
        });
      });
      return tweens;
    }

    LM.respond({
      desktop: function () {
        var running = [];
        var st = ctx.ScrollTrigger.create({
          trigger: root,
          start: ctx.str("start", "top 80%"),
          once: true,                       /* never re-runs on re-entry */
          onEnter: function () { running = countUp() || []; }
        });
        return function () {
          st.kill();
          running.forEach(function (t) { t.kill(); });
          entries.forEach(function (e) { e.el.textContent = e.final; });
        };
      },
      mobile: function () {
        var running = [];
        var st = ctx.ScrollTrigger.create({
          trigger: root,
          start: "top 88%",
          once: true,
          onEnter: function () { running = countUp() || []; }
        });
        return function () {
          st.kill();
          running.forEach(function (t) { t.kill(); });
          entries.forEach(function (e) { e.el.textContent = e.final; });
        };
      },
      reduced: function () {
        hasRun = true;
        entries.forEach(function (e) { e.el.textContent = e.final; });
      }
    }, root);

    return {
      destroy: function () {
        entries.forEach(function (e) {
          e.el.textContent = e.final;
          e.el.style.minWidth = "";
          e.el.style.display = "";
        });
      }
    };
  });
})(window.LodhiMotion);
