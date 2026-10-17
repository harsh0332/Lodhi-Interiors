"use client";
import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import type { Project } from "@/lib/content";
import { Photo, Arrow } from "@/components/editorial/Elements";
const filters = [
  ["all", "All spaces"],
  ["homes", "Homes & villas"],
  ["kitchens", "Kitchens"],
  ["workplaces", "Workplaces"],
  ["hospitality", "Retail & hospitality"],
] as const;
const categories: Record<string, string[]> = {
  homes: ["residential", "luxury-home"],
  kitchens: ["modular-kitchen"],
  workplaces: ["office", "commercial"],
  hospitality: ["retail", "hospitality"],
};
export function WorkIndexClient({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  const query = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const requested = query.get("category") || "all";
  const active = filters.some(([key]) => key === requested) ? requested : "all";
  const [view, setView] = useState<"gallery" | "index">("gallery");
  const projects = initialProjects.filter(
    (p) =>
      active === "all" ||
      categories[active]?.includes(p.frontmatter.projectType),
  );
  function select(value: string) {
    const q = new URLSearchParams(query.toString());
    if (value === "all") q.delete("category");
    else q.set("category", value);
    router.replace(`${pathname}${q.size ? "?" + q.toString() : ""}`, {
      scroll: false,
    });
  }
  return (
    <>
      <div className="portfolio-controls">
        <div className="portfolio-filters" aria-label="Filter projects">
          {filters.map(([key, label]) => (
            <button
              type="button"
              key={key}
              onClick={() => select(key)}
              aria-pressed={active === key}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="view-switch" aria-label="Portfolio view">
          <button
            onClick={() => setView("gallery")}
            aria-pressed={view === "gallery"}
          >
            Gallery
          </button>
          <button
            onClick={() => setView("index")}
            aria-pressed={view === "index"}
          >
            Index
          </button>
        </div>
      </div>
      <p className="portfolio-count" role="status">
        {projects.length} {projects.length === 1 ? "project" : "projects"} ·{" "}
        {filters.find(([key]) => key === active)?.[1]}
      </p>
      <div
        className={view === "gallery" ? "portfolio-grid" : "portfolio-index"}
        key={`${view}-${active}`}
      >
        {projects.map((p, i) => {
          const f = p.frontmatter;
          return (
            <Link
              key={f.slug}
              href={`/work/${f.slug}`}
              className={
                view === "gallery"
                  ? `work-card collection-card collection-card-${i % 4}`
                  : ""
              }
            >
              <Photo
                src={f.heroImage}
                alt={f.gallery[0]?.alt || f.title}
                sizes={
                  view === "index" ? "90px" : "(max-width: 760px) 100vw, 50vw"
                }
              />
              {view === "gallery" ? (
                <div className="work-card-info">
                  <div>
                    <span className="eyebrow">
                      {String(i + 1).padStart(2, "0")} / {f.locality} ·{" "}
                      {f.projectType.replace(/-/g, " ")}
                    </span>
                    <h2>{f.title}</h2>
                    {f.heroImage.startsWith("http") && (
                      <span className="portfolio-image-note">
                        Illustrative stock imagery
                      </span>
                    )}
                  </div>
                  <span className="collection-arrow">
                    <Arrow diagonal />
                  </span>
                </div>
              ) : (
                <>
                  <div>
                    <h2>{f.title}</h2>
                    <span className="eyebrow">
                      {String(i + 1).padStart(2, "0")} / {f.locality}
                      {f.heroImage.startsWith("http")
                        ? " · Illustrative imagery"
                        : ""}
                    </span>
                  </div>
                  <span className="eyebrow">{f.year}</span>
                  <Arrow diagonal />
                </>
              )}
            </Link>
          );
        })}
      </div>
      {!projects.length && (
        <div className="portfolio-empty">
          <h2>More stories to come.</h2>
          <p>Explore the complete collection in the meantime.</p>
          <button onClick={() => select("all")} className="text-link">
            Show all projects <Arrow />
          </button>
        </div>
      )}
    </>
  );
}
