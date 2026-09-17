import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServiceBySlug } from '@/lib/services';
import { buildMetadata } from '@/lib/seo';
import { ServiceLandingView } from '@/components/sections/ServiceLandingView';

const SLUG = 'office-interior-design-bhopal';

export async function generateMetadata(): Promise<Metadata> {
  const service = getServiceBySlug(SLUG);
  if (!service) return {};

  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: "/" + service.slug,
    ogImage: service.heroImage,
  });
}

export default async function ServicePage() {
  const service = getServiceBySlug(SLUG);
  if (!service) notFound();

  return <ServiceLandingView service={service} />;
}
