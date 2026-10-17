import Link from "next/link";
import type { ServiceData } from "@/lib/services";
import { getAllProjects } from "@/lib/content";
import {
  buildBreadcrumbSchema,
  buildServiceSchema,
  buildFaqSchema,
} from "@/lib/schema";
import { Photo, TextLink, Arrow } from "@/components/editorial/Elements";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { ClosingCTA } from "./ClosingCTA";
export async function ServiceLandingView({
  service: s,
  canonicalPath,
}: {
  service: ServiceData;
  canonicalPath?: string;
}) {
  const all = await getAllProjects();
  const projects = all
    .filter((p) => p.frontmatter.projectType === s.projectType)
    .slice(0, 2);
  return (
    <div className="service-page refined-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            buildBreadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Services", url: "/services" },
              { name: s.name, url: canonicalPath || `/${s.slug}` },
            ]),
            buildServiceSchema({
              name: s.name,
              description: s.shortDescription,
              slug: s.slug,
            }),
            buildFaqSchema(s.faqs),
          ]),
        }}
      />
      <section className="service-detail-hero">
        <div className="service-detail-copy">
          <span className="eyebrow">Lodhi Interiors / {s.categoryTag}</span>
          <h1>{s.heroH1}</h1>
          <p>{s.shortDescription}</p>
          <Link href="/contact" className="cin-button brass-button">
            Discuss your space <Arrow diagonal />
          </Link>
          <TextLink href="#service-scope">Explore the scope</TextLink>
        </div>
        <Photo src={s.heroImage} alt={s.heroImageAlt} priority />
      </section>
      <nav className="service-route wrap" aria-label="From enquiry to handover">
        {[
          "Your brief",
          "Design direction",
          "Drawings & selections",
          "Execution",
          "Handover",
        ].map((label, i) => (
          <Link key={label} href="/process">
            <span>0{i + 1}</span>
            {label}
            <Arrow />
          </Link>
        ))}
      </nav>
      <section className="detail-section wrap" id="service-scope">
        <div className="detail-grid">
          <div>
            <span className="eyebrow">Designed around your project</span>
            <h2>
              From the big picture
              <br />
              <em>to the finer details.</em>
            </h2>
            <p>{s.scopeSummary}</p>
          </div>
          <ul className="scope-list">
            {s.scopeItems.map((item) => (
              <li key={item} data-reveal>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="service-approach-panel">
        <div className="wrap detail-grid">
          <div>
            <span className="eyebrow">Our approach</span>
            <h2>{s.approachTitle}</h2>
          </div>
          <div>
            {s.approachParagraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <TextLink href="/process">See the complete journey</TextLink>
          </div>
        </div>
      </section>
      {projects.length > 0 && (
        <section className="detail-section wrap">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Related spaces</span>
              <h2>See the possibilities.</h2>
            </div>
            <TextLink href="/work">All projects</TextLink>
          </div>
          <div className="portfolio-grid">
            {projects.map((p) => (
              <Link
                href={`/work/${p.frontmatter.slug}`}
                key={p.frontmatter.slug}
                className="work-card"
              >
                <Photo
                  src={p.frontmatter.heroImage}
                  alt={p.frontmatter.gallery[0]?.alt || p.frontmatter.title}
                />
                <div className="work-card-info">
                  <div>
                    <span className="eyebrow">
                      {p.frontmatter.locality} · {p.frontmatter.city}
                    </span>
                    <h3>{p.frontmatter.title}</h3>
                  </div>
                  <Arrow diagonal />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
      <section className="detail-section wrap">
        <div className="detail-grid">
          <div>
            <span className="eyebrow">Before we begin</span>
            <h2>
              Details that help
              <br />
              <em>you decide.</em>
            </h2>
          </div>
          <FaqAccordion faqs={s.faqs} />
        </div>
      </section>
      <section className="related-services wrap">
        <span className="eyebrow">Explore more expertise</span>
        {s.relatedServices.map((r) => (
          <Link href={`/services/${r.slug}`} key={r.slug}>
            <span>
              {r.name}
              <small>{r.description}</small>
            </span>
            <Arrow diagonal />
          </Link>
        ))}
      </section>
      <ClosingCTA />
    </div>
  );
}
