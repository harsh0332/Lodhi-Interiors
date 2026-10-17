import type { Metadata } from 'next';
import { getFeaturedProjects, getAllInsights } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { buildLocalBusinessSchema } from '@/lib/schema';
import { Home } from '@/components/editorial/Home';
export const metadata: Metadata = buildMetadata({
  title: 'Interior Designer in Bhopal | Lodhi Interiors',
  description:
    'Thoughtful residential and commercial interiors by Soumya Lodhi. A Bhopal design and turnkey studio, from the first idea to the final detail.',
  path: '/',
});
export default async function HomePage() {
  const [projects, insights] = await Promise.all([getFeaturedProjects(), getAllInsights()]);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildLocalBusinessSchema()) }}
      />
      <Home projects={projects} insights={insights} />
    </>
  );
}
