import { buildMetadata } from "@/lib/seo";
import { ServicesStory } from "@/components/cinematic/ServicesStory";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
export const metadata = buildMetadata({
  title: "Interior Design & Turnkey Services | Lodhi Interiors Bhopal",
  description:
    "Explore home interiors, offices, modular kitchens and turnkey execution in Bhopal. Choose design consultancy or complete project support with Lodhi Interiors.",
  path: "/services",
});
export default function ServicesPage() {
  return (
    <div className="services-page refined-page">
      <ServicesStory />
      <ClosingCTA />
    </div>
  );
}
