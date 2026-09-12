import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllLocalities } from '@/lib/locations';
import { buildMetadata } from '@/lib/seo';
import { buildBreadcrumbSchema } from '@/lib/schema';
import { Section } from '@/components/ui/Section';
import { Display, Label } from '@/components/ui/Typography';
import { Reveal } from '@/components/motion/Reveal';
import { BLUR_DATA_URL, IMAGE_QUALITY } from '@/lib/images';
import { ClosingCTA } from '@/components/sections/ClosingCTA';

export const metadata: Metadata = buildMetadata({
  title: 'Interior Design Practice Localities in Bhopal | Lodhi Interiors',
  description:
    'Documented interior design and turnkey execution across Bhopal prime residential enclaves: Arera Colony, Shahpura, Koh-e-Fiza, Chuna Bhatti, and MP Nagar.',
  path: '/locations',
});

export default function LocationsHubPage() {
  const localities = getAllLocalities();
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Practice Areas', url: '/locations' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Section tone="light" className="pb-16 pt-32 md:pb-24 md:pt-44">
        <div className="max-w-4xl">
          <Reveal>
            <Label className="mb-3 block text-accent">Regional Practice</Label>
            <Display as="h1" className="mb-6">
              Bhopal Localities & Practice Areas
            </Display>
            <p className="font-sans text-[1.125rem] leading-relaxed text-charcoal/80 md:text-[1.25rem]">
              We design and execute turnkey interiors across Bhopal’s established residential
              enclaves, waterfront estates, and commercial corridors. Each locality brings distinct
              soil hydrology, solar orientation, and architectural heritage that inform our
              structural and material choices.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section tone="paper" className="py-20 md:py-32" aria-label="Locality Portfolio Index">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {localities.map((loc, idx) => (
            <Reveal key={loc.slug} delay={idx * 0.08}>
              <Link
                href={`/locations/${loc.slug}`}
                className="group flex h-full flex-col border border-greige/30 bg-bone transition-all duration-300 hover:border-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-charcoal">
                  <Image
                    src={loc.heroImage}
                    alt={loc.heroImageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={IMAGE_QUALITY}
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-charcoal/20 transition-opacity group-hover:opacity-0" />
                </div>

                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <span className="mb-2 block font-mono text-ui-caption uppercase tracking-wider text-accent">
                    Bhopal &bull; {loc.name}
                  </span>
                  <h2 className="mb-3 font-serif text-[1.5rem] font-medium text-charcoal transition-colors group-hover:text-accent">
                    {loc.name}
                  </h2>
                  <p className="mb-6 flex-1 font-sans text-ui-caption leading-relaxed text-charcoal/70">
                    {loc.tagline}
                  </p>
                  <span className="inline-flex items-center gap-2 font-sans text-ui-label font-medium uppercase tracking-wider text-charcoal group-hover:text-accent">
                    <span>Explore projects & context</span>
                    <span aria-hidden="true">&rarr;</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <ClosingCTA />
    </>
  );
}
