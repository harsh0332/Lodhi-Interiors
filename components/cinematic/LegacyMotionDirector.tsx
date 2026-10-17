"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Progressive enhancement: every section remains readable without JavaScript. */
export default function LegacyMotionDirector() {
  const pathname = usePathname();
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    let cancelled = false;
    const ctx = gsap.context(() => {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const headings = gsap.utils.toArray<HTMLElement>(
          "[data-reveal], .page-intro h1, .section-heading, .detail-grid > div, .story-grid > div:not(.editorial-photo), .project-masthead h1, .process-timeline article > div:not(.editorial-photo), .values-grid > div",
        );
        headings.forEach((el) => {
          gsap.fromTo(
            el,
            { y: 40 },
            {
              y: 0,
              duration: 1.15,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 94%", once: true },
            },
          );
        });
        gsap.utils
          .toArray<HTMLElement>(
            "[data-image-reveal], .signature-portrait, .journal-card > .editorial-photo, .founder-visual > .editorial-photo, .intro-detail > .editorial-photo, .service-tile > .editorial-photo, .story-grid > .editorial-photo, .project-gallery .editorial-photo",
          )
          .forEach((el) => {
            gsap.fromTo(
              el,
              { clipPath: "inset(10% 4% 10% 4%)" },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 85%", once: true },
              },
            );
          });
      });
      media.add(
        "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
            const img = el.querySelector("img");
            if (!img) return;
            gsap.fromTo(
              img,
              { yPercent: -5, scale: 1.13 },
              {
                yPercent: 5,
                scale: 1.13,
                ease: "none",
                scrollTrigger: {
                  trigger: el,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.8,
                },
              },
            );
          });
          gsap.utils.toArray<HTMLElement>(".project-scene").forEach((scene) => {
            const image = scene.querySelector(".scene-image img");
            gsap.fromTo(
              image,
              { scale: 1.12 },
              {
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: scene,
                  start: "top bottom",
                  end: "top 80px",
                  scrub: 1,
                },
              },
            );
          });
          gsap.utils
            .toArray<HTMLElement>("[data-type-drift]")
            .forEach((line) => {
              gsap.fromTo(
                line,
                { xPercent: 0 },
                {
                  xPercent: -18,
                  ease: "none",
                  scrollTrigger: {
                    trigger: line.parentElement,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                  },
                },
              );
            });
          gsap.utils
            .toArray<HTMLElement>(".project-picture img")
            .forEach((image) => {
              gsap.fromTo(
                image,
                { scale: 1.055 },
                {
                  scale: 1,
                  ease: "none",
                  scrollTrigger: {
                    trigger: image.parentElement,
                    start: "top bottom",
                    end: "bottom center",
                    scrub: 0.8,
                  },
                },
              );
            });
        },
      );
    });
    const refresh = () => {
      if (!cancelled) ScrollTrigger.refresh();
    };
    document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);
    const timer = window.setTimeout(refresh, 700);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      window.removeEventListener("load", refresh);
      media.revert();
      ctx.revert();
    };
  }, [pathname]);
  return null;
}
