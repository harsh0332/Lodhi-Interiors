import { buildMetadata } from "@/lib/seo";

import { ProcessStory } from "@/components/cinematic/ProcessStory";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { DesignResources } from "@/components/editorial/DesignResources";
export const metadata = buildMetadata({
  title: "Our process — from concept to completion | Lodhi Interiors",
  description:
    "Understand the Lodhi Interiors design journey: discovery, design, materials, execution and handover.",
  path: "/process",
});
const faqs = [
  {
    question: "How long does a project take?",
    answer:
      "The timeline depends on the size of your space, design scope, site conditions and material lead times. We discuss a project-specific schedule after reviewing the brief and update it as selections are confirmed.",
  },
  {
    question: "Can we work together on design only?",
    answer:
      "Yes. Tell us whether you need design guidance, drawings or complete design and execution. We will agree the scope before starting.",
  },
  {
    question: "What should I bring to the first conversation?",
    answer:
      "A floor plan or site photos, your location, an approximate budget and a few references you like are a useful start. If you do not have drawings, we can discuss a site visit.",
  },
  {
    question: "What if I want to change something during the project?",
    answer:
      "We review the change with you, including any effect on cost and timeline, before agreeing the next steps.",
  },
];
export default function ProcessPage() {
  return (
    <div className="process-page refined-page">
      <ProcessStory />
      <DesignResources />
      <section className="detail-section wrap">
        <div className="detail-grid">
          <div>
            <span className="eyebrow">Before we begin</span>
            <h2>
              A few things
              <br />
              <em>you may wonder.</em>
            </h2>
          </div>
          <FaqAccordion faqs={faqs} />
        </div>
      </section>
      <ClosingCTA />
    </div>
  );
}
