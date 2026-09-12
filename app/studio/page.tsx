import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedProjects } from '@/lib/content';
import { buildFounderPersonSchema, buildBreadcrumbSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';
import { env } from '@/lib/env';
import { Section } from '@/components/ui/Section';
import { Display, Label } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { Reveal } from '@/components/motion/Reveal';
import { BLUR_DATA_URL } from '@/lib/images';

export const metadata: Metadata = buildMetadata({
  title: 'The studio — Soumya Lodhi, interior designer in Bhopal | Lodhi Interiors',
  description:
    'Founded by Soumya Lodhi with 8+ years of practice in Bhopal. Lodhi Interiors unites architectural interior design with single-source turnkey site execution.',
  path: '/studio',
  ogImage:
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop',
  ogType: 'profile',
});

const DIFFERENTIATORS = [
  {
    title: 'Single-Point Accountability',
    description:
      'One studio drafts the architectural drawings, manages procurement, and directs on-site execution. When challenges arise on site, there is no third-party contractor to deflect responsibility onto.',
  },
  {
    title: 'In-House Joinery & Trade Custody',
    description:
      'Rather than bidding projects out to transient labor crews, our master carpenters, certified electricians, and plumbing technicians work under direct studio supervision, preserving 1.5mm shadowline tolerances.',
  },
  {
    title: 'Climatic Material Discipline',
    description:
      'We specify natural stones, quarter-sawn veneers, breathable lime plasters, and certified IS 710 marine plywood engineered to endure Bhopal’s 44°C dry summers and high monsoon humidity cycles.',
  },
  {
    title: 'Daily Site Supervision',
    description:
      'Execution quality is governed on site, not from a distant showroom. Our project leads maintain continuous daily presence in Bhopal, verifying laser alignment, structural waterproofing, and trade sequencing.',
  },
];

const LOCALITIES = [
  { name: 'Arera Colony', note: 'Private family residences and multi-generational villas' },
  { name: 'Shahpura', note: 'Waterfront estates and minimal architectural villas' },
  { name: 'Koh-e-Fiza', note: 'Elevated penthouses and heritage-adjacent homes' },
  { name: 'MP Nagar', note: 'Corporate headquarters and advisory office interiors' },
  { name: 'Bawadiya Kalan', note: 'Custom culinary studios and modern residential builds' },
  { name: 'Malviya Nagar', note: 'High-focus retail showrooms and fine jewelry boutiques' },
  { name: 'Gulmohar', note: 'Bespoke residential apartments and hospitality bistros' },
  { name: 'Chuna Bhatti', note: 'Contemporary villas with double-height central lightwells' },
];

export default async function StudioPage() {
  const featuredProjects = await getFeaturedProjects();
  const displayProjects = featuredProjects.slice(0, 3);

  const founderSchema = buildFounderPersonSchema();
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Studio', url: '/studio' },
  ]);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(founderSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* 1. Opening: Large portrait of Soumya Lodhi + H1 + Positioning statement */}
      <div className="pt-28 md:pt-36">
        <Section tone="light" className="pb-16 pt-10 md:pb-24">
          <Reveal>
            <div className="mb-8">
              <Label className="mb-3 block text-accent">Architectural Practice · Bhopal</Label>
              <Display as="h1" className="mb-4 max-w-3xl">
                The studio
              </Display>
              <p className="max-w-2xl font-sans text-[1.125rem] leading-relaxed text-charcoal/85 md:text-[1.25rem]">
                An architectural interior design and turnkey execution practice in Bhopal, shaping
                complete residential and commercial spaces from initial concept to physical
                handover.
              </p>
            </div>
          </Reveal>

          {/* Portrait + Narrative Grid */}
          <div className="mt-12 grid grid-cols-1 items-start gap-12 border-t border-greige/30 pt-12 md:mt-16 md:pt-16 lg:grid-cols-12 lg:gap-16">
            {/* Portrait: Sits above narrative on mobile, left column on desktop */}
            <div className="order-1 lg:order-1 lg:col-span-5">
              <Reveal>
                <div className="relative aspect-[3/4] w-full overflow-hidden border border-greige/25 bg-paper">
                  <Image
                    src="/images/soumya-lodhi.jpg"
                    alt="Soumya Lodhi, founder and principal designer of Lodhi Interiors in Bhopal"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    quality={85}
                    className="object-cover object-top"
                  />
                </div>
                <div className="mt-4 flex flex-col">
                  <span className="font-serif text-[1.125rem] font-medium text-charcoal">
                    Soumya Lodhi
                  </span>
                  <span className="mt-0.5 font-sans text-ui-caption text-greige">
                    Principal Designer &amp; Founder · 8+ Years Practice
                  </span>
                </div>
              </Reveal>
            </div>

            {/* 2. Founder Narrative: Considered account (not CV, not sales pitch) */}
            <div className="order-2 space-y-6 font-sans text-[1.0625rem] leading-[1.8] text-charcoal/85 lg:order-2 lg:col-span-7">
              <Reveal delay={0.05}>
                <p>
                  Lodhi Interiors began over eight years ago with a single conviction: an interior
                  concept cannot be separated from the hands that physically build it. Too often in
                  Bhopal, thoughtful architectural drawings were handed over to disconnected
                  contractors who substituted materials, compromised shadowline tolerances, and
                  eroded the spatial intention before the client ever moved in.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <p>
                  We structured our practice to eliminate that compromise entirely. By keeping
                  architectural interior design and complete turnkey execution under one roof, we
                  take unconditional custody of the space. Every civil modification, electrical
                  chase, and bespoke piece of joinery is engineered, procured, and assembled by our
                  in-house teams.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <p>
                  We care deeply about proportion, daylight, and tactile restraint. We do not design
                  around transient showroom trends or decorative excess. Instead, we seek a quiet
                  permanence: honest natural stone planes, quarter-sawn timbers, breathable lime
                  washes, and calibrated architectural lighting that settles into Bhopal&rsquo;s
                  climate over decades of family residence.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <p>
                  Bhopal remains our home and our laboratory. From historic lakeside residences in
                  Koh-e-Fiza to private estates in Arera Colony and Shahpura, our work is shaped by
                  the regional light, monsoon rhythms, and craftsmanship of central India.
                </p>
              </Reveal>
            </div>
          </div>
        </Section>
      </div>

      {/* 3. How We Work Differently: Four factual operational blocks */}
      <Section tone="paper" className="border-t border-greige/20 py-20 md:py-32">
        <div className="mb-16 max-w-3xl">
          <Reveal>
            <Label className="mb-2 block text-accent">Operational Model</Label>
            <h2 className="mb-4 font-serif text-fluid-h2 text-charcoal">How We Work Differently</h2>
            <p className="font-sans text-[1rem] leading-relaxed text-charcoal/80">
              Our advantage is not a slogan; it is the structural separation between studio-led
              turnkey custody and ordinary contractor brokerage.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          {DIFFERENTIATORS.map((diff, idx) => (
            <Reveal key={diff.title} delay={idx * 0.05}>
              <div className="flex h-full flex-col border border-greige/30 bg-bone p-8">
                <span className="mb-3 block font-mono text-ui-label text-accent">0{idx + 1}</span>
                <h3 className="mb-3 font-serif text-[1.25rem] font-medium text-charcoal">
                  {diff.title}
                </h3>
                <p className="font-sans text-[0.9375rem] leading-relaxed text-charcoal/80">
                  {diff.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 4. The Team: Real craftsmen, designers & site supervisors */}
      <Section tone="light" className="border-t border-greige/20 py-20 md:py-32">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-6 lg:col-span-6">
            <Reveal>
              <Label className="mb-2 block text-accent">Collective Craft</Label>
              <h2 className="mb-4 font-serif text-fluid-h2 text-charcoal">
                The Site &amp; Studio Team
              </h2>
              <p className="font-sans text-[1.0625rem] leading-[1.75] text-charcoal/85">
                A disciplined team of interior architects, project managers, and trade specialists.
                Our core site supervisors, master carpenters, stone masons, and MEP technicians have
                worked alongside Soumya Lodhi for up to eight years.
              </p>
              <p className="font-sans text-[0.9375rem] leading-relaxed text-charcoal/75">
                We do not use outsourced labor brokers. When you commission Lodhi Interiors, the
                same craftsmen who fabricated our documented Arera Colony and Shahpura millwork are
                the ones setting laser levels on your site.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={0.1}>
              <div className="relative aspect-[16/10] w-full overflow-hidden border border-greige/25 bg-paper">
                <Image
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=75&w=1600&auto=format&fit=crop"
                  alt="Lodhi Interiors site supervision and joinery craftsmen on site in Bhopal"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={75}
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-cover"
                />
              </div>
              <span className="mt-3 block font-sans text-ui-caption text-greige">
                On-site joinery calibration and millwork framing in Bhopal.
              </span>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 5. Where We Work: Genuine Bhopal Localities */}
      <Section tone="paper" className="border-t border-greige/20 py-20 md:py-32">
        <div className="mb-16 max-w-3xl">
          <Reveal>
            <Label className="mb-2 block text-accent">Geography of Practice</Label>
            <h2 className="mb-4 font-serif text-fluid-h2 text-charcoal">Where We Work</h2>
            <p className="font-sans text-[1rem] leading-relaxed text-charcoal/80">
              Headquartered in Bhopal, we accept commissions across Madhya Pradesh and selective
              architectural projects across central India. We maintain active project presence in
              Bhopal’s key residential and commercial sectors.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {LOCALITIES.map((loc, idx) => (
            <Reveal key={loc.name} delay={idx * 0.03}>
              <div className="flex h-full flex-col border border-greige/25 bg-bone p-5">
                <span className="mb-1 font-serif text-[1.125rem] font-medium text-charcoal">
                  {loc.name}
                </span>
                <span className="mt-auto font-sans text-[0.8125rem] leading-relaxed text-greige">
                  {loc.note}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 6. Selected Work Strip: 3 Featured Commissions */}
      <Section tone="light" className="border-t border-greige/20 py-20 md:py-32">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <Reveal>
              <Label className="mb-2 block text-accent">Built Portfolio</Label>
              <h2 className="font-serif text-fluid-h2 text-charcoal">Selected Commissions</h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Link
              href="/work"
              className="font-sans text-ui-caption font-medium text-charcoal transition-colors hover:text-accent"
            >
              View complete archive &rarr;
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayProjects.map((project, idx) => (
            <Reveal key={project.frontmatter.slug} delay={idx * 0.08}>
              <ProjectCard
                slug={project.frontmatter.slug}
                title={project.frontmatter.title}
                locality={project.frontmatter.locality}
                projectType={project.frontmatter.projectType}
                heroImage={project.frontmatter.heroImage}
                aspectRatio="4/3"
              />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 7. Closing Call to Action */}
      <Section
        tone="dark"
        className="border-t border-greige/20 py-24 md:py-36"
        aria-label="Start your project with the studio"
      >
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal>
            <Label className="mb-3 block text-accent">Direct Consultation</Label>
            <h2 className="mb-6 font-serif text-fluid-display font-normal text-bone">
              Discuss your space with Soumya Lodhi.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mx-auto mb-10 max-w-xl font-sans text-[1.0625rem] leading-relaxed text-bone/80">
              We take on a limited number of commissions each year to preserve direct founder
              supervision over design and execution.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <Button
                variant="secondary"
                tone="dark"
                href="/contact"
                className="min-h-[48px] w-full px-8 text-[0.9375rem] sm:w-auto"
              >
                Start your project
              </Button>
              <Button
                variant="primary"
                tone="dark"
                href={`https://wa.me/${env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[48px] w-full text-[0.9375rem] text-bone/90 hover:text-bone sm:w-auto"
              >
                WhatsApp Consultation
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
