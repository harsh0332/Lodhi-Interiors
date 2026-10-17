import { notFound } from 'next/navigation';
import { getAllServices, getServiceBySlug } from '@/lib/services';
import { buildMetadata } from '@/lib/seo';
import { ServiceLandingView } from '@/components/sections/ServiceLandingView';
interface Props {
  params: Promise<{ slug: string }>;
}
export function generateStaticParams() {
  return getAllServices().map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({ params }: Props) {
  const s = getServiceBySlug((await params).slug);
  return s
    ? buildMetadata({
        title: s.metaTitle,
        description: s.metaDescription,
        path: `/services/${s.slug}`,
        ogImage: s.heroImage,
      })
    : {};
}
export default async function ServicePage({ params }: Props) {
  const s = getServiceBySlug((await params).slug);
  if (!s) notFound();
  return <ServiceLandingView service={s} canonicalPath={`/services/${s.slug}`} />;
}
