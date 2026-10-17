import Link from "next/link";
import type { Project, Insight } from "@/lib/content";
import { Arrow, Photo, TextLink } from "./Elements";
import { DesignResources } from "./DesignResources";
import { ServiceExplorer } from "./ServiceExplorer";
import { StudioSignature } from "./StudioSignature";
import { Hero } from "@/components/sections/Hero";
import { ProcessJourney } from "@/components/cinematic/ProcessJourney";
import { ProjectBrief } from "@/components/cinematic/ProjectBrief";

const questions = [
  [
    "Can you handle the complete project?",
    "Yes. We offer design and turnkey execution. We discuss your site, priorities and scope together before agreeing what the studio will deliver.",
  ],
  [
    "How do we decide on a budget?",
    "Your area, requirements and material choices shape the budget. Share a comfortable range in your enquiry so we can discuss a relevant scope before moving into detailed design.",
  ],
  [
    "Will I see the design before execution?",
    "Layouts, material selections and 3D views help you understand the proposed space. The presentations and drawings above show how design decisions can be communicated.",
  ],
  [
    "What do I need for the first conversation?",
    "Your location, approximate area and an idea of what you want to change. A floor plan or site photographs are helpful, but you can get in touch before they are ready.",
  ],
];

export function Home({
  projects,
  insights,
}: {
  projects: Project[];
  insights: Insight[];
}) {
  const curated = ["shahpura-villa", "aranya-residence", "chunabhatti-villa"]
    .map((slug) => projects.find((p) => p.frontmatter.slug === slug))
    .filter((p): p is Project => Boolean(p));
  return (
    <div className="cinematic-home atelier-home">
      <Hero />
      <div className="atelier-strip">
        <span>LODHI INTERIORS / BHOPAL</span>
        <span>Distinctive design. Complete execution.</span>
        <a href="#selected-work">
          Discover the work <span aria-hidden="true">↓</span>
        </a>
      </div>

      <section className="atelier-intro">
        <div className="wrap intro-composition">
          <div className="intro-copy">
            <span className="atelier-kicker">A personal point of view</span>
            <h2 data-reveal>
              Extraordinary
              <br />
              spaces.
              <br />
              <em>Entirely yours.</em>
            </h2>
            <div className="intro-baseline">
              <p>
                We design for the way you live.
                <br />A Bhopal studio bringing interiors, materials and
                execution together—from the first idea to the final detail.
              </p>
              <Link
                href="/studio"
                className="round-link"
                aria-label="Meet Lodhi Interiors"
              >
                <Arrow diagonal />
              </Link>
            </div>
          </div>
          <figure className="intro-detail">
            <Photo
              src="/images/projects/lodhi-interiors-shahpura-villa-crystal-chandelier-drawing-room.webp"
              alt="Crystal chandelier, sculpted wall panelling and marble in a Lodhi interior"
              sizes="(max-width: 760px) 85vw, 34vw"
            />
            <figcaption>
              <span>DESIGN IS IN THE DETAILS</span>
              <span>01 — LODHI</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section
        className="atelier-work wrap"
        id="selected-work"
        aria-labelledby="work-title"
      >
        <div className="atelier-heading">
          <div>
            <span className="atelier-kicker">01 / The portfolio</span>
            <h2 id="work-title" data-reveal>
              Spaces with
              <br />
              <em>presence.</em>
            </h2>
          </div>
          <div className="heading-aside">
            <p>
              A few of our favourite spaces.
              <br />A world of possibilities for yours.
            </p>
            <TextLink href="/work">Explore all projects</TextLink>
          </div>
        </div>
        <div className="atelier-projects">
          {curated.map((p, i) => {
            const f = p.frontmatter;
            return (
              <article
                key={f.slug}
                className={`atelier-project project-position-${i}`}
              >
                <Link
                  href={`/work/${f.slug}`}
                  className="project-picture"
                  aria-label={`Explore ${f.title}`}
                  data-image-reveal
                >
                  <Photo
                    src={f.heroImage}
                    alt={f.gallery[0]?.alt || f.title}
                    sizes={
                      i === 2
                        ? "(max-width: 760px) 100vw, 65vw"
                        : "(max-width: 760px) 100vw, 50vw"
                    }
                  />
                  <span className="project-open">
                    <Arrow diagonal />
                    <span>View project</span>
                  </span>
                </Link>
                <div className="project-caption">
                  <span className="project-ordinal">0{i + 1}</span>
                  <div>
                    <span className="atelier-kicker">
                      {f.locality} · {f.city}
                    </span>
                    <h3>
                      <Link href={`/work/${f.slug}`}>{f.title}</Link>
                    </h3>
                    <span className="project-spec">
                      {f.projectType === "luxury-home"
                        ? "Private residence"
                        : "Residential interiors"}{" "}
                      <span> / </span> {f.areaSqft.toLocaleString("en-IN")} sq
                      ft
                    </span>
                  </div>
                  <Arrow diagonal />
                </div>
              </article>
            );
          })}
        </div>
        <div className="portfolio-invitation">
          <p>
            Your space could be <em>next.</em>
          </p>
          <Link className="atelier-button" href="/contact">
            Discuss your project <Arrow diagonal />
          </Link>
        </div>
      </section>

      <section className="atelier-expertise" id="expertise">
        <div className="wrap">
          <div className="atelier-heading">
            <div>
              <span className="atelier-kicker">02 / Made around your life</span>
              <h2 data-reveal>
                One studio.
                <br />
                <em>Every dimension.</em>
              </h2>
            </div>
            <p>
              From the rooms you retreat to,
              <br />
              to the spaces that move you forward.
            </p>
          </div>
          <ServiceExplorer />
          <Link
            href="/civil-construction-interior-work-bhopal"
            className="turnkey-row"
          >
            <span className="atelier-kicker">The complete experience</span>
            <span>
              From first sketch
              <br className="mobile-break" /> to final <em>handover.</em>
            </span>
            <span className="turnkey-cta">
              Explore turnkey execution <Arrow diagonal />
            </span>
          </Link>
        </div>
      </section>

      <ProcessJourney />
      <DesignResources />

      <StudioSignature />

      <div className="atelier-marquee" aria-hidden="true">
        <div data-type-drift>
          DESIGNED TO FEEL <em>different.</em> &nbsp; DESIGNED TO FEEL{" "}
          <em>different.</em>
        </div>
      </div>

      <section className="atelier-questions wrap">
        <div>
          <span className="atelier-kicker">Before we begin</span>
          <h2>
            Good questions.
            <br />
            <em>Clear answers.</em>
          </h2>
          <TextLink href="/contact">Ask us about your project</TextLink>
        </div>
        <div className="atelier-answers">
          {questions.map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      <ProjectBrief />
      <section className="atelier-journal wrap">
        <div className="journal-intro">
          <span className="atelier-kicker">The studio journal</span>
          <h2>
            A little <br />
            <em>perspective.</em>
          </h2>
          <TextLink href="/insights">Read the journal</TextLink>
        </div>
        {insights.slice(0, 2).map((insight) => (
          <Link
            href={`/insights/${insight.frontmatter.slug}`}
            className="atelier-journal-card"
            key={insight.frontmatter.slug}
          >
            <Photo
              src={insight.frontmatter.heroImage}
              alt={insight.frontmatter.title}
            />
            <span className="atelier-kicker">Design notes</span>
            <h3>{insight.frontmatter.title}</h3>
            <Arrow diagonal />
          </Link>
        ))}
      </section>
    </div>
  );
}
