import Link from 'next/link';
import { getAllLocalities } from '@/lib/locations';
import { buildMetadata } from '@/lib/seo';
import { PageIntro, Photo, Arrow } from '@/components/editorial/Elements';
import { ClosingCTA } from '@/components/sections/ClosingCTA';
export const metadata = buildMetadata({
  title: 'Interior design across Bhopal | Lodhi Interiors',
  description:
    'Explore our interior design practice across Arera Colony, Shahpura, Koh-e-Fiza and other Bhopal neighbourhoods.',
  path: '/locations',
});
export default function LocationsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Rooted in Bhopal"
        title="Our city."
        italic="Your neighbourhood."
        description="A local understanding, a personal perspective. We work with homes and businesses across Bhopal, tailoring every project to its own setting."
      />
      <section className="portfolio-grid wrap page-body">
        {getAllLocalities().map((loc, i) => (
          <Link className="work-card" href={`/locations/${loc.slug}`} key={loc.slug}>
            <Photo src={loc.heroImage} alt={loc.heroImageAlt} priority={i === 0} />
            <div className="work-card-info">
              <div>
                <span className="eyebrow">Bhopal · Madhya Pradesh</span>
                <h3>{loc.name}</h3>
              </div>
              <Arrow diagonal />
            </div>
          </Link>
        ))}
      </section>
      <ClosingCTA />
    </>
  );
}
