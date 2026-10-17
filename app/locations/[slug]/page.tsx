import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllLocalities, getLocalityBySlug } from '@/lib/locations';
import { getProjectBySlug } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { buildLocalityPageSchema, buildBreadcrumbSchema } from '@/lib/schema';
import { PageIntro, Photo, TextLink, Arrow } from '@/components/editorial/Elements';
import { ClosingCTA } from '@/components/sections/ClosingCTA';
interface Props {
  params: Promise<{ slug: string }>;
}
export function generateStaticParams() {
  return getAllLocalities().map((l) => ({ slug: l.slug }));
}
export async function generateMetadata({ params }: Props) {
  const loc = getLocalityBySlug((await params).slug);
  return loc
    ? buildMetadata({
        title: loc.metaTitle,
        description: loc.metaDescription,
        path: `/locations/${loc.slug}`,
        ogImage: loc.heroImage,
      })
    : {};
}
export default async function LocationPage({ params }: Props) {
  const loc = getLocalityBySlug((await params).slug);
  if (!loc) notFound();
  const projects = (await Promise.all(loc.projectSlugs.map(getProjectBySlug))).filter(
    (p) => p !== null,
  );
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            buildLocalityPageSchema(loc),
            buildBreadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Locations', url: '/locations' },
              { name: loc.name, url: `/locations/${loc.slug}` },
            ]),
          ]),
        }}
      />
      <PageIntro
        eyebrow="Interior design in Bhopal"
        title={loc.name}
        italic="Made personal."
        description={loc.tagline}
      />
      <Photo
        className="project-cover"
        src={loc.heroImage}
        alt={loc.heroImageAlt}
        priority
        sizes="100vw"
      />
      <section className="detail-section wrap">
        <div className="detail-grid">
          <div>
            <span className="eyebrow">A local perspective</span>
            <h2>
              A thoughtful space.
              <br />
              <em>A familiar setting.</em>
            </h2>
          </div>
          <div>
            <p>
              Planning an interior project in {loc.name}? We bring space planning, material
              selection and turnkey coordination together, with a design that responds to your
              property and the way you use it.
            </p>
            <p>
              From your first conversation with the studio to the finishing details on site, we help
              you make the decisions that matter for your home or workplace.
            </p>
            <TextLink href="/contact">Discuss your project in {loc.name}</TextLink>
          </div>
        </div>
      </section>
      <section className="detail-section wrap">
        <div className="section-heading">
          <div>
            <span className="eyebrow">The collection</span>
            <h2>
              Spaces in <em>{loc.name}.</em>
            </h2>
          </div>
        </div>
        <div className="portfolio-grid">
          {projects.map(({ frontmatter: p }) => (
            <Link className="work-card" href={`/work/${p.slug}`} key={p.slug}>
              <Photo src={p.heroImage} alt={p.title} />
              <div className="work-card-info">
                <h3>{p.title}</h3>
                <Arrow diagonal />
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="detail-section wrap">
        <div className="detail-grid">
          <h2 className="font-serif text-4xl">Explore our services</h2>
          <div>
            {loc.relatedServices.map((s) => (
              <div key={s.slug}>
                <TextLink href={`/services/${s.slug}`}>{s.name}</TextLink>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ClosingCTA />
    </>
  );
}
