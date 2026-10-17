import { Suspense } from "react";
import { getAllProjects } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { buildCollectionPageSchema } from "@/lib/schema";
import { PageIntro } from "@/components/editorial/Elements";
import { WorkIndexClient } from "@/components/sections/WorkIndexClient";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { DesignResources } from "@/components/editorial/DesignResources";
export const metadata = buildMetadata({
  title: "Our work — interior projects in Bhopal | Lodhi Interiors",
  description:
    "Explore residences, villas, kitchens and workplaces from the Lodhi Interiors studio in Bhopal.",
  path: "/work",
});
export default async function WorkPage() {
  const projects = await getAllProjects();
  const sorted = [...projects].sort(
    (a, b) => Number(b.frontmatter.featured) - Number(a.frontmatter.featured),
  );
  return (
    <div className="work-page refined-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildCollectionPageSchema(sorted)),
        }}
      />
      <PageIntro
        eyebrow="The portfolio"
        title="Spaces, with"
        italic="a point of view."
        description="Homes to settle into. Places to come together. Workspaces to do your best work. A collection of spaces shaped around the people who use them."
      />
      <section className="wrap page-body">
        <Suspense fallback={<p>Opening the collection…</p>}>
          <WorkIndexClient initialProjects={sorted} />
        </Suspense>
      </section>
      <DesignResources />
      <ClosingCTA />
    </div>
  );
}
