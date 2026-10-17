import Link from "next/link";
import { getAllInsights } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { PageIntro, Photo, Arrow } from "@/components/editorial/Elements";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
export const metadata = buildMetadata({
  title: "The journal — ideas for considered interiors | Lodhi Interiors",
  description:
    "Notes from the Lodhi Interiors studio on materials, thoughtful homes and the design process.",
  path: "/insights",
});
export default async function InsightsPage() {
  const insights = await getAllInsights();
  return (
    <div className="journal-page refined-page">
      <PageIntro
        eyebrow="The studio journal"
        title="Ideas for"
        italic="living well."
        description="Notes on the materials we love, the details that matter, and what goes into making a space feel right."
      />
      <section className="journal-grid wrap page-body">
        {insights.map(({ frontmatter: p }, i) => (
          <Link
            className="journal-card"
            key={p.slug}
            href={`/insights/${p.slug}`}
          >
            <Photo src={p.heroImage} alt={p.title} priority={i === 0} />
            <div>
              <span className="eyebrow">
                {i === 0 ? "The lead story / " : "Design notes / "}
                {p.category}
              </span>
              <h2>{p.title}</h2>
              <p className="text-sm leading-relaxed text-greige">
                {p.description}
              </p>
              <span className="text-link mt-4">
                Read the story <Arrow diagonal />
              </span>
            </div>
          </Link>
        ))}
      </section>
      <ClosingCTA />
    </div>
  );
}
