import { ProjectGallery } from '@/components/editorial/ProjectGallery';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllProjects, getProjectBySlug } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { buildProjectSchema, buildBreadcrumbSchema } from '@/lib/schema';
import { Photo, TextLink, Arrow } from '@/components/editorial/Elements';
import { ClosingCTA } from '@/components/sections/ClosingCTA';

interface PageProps {
  params: Promise<{ slug: string }>;
}
export async function generateStaticParams() {
  return (await getAllProjects()).map((p) => ({ slug: p.frontmatter.slug }));
}
export async function generateMetadata({ params }: PageProps) {
  const p = await getProjectBySlug((await params).slug);
  return p
    ? buildMetadata({
        title: `${p.frontmatter.title} | Lodhi Interiors`,
        description: p.frontmatter.brief,
        path: `/work/${p.frontmatter.slug}`,
        ogImage: p.frontmatter.heroImage,
        ogType: 'article',
      })
    : {};
}
export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();
  const p = project.frontmatter;
  const all = await getAllProjects();
  const next = all[(all.findIndex((x) => x.frontmatter.slug === slug) + 1) % all.length] || project;
  const stock = p.heroImage.startsWith('http');
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            buildProjectSchema(project),
            buildBreadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Work', url: '/work' },
              { name: p.title, url: `/work/${slug}` },
            ]),
          ]),
        }}
      />
      <section className="project-masthead wrap">
        <Link href="/work" className="eyebrow">
          ← Back to the collection
        </Link>
        <h1>{p.title}</h1>
        {stock && (
          <p className="mt-5 text-sm text-greige">
            Illustrative stock imagery from the existing studio archive.
          </p>
        )}
      </section>
      <Photo
        src={p.heroImage}
        alt={p.gallery[0]?.alt || p.title}
        className="project-cover"
        priority
        sizes="100vw"
      />
      <div className="wrap">
        <dl className="project-facts">
          {[
            ['Location', `${p.locality}, ${p.city}`],
            ['Space', p.projectType.replace(/-/g, ' ')],
            ['Scope', p.scope === 'turnkey' ? 'Design & execution' : p.scope],
            ['Area', `${p.areaSqft.toLocaleString('en-IN')} sq. ft.`],
          ].map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <section className="detail-section">
          <div className="detail-grid">
            <div>
              <span className="eyebrow">The brief</span>
              <h2>
                A space with
                <br />
                <em>its own story.</em>
              </h2>
            </div>
            <div>
              <p>{p.brief}</p>
              <TextLink href="/contact">Discuss a similar project</TextLink>
            </div>
          </div>
        </section>
        <ProjectGallery images={p.gallery} />
        <section className="detail-section">
          <div className="detail-grid">
            <div>
              <span className="eyebrow">Design thinking</span>
              <h2>
                Material, light
                <br />
                <em>and feeling.</em>
              </h2>
            </div>
            <div>
              <p>{p.concept}</p>
              <ul className="scope-list">
                {p.materials.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        {p.executionImages && (
          <section className="project-gallery" aria-label="Behind the scenes">
            {p.executionImages.map((im) => (
              <figure key={im.src}>
                <Photo src={im.src} alt={im.alt} />
                <figcaption>{im.caption}</figcaption>
              </figure>
            ))}
          </section>
        )}
        <section className="next-project">
          <span className="eyebrow">Continue exploring</span>
          <Link href={`/work/${next.frontmatter.slug}`}>
            {next.frontmatter.title}
            <Arrow diagonal />
          </Link>
        </section>
      </div>
      <ClosingCTA />
    </>
  );
}
