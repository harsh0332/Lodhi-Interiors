import type { Metadata } from 'next';
import { getFeaturedProjects, getAllInsights } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { buildLocalBusinessSchema, buildBreadcrumbSchema } from '@/lib/schema';
import {
  Hero,
  Position,
  SelectedWork,
  ServicesList,
  StudioBio,
  Process,
  Numbers,
  Testimonials,
  InsightsTeaser,
  ClosingCTA,
} from '@/components/sections';

export const metadata: Metadata = buildMetadata({
  title: 'Lodhi Interiors — Interior Design and Turnkey Execution Studio in Bhopal',
  description:
    'Bhopal studio shaping complete luxury residential and commercial interiors from concept to turnkey execution. Founded by Soumya Lodhi, 8+ years in practice.',
  path: '/',
});

export default async function HomePage() {
  const [featuredProjects, allInsights] = await Promise.all([
    getFeaturedProjects(),
    getAllInsights(),
  ]);

  const localBusinessSchema = buildLocalBusinessSchema();
  const breadcrumbSchema = buildBreadcrumbSchema([{ name: 'Home', url: '/' }]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([localBusinessSchema, breadcrumbSchema]),
        }}
      />

      {/* 1. Hero */}
      <Hero />

      {/* 2. Position Statement */}
      <Position />

      {/* 3. Selected Work */}
      <SelectedWork projects={featuredProjects} />

      {/* 4. Services Typographic List */}
      <ServicesList />

      {/* 5. Studio Bio & Founder Narrative */}
      <StudioBio />

      {/* 6. Turnkey Process Sequence */}
      <Process />

      {/* 7. Verified Metrics & Count-up */}
      <Numbers />

      {/* 8. Client Perspectives */}
      <Testimonials />

      {/* 9. Editorial Insights (Skips if < 2 exist) */}
      <InsightsTeaser insights={allInsights} />

      {/* 10. Closing Call to Action */}
      <ClosingCTA />
    </>
  );
}
