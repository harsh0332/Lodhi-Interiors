import { buildMetadata } from "@/lib/seo";
import { buildFounderPersonSchema } from "@/lib/schema";
import {
  PageIntro,
  Photo,
  TextLink,
  SectionHeading,
} from "@/components/editorial/Elements";
import { StudioSignature } from "@/components/editorial/StudioSignature";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
export const metadata = buildMetadata({
  title: "The studio — Soumya Lodhi | Lodhi Interiors",
  description:
    "Meet Soumya Lodhi and the Bhopal interior design studio bringing thoughtful spaces to life through design and turnkey execution.",
  path: "/studio",
  ogImage: "/images/soumya-lodhi.jpg",
});
export default function StudioPage() {
  return (
    <div className="studio-page refined-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFounderPersonSchema()),
        }}
      />
      <PageIntro
        eyebrow="The studio · Bhopal"
        title="Good spaces."
        italic="Real connections."
        description="A personal studio with a complete perspective. We connect the ideas on the drawing board with the care and craft it takes to bring them to life."
      />
      <StudioSignature full />
      <section className="values-section">
        <div className="wrap">
          <SectionHeading
            number="01"
            label="What matters to us"
            title="Considered from"
            italic="every angle."
          />
          <div className="values-grid studio-values">
            {[
              [
                "Personal by design",
                "Your routines and preferences guide the brief. We make room for the way you actually live, work and gather.",
              ],
              [
                "Materials that belong",
                "Texture, colour and light work together. We select materials for their feel, function and place within the whole.",
              ],
              [
                "Connected from start to finish",
                "Design decisions and on-site work stay in conversation. A coordinated process helps the finished space reflect the original idea.",
              ],
            ].map(([title, text], i) => (
              <div key={title} data-reveal>
                <span className="eyebrow">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="story-grid wrap">
        <div>
          <span className="eyebrow">The people who make it real</span>
          <h2>
            Good ideas.
            <br />
            <em>Skilled hands.</em>
          </h2>
          <p>
            A drawing is only the beginning. On site, our designers, supervisors
            and craftspeople work through the measurements, material transitions
            and finishing details that give a space its character.
          </p>
          <p>
            Our practice is rooted in Bhopal, with an understanding of local
            homes, materials and the practical needs of a project.
          </p>
          <TextLink href="/process">See how we work</TextLink>
        </div>
        <Photo
          src="/images/projects/craft-moulding-installation.jpg"
          alt="A craftsperson installing wall mouldings on a Lodhi Interiors site"
        />
      </section>
      <ClosingCTA />
    </div>
  );
}
