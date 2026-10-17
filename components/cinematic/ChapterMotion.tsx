"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Native anchors and server-rendered content work before this enhancement loads. */
export function ChapterMotion({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = root.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const chapters = [...node.querySelectorAll<HTMLElement>("[data-chapter]")];
    const links = [
      ...node.querySelectorAll<HTMLAnchorElement>("[data-chapter-link]"),
    ];
    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.add(entry.target);
            entry.target.classList.add("chapter-entered");
          } else visible.delete(entry.target);
        }
        const current = chapters.find((chapter) => visible.has(chapter));
        if (current)
          links.forEach((link) => {
            if (link.hash === `#${current.id}`)
              link.setAttribute("aria-current", "step");
            else link.removeAttribute("aria-current");
          });
      },
      { rootMargin: "-20% 0px -25% 0px", threshold: 0 },
    );
    chapters.forEach((chapter) => observer.observe(chapter));
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
