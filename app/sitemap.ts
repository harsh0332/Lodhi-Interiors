import type { MetadataRoute } from 'next';
import { env } from '@/lib/env';
import { getAllServices } from '@/lib/services';
import { getAllProjects, getAllInsights } from '@/lib/content';
import { getAllLocalities } from '@/lib/locations';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = env.NEXT_PUBLIC_SITE_URL;
  const now = new Date().toISOString();

  // 1. Static Core Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/studio`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/process`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/insights`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // 2. Service Pages (8 Commercial Money Pages)
  const services = getAllServices();
  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  // 3. Project Case Studies (8 Real Case Studies)
  const projects = await getAllProjects();
  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/work/${project.frontmatter.slug}`,
    lastModified: project.frontmatter.publishedAt || now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // 4. Insight Articles (2 Editorial Papers)
  const insights = await getAllInsights();
  const insightRoutes: MetadataRoute.Sitemap = insights.map((insight) => ({
    url: `${baseUrl}/insights/${insight.frontmatter.slug}`,
    lastModified: insight.frontmatter.updatedAt || insight.frontmatter.publishedAt || now,
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  // 5. Locality Pages (6 Verified Neighborhood Pages)
  const localities = getAllLocalities();
  const localityRoutes: MetadataRoute.Sitemap = localities.map((loc) => ({
    url: `${baseUrl}/locations/${loc.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...insightRoutes, ...localityRoutes];
}
