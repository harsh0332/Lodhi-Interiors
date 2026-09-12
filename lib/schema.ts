import { env } from '@/lib/env';
import type { Project, Insight } from '@/lib/content';

/**
 * Schema.org JSON-LD builders for LODHI INTERIORS.
 * Strictly adheres to Google Search Central guidelines:
 * - Truthful representation only.
 * - Real street address with postal code 462023 and geo-coordinates.
 * - Provider links to canonical studio entity.
 * - Zero self-serving AggregateRating or Review markup.
 */

export function buildLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${env.NEXT_PUBLIC_SITE_URL}/#studio`,
    name: 'LODHI INTERIORS',
    legalName: 'Lodhi Interiors',
    alternateName: 'Lodhi Interiors Bhopal',
    description:
      'Editorial, minimal interior design and turnkey execution studio in Bhopal, Madhya Pradesh, India. Founded by Soumya Lodhi with 8+ years in practice.',
    url: env.NEXT_PUBLIC_SITE_URL,
    telephone: env.NEXT_PUBLIC_PHONE_NUMBER,
    email: 'hello@lodhiinteriors.com',
    founder: {
      '@type': 'Person',
      '@id': `${env.NEXT_PUBLIC_SITE_URL}/studio#founder`,
      name: 'Soumya Lodhi',
      jobTitle: 'Principal Designer & Founder',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Plot No 02, near Capital Petrol Pump',
      addressLocality: 'Bhopal',
      addressRegion: 'Madhya Pradesh',
      postalCode: '462023',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '23.2332',
      longitude: '77.4343',
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Bhopal',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Madhya Pradesh',
      },
    ],
    priceRange: '₹₹₹₹',
    image: `${env.NEXT_PUBLIC_SITE_URL}/images/og-default.jpg`,
    sameAs: ['https://instagram.com/lodhiinteriors'],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:00',
        closes: '19:00',
      },
    ],
  };
}

export function buildFounderPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${env.NEXT_PUBLIC_SITE_URL}/studio#founder`,
    name: 'Soumya Lodhi',
    jobTitle: 'Principal Designer & Founder',
    worksFor: {
      '@type': 'HomeAndConstructionBusiness',
      '@id': `${env.NEXT_PUBLIC_SITE_URL}/#studio`,
      name: 'LODHI INTERIORS',
      url: env.NEXT_PUBLIC_SITE_URL,
    },
    description:
      'Founder and Principal Designer at Lodhi Interiors with 8+ years of practice in architectural interior design and turnkey execution in Bhopal, Madhya Pradesh.',
    url: `${env.NEXT_PUBLIC_SITE_URL}/studio`,
    sameAs: ['https://instagram.com/lodhiinteriors'],
    knowsAbout: [
      'Interior Architecture',
      'Turnkey Execution',
      'Modular Joinery',
      'Residential Design',
      'Central Indian Climatic Materials',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Plot No 02, near Capital Petrol Pump',
      addressLocality: 'Bhopal',
      addressRegion: 'Madhya Pradesh',
      postalCode: '462023',
      addressCountry: 'IN',
    },
  };
}

export function buildProjectSchema(project: Project) {
  const { frontmatter } = project;
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${env.NEXT_PUBLIC_SITE_URL}/work/${frontmatter.slug}#project`,
    url: `${env.NEXT_PUBLIC_SITE_URL}/work/${frontmatter.slug}`,
    headline: frontmatter.title,
    description: frontmatter.brief,
    creator: {
      '@type': 'HomeAndConstructionBusiness',
      '@id': `${env.NEXT_PUBLIC_SITE_URL}/#studio`,
      name: 'LODHI INTERIORS',
      url: env.NEXT_PUBLIC_SITE_URL,
    },
    dateCreated: frontmatter.year.toString(),
    datePublished: frontmatter.publishedAt,
    image: frontmatter.heroImage
      ? frontmatter.heroImage.startsWith('http')
        ? frontmatter.heroImage
        : `${env.NEXT_PUBLIC_SITE_URL}${frontmatter.heroImage}`
      : undefined,
    locationCreated: {
      '@type': 'Place',
      name: `${frontmatter.locality}, ${frontmatter.city}`,
    },
    material: frontmatter.materials.join(', '),
  };
}

export function buildArticleSchema(insight: Insight) {
  const { frontmatter } = insight;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${env.NEXT_PUBLIC_SITE_URL}/insights/${frontmatter.slug}#article`,
    headline: frontmatter.title,
    description: frontmatter.description,
    author: {
      '@type': 'Person',
      '@id': `${env.NEXT_PUBLIC_SITE_URL}/studio#founder`,
      name: 'Soumya Lodhi',
      url: `${env.NEXT_PUBLIC_SITE_URL}/studio`,
    },
    publisher: {
      '@type': 'HomeAndConstructionBusiness',
      '@id': `${env.NEXT_PUBLIC_SITE_URL}/#studio`,
      name: 'LODHI INTERIORS',
      url: env.NEXT_PUBLIC_SITE_URL,
    },
    datePublished: frontmatter.publishedAt,
    dateModified: frontmatter.updatedAt || frontmatter.publishedAt,
    image: frontmatter.heroImage
      ? frontmatter.heroImage.startsWith('http')
        ? frontmatter.heroImage
        : `${env.NEXT_PUBLIC_SITE_URL}${frontmatter.heroImage}`
      : undefined,
    mainEntityOfPage: `${env.NEXT_PUBLIC_SITE_URL}/insights/${frontmatter.slug}`,
  };
}

export function buildServiceSchema(service: {
  name: string;
  description: string;
  slug: string;
  serviceType?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${env.NEXT_PUBLIC_SITE_URL}/services/${service.slug}#service`,
    name: service.name,
    description: service.description,
    serviceType: service.serviceType || service.name,
    provider: {
      '@type': 'HomeAndConstructionBusiness',
      '@id': `${env.NEXT_PUBLIC_SITE_URL}/#studio`,
      name: 'LODHI INTERIORS',
      url: env.NEXT_PUBLIC_SITE_URL,
      telephone: env.NEXT_PUBLIC_PHONE_NUMBER,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Plot No 02, near Capital Petrol Pump',
        addressLocality: 'Bhopal',
        addressRegion: 'Madhya Pradesh',
        postalCode: '462023',
        addressCountry: 'IN',
      },
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Bhopal',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Madhya Pradesh',
      },
    ],
  };
}

export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${env.NEXT_PUBLIC_SITE_URL}${item.url}`,
    })),
  };
}

export function buildFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function buildCollectionPageSchema(projects: Project[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${env.NEXT_PUBLIC_SITE_URL}/work#collection`,
    name: 'Our work — interior design projects in Bhopal | Lodhi Interiors',
    description:
      'Portfolio of residential, luxury villa, and commercial interior design and turnkey execution projects in Bhopal.',
    url: `${env.NEXT_PUBLIC_SITE_URL}/work`,
    hasPart: projects.map((p) => ({
      '@type': 'CreativeWork',
      name: p.frontmatter.title,
      url: `${env.NEXT_PUBLIC_SITE_URL}/work/${p.frontmatter.slug}`,
      description: p.frontmatter.brief,
      locationCreated: `${p.frontmatter.locality}, ${p.frontmatter.city}`,
    })),
  };
}

export function buildContactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${env.NEXT_PUBLIC_SITE_URL}/contact#webpage`,
    url: `${env.NEXT_PUBLIC_SITE_URL}/contact`,
    name: 'Contact — start your interior project in Bhopal | Lodhi Interiors',
    description:
      'Initiate an interior design or turnkey execution project with Lodhi Interiors in Bhopal. Contact founder Soumya Lodhi directly via WhatsApp, phone, or project inquiry form.',
    mainEntity: {
      '@type': 'HomeAndConstructionBusiness',
      '@id': `${env.NEXT_PUBLIC_SITE_URL}/#studio`,
      name: 'LODHI INTERIORS',
      telephone: env.NEXT_PUBLIC_PHONE_NUMBER,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Plot No 02, near Capital Petrol Pump',
        addressLocality: 'Bhopal',
        addressRegion: 'Madhya Pradesh',
        postalCode: '462023',
        addressCountry: 'IN',
      },
    },
  };
}

export function buildLocalityPageSchema(locality: {
  name: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemPage',
    '@id': `${env.NEXT_PUBLIC_SITE_URL}/locations/${locality.slug}#webpage`,
    url: `${env.NEXT_PUBLIC_SITE_URL}/locations/${locality.slug}`,
    name: locality.metaTitle,
    description: locality.metaDescription,
    mainEntity: {
      '@type': 'HomeAndConstructionBusiness',
      '@id': `${env.NEXT_PUBLIC_SITE_URL}/#studio`,
      name: `LODHI INTERIORS — ${locality.name}`,
      telephone: env.NEXT_PUBLIC_PHONE_NUMBER,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Plot No 02, near Capital Petrol Pump',
        addressLocality: 'Bhopal',
        addressRegion: 'Madhya Pradesh',
        postalCode: '462023',
        addressCountry: 'IN',
      },
      areaServed: {
        '@type': 'AdministrativeArea',
        name: `${locality.name}, Bhopal`,
      },
    },
  };
}
