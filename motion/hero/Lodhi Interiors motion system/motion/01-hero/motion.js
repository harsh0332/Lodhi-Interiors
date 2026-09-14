/* Lodhi Interiors — module 01: hero and first-load sequence
   Registers one factory. Does nothing at load time.
   Owns: intro timeline, runtime line masks, desktop parallax, cue loop.
   Owns no Lenis instance, no ScrollTrigger bridge, no gsap.ticker call.
*/
(function () {
  "use strict";

  var SESSION_KEY = "lodhi.hero.played";
  var MOBILE_FACTOR = 0.7;        /* mobile durations ~30% shorter */
  var TEXT_DEPTH = 2;             /* text layer moves N× the image speed */
  var CUE_LOOP = { distance: 5, duration: 3.2 };

  function played() {
    try { return sessionStorage.getItem(SESSION_KEY) === "1"; }
    catch (e) { return false; }
  }
  function markPlayed() {
    try { sessionStorage.setItem(SESSION_KEY, "1"); } catch (e) {}
  }
  function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  LodhiMotion.register("hero", function (root, ctx) {
    var gsap = ctx.gsap;
    var media = root.querySelector("[data-motion='media'] img");
    var layer = root.querySelector("[data-motion='text-layer']");
    var title = root.querySelector("[data-motion='mask']");
    var items = ctx.items("[data-motion-item]");
    var cue = root.querySelector("[data-motion='cue']");

    var titleSource = title ? title.textContent : "";
    var boxWidth = null;
    var remountTimer = null;
    var settleTimer = null;
    var observer = null;
    var introTl = null;
    var mqDesktop = window.matchMedia(LodhiMotion.MEDIA.desktop);
    var loop = null;

    /* ---- runtime line measurement ---------------------------------- */
    /* Words are wrapped, grouped by their measured top, then re-emitted as
       overflow-hidden line wrappers. Text is never created — only regrouped,
       so the mask is correct at any width the headline wraps at. */
    function splitLines() {
      if (!title) return [];
      var words = titleSource.replace(/\s+/g, " ").trim().split(" ");
      title.innerHTML = words.map(function (w) {
        return '<span data-motion-word>' + esc(w) + "</span>";
      }).join(" ");

      var spans = ctx.items("[data-motion-word]");
      var lines = [], top = null, current = null;
      spans.forEach(function (span) {
        var t = Math.round(span.getBoundingClientRect().top);
        if (top === null || Math.abs(t - top) > 4) {
          current = [];
          lines.push(current);
          top = t;
        }
        current.push(span.textContent);
      });

      title.innerHTML = lines.map(function (line) {
        return '<span class="hero__line"><span class="hero__line-i" data-motion-line-inner>' +
          esc(line.join(" ")) + "</span></span>";
      }).join("");
      title.setAttribute("data-motion-split", "");
      return ctx.items("[data-motion-line-inner]");
    }

    /* ---- final state, zero tween ----------------------------------- */
    /* y:0 AND yPercent:0 — clearProps would hand the lines back to the CSS
       gate's translate3d(0,110%,0) and leave the headline outside its mask. */
    function showLines(lines) {
      gsap.set(lines, { y: 0, yPercent: 0 });
    }

    function finalState() {
      var lines = splitLines();
      gsap.set(media, { clearProps: "filter,transform" });
      showLines(lines);
      gsap.set(items, { opacity: 1, y: 0 });
      gsap.set(cue, { opacity: 0.72, y: 0 });
      return lines;
    }

    /* ---- the sequence ---------------------------------------------- */
    function intro(k) {
      var lines = splitLines();
      var stagger = ctx.num("stagger", ctx.STAGGER.base) * k;
      var lineDur = 0.6 * k;
      var linesStart = 0.1;
      var linesEnd = linesStart + lineDur + Math.max(0, lines.length - 1) * stagger;
      var supportAt = linesEnd + 0.2 * k;

      var tl = gsap.timeline({ onComplete: markPlayed });

      /* 1 · photograph: filter + scale only. Never opacity, never delayed. */
      tl.fromTo(media,
        { filter: "blur(12px)", scale: 1.05 },
        {
          filter: "blur(0px)", scale: 1,
          duration: ctx.DURATION.cinematic * k,
          ease: ctx.ease("cinematic")
        }, 0);

      /* 2 · headline, line by line out of its mask */
      tl.fromTo(lines,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: lineDur,
          ease: ctx.ease("entrance"),
          stagger: stagger
        }, linesStart);

      /* 3 · supporting line + action */
      tl.fromTo(items,
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0,
          duration: ctx.DURATION.base * k,
          ease: ctx.ease("entrance"),
          stagger: stagger
        }, supportAt);

      /* 4 · scroll cue last */
      tl.fromTo(cue,
        { opacity: 0 },
        { opacity: 0.72, duration: ctx.DURATION.fast, ease: ctx.ease("entrance") },
        supportAt + 0.15);

      return tl;
    }

    function breathe() {
      loop = gsap.to(cue, {
        y: CUE_LOOP.distance,
        duration: CUE_LOOP.duration,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });
      return loop;
    }

    /* ---- desktop parallax: no pin, no scrub override --------------- */
    function parallax() {
      var speed = ctx.num("speed", 0.08);
      return gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: ctx.str("start", "top top"),
          end: ctx.str("end", "bottom top"),
          scrub: true,
          invalidateOnRefresh: true
        }
      })
        .to(media, { y: function () { return -root.offsetHeight * speed; }, ease: "none" }, 0)
        .to(layer, { y: function () { return -root.offsetHeight * speed * TEXT_DEPTH; }, ease: "none" }, 0);
    }

    /* ---- re-measure on real box change ----------------------------
       A ResizeObserver on the copy box fires whenever the headline's measure
       actually changes — no event delivery, tab visibility or viewport
       assumption involved. A width change can also mean the matchMedia branch
       chosen at mount is stale, so the root is remounted wholesale: the engine
       reverts this module's branches and runs the correct one. The intro is
       once-per-session, so a remount lands on final state, never a replay. */
    function scheduleRemount() {
      clearTimeout(remountTimer);
      remountTimer = setTimeout(function () {
        if (!root.isConnected) return;
        LodhiMotion.destroy(root);
        LodhiMotion.init(root);
      }, 140);
    }

    var copyBox = root.querySelector(".hero__copy") || title;
    if (copyBox && window.ResizeObserver) {
      observer = new ResizeObserver(function (entries) {
        var w = Math.round(entries[0].contentRect.width);
        if (boxWidth === null) { boxWidth = w; return; }
        if (w === boxWidth) return;
        boxWidth = w;
        scheduleRemount();
      });
      observer.observe(copyBox);
    }

    /* ---- settle pass ----------------------------------------------
       Mount can commit against a layout/media state the page has not settled
       into yet (pre-load iframe, hidden tab), and the box width is identical
       in both states, so the observer above cannot see it. This pass runs
       unconditionally: if the chosen branch disagrees with the live media
       query it remounts; otherwise it re-measures, which is idempotent and
       visually inert when the split is already correct. */
    function parallaxLive() {
      if (!ctx.ScrollTrigger) return false;
      return ctx.ScrollTrigger.getAll().some(function (st) { return st.trigger === root; });
    }

    function settle() {
      if (!root.isConnected) return;
      if (introTl && introTl.isActive && introTl.isActive()) {
        settleTimer = setTimeout(settle, 400);
        return;
      }
      if (mqDesktop.matches !== parallaxLive()) { scheduleRemount(); return; }
      showLines(splitLines());
      LodhiMotion.refresh();
    }

    settleTimer = setTimeout(settle, 300);
    window.addEventListener("load", settle);
    mqDesktop.addEventListener("change", scheduleRemount);

    /* Lines must be measured with the real display face loaded, or every word
       reports the same top and the whole headline becomes one mask. */
    /* Lines must be measured with the real display face active, or every word
       reports the same top and the whole headline becomes one mask. Timer-
       bounded, never frame-bounded: rAF does not fire in a hidden tab. */
    function whenMeasurable(fn) {
      var ran = false;
      var once = function () { if (!ran) { ran = true; fn(); } };
      if (document.fonts && document.fonts.status !== "loaded") {
        document.fonts.ready.then(once);
        setTimeout(once, 400);
      } else {
        once();
      }
    }

    function kill(t) {
      if (!t) return;
      if (t.scrollTrigger) t.scrollTrigger.kill();
      t.kill();
    }

    function start(k, withParallax) {
      var made = [];
      var cancelled = false;
      whenMeasurable(function () {
        if (cancelled) return;
        if (played()) finalState(); else { introTl = intro(k); made.push(introTl); }
        if (withParallax) made.push(parallax());
        made.push(breathe());
        /* one re-measure once the face has definitely swapped, so masks are
           correct even if the 400ms fallback fired first */
        if (document.fonts) {
          document.fonts.ready.then(function () {
            if (cancelled) return;
            var tl = made[0];
            var remeasure = function () { showLines(splitLines()); LodhiMotion.refresh(); };
            if (tl && tl.isActive && tl.isActive()) tl.eventCallback("onComplete", function () {
              markPlayed();
              remeasure();
            });
            else remeasure();
          });
        }
      });
      return function () {
        cancelled = true;
        made.forEach(kill);
        made.length = 0;
      };
    }

    LodhiMotion.respond({
      desktop: function () { return start(1, true); },
      mobile: function () { return start(MOBILE_FACTOR, false); },
      reduced: function () {
        finalState();
        markPlayed();
      }
    }, root);

    return {
      destroy: function () {
        if (observer) observer.disconnect();
        window.removeEventListener("load", settle);
        mqDesktop.removeEventListener("change", scheduleRemount);
        clearTimeout(settleTimer);
        clearTimeout(remountTimer);
        if (loop) loop.kill();
        if (title) {
          title.removeAttribute("data-motion-split");
          title.textContent = titleSource;
        }
        gsap.set([media, layer, cue].filter(Boolean), { clearProps: "all" });
      }
    };
  });
})();
