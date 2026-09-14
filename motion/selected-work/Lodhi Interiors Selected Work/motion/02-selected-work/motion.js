/* Lodhi Interiors — module 02: selected work scroll gallery
   Registers a factory and does nothing at load time.

   data-motion="reveal"    the media frame — entry scale + fade
   data-motion="caption"   the caption block — follows 120ms later
   data-motion="parallax"  the shift layer inside a frame — desktop only
   data-motion-speed       parallax factor on the shift layer, -1…1
   data-motion-start/-end  ScrollTrigger window, read off the module root
*/
LodhiMotion.register("selected-work", function (root, ctx) {
  var items = ctx.items("[data-motion-item]");

  function parts(item) {
    return {
      media: item.querySelector('[data-motion="reveal"]'),
      caption: item.querySelector('[data-motion="caption"]'),
      shift: item.querySelector('[data-motion="parallax"]')
    };
  }

  /* total travel = 10% of the image's own height × speed, inside a 12% overscan */
  var TRAVEL = 5;

  LodhiMotion.respond({
    desktop: function () {
      var made = [];

      items.forEach(function (item) {
        var p = parts(item);
        if (!p.media) return;

        var tl = ctx.gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: ctx.str("start", "top 85%"),
            end: ctx.str("end", "bottom top"),
            once: true
          }
        });
        /* fromTo, not from: motion.css pre-hides these, so an implicit
           end state would resolve back to opacity 0. */
        tl.fromTo(p.media,
          { opacity: 0, scale: 1.04 },
          { opacity: 1, scale: 1, duration: ctx.DURATION.slow, ease: ctx.ease("cinematic") }
        );
        if (p.caption) {
          tl.fromTo(p.caption,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: ctx.DURATION.base, ease: ctx.ease("entrance") },
            0.12
          );
        }
        made.push(tl);

        if (p.shift) {
          var speed = parseFloat(p.shift.getAttribute("data-motion-speed"));
          if (isNaN(speed)) speed = 1;
          var amp = TRAVEL * Math.max(-1, Math.min(1, speed));
          made.push(ctx.gsap.fromTo(p.shift,
            { yPercent: -amp },
            {
              yPercent: amp,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                scrub: ctx.num("scrub", 0.4)
              }
            }
          ));
        }
      });

      return function () {
        made.forEach(function (t) {
          if (t.scrollTrigger) t.scrollTrigger.kill();
          t.kill();
        });
      };
    },

    mobile: function () {
      var made = [];
      items.forEach(function (item) {
        var p = parts(item);
        if (!p.media) return;
        var tl = ctx.gsap.timeline({
          scrollTrigger: { trigger: item, start: "top 90%", once: true }
        });
        tl.fromTo(p.media,
          { opacity: 0, scale: 1.02 },
          { opacity: 1, scale: 1, duration: ctx.DURATION.base, ease: ctx.ease("cinematic") }
        );
        if (p.caption) {
          tl.fromTo(p.caption,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: ctx.DURATION.fast, ease: ctx.ease("entrance") },
            0.08
          );
        }
        made.push(tl);
      });
      return function () {
        made.forEach(function (t) {
          if (t.scrollTrigger) t.scrollTrigger.kill();
          t.kill();
        });
      };
    },

    /* Static gallery: final position, final scale, every caption shown. */
    reduced: function () {
      items.forEach(function (item) {
        var p = parts(item);
        ctx.gsap.set([p.media, p.caption, p.shift].filter(Boolean), { clearProps: "all" });
      });
    }
  }, root);

  return {
    destroy: function () { /* no module-owned listeners */ }
  };
});
