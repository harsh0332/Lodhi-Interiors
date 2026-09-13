import type { Metadata } from 'next';
import { env } from '@/lib/env';

export interface BuildMetadataOptions {
  /**
   * Title of the page.
   * If provided, will be set as an absolute title for maximum precision.
   */
  title: string;

  /**
   * Meta description. Must be between 140 and 160 characters.
   * Helper ensures it adheres strictly to search engine snippet bounds.
   */
  description: string;

  /**
   * Relative path for the page (e.g. '/services/residential-interiors' or '/').
   * Used to generate the absolute, self-referencing canonical URL.
   */
  path: string;

  /**
   * Optional Open Graph image URL. Defaults to the architectural hero image.
   * Scaled for 1200x630 preview displays.
   */
  ogImage?: string;

  /**
   * Open Graph type. Defaults to 'website', or 'article' / 'profile'.
   */
  ogType?: 'website' | 'article' | 'profile';

  /**
   * Optional robots override. Defaults to index: true, follow: true.
   */
  robots?: {
    index?: boolean;
    follow?: boolean;
  };

  /**
   * Optional keywords array.
   */
  keywords?: string[];
}

export const DEFAULT_OG_IMAGE = '/images/og-default.jpg';

/**
 * Ensures the meta description strictly satisfies Google's optimal snippet bounds (140 to 160 characters).
 * - Truncates cleanly on word boundaries if > 160.
 * - Augments gracefully with studio context if < 140.
 */
export function formatMetaDescription(raw: string, contextFallback?: string): string {
  let cleaned = raw.replace(/\s+/g, ' ').trim();

  // If already within optimal bounds, return as is
  if (cleaned.length >= 140 && cleaned.length <= 160) {
    return cleaned;
  }

  // If too short, augment with contextual branding
  if (cleaned.length < 140) {
    const supplement =
      contextFallback || ' Conceived and executed turnkey in Bhopal by Lodhi Interiors.';
    const combined = `${cleaned.replace(/\.$/, '')}.${supplement}`;
    if (combined.length <= 160 && combined.length >= 140) {
      return combined;
    }
    cleaned = combined;
  }

  // If too long, truncate gracefully at last word boundary before 157 chars + '...'
  if (cleaned.length > 160) {
    const truncated = cleaned.slice(0, 157);
    const lastSpace = truncated.lastIndexOf(' ');
    if (lastSpace > 130) {
      return `${truncated.slice(0, lastSpace)}...`;
    }
    return `${cleaned.slice(0, 157)}...`;
  }

  return cleaned;
}

/**
 * Builds a standardized Next.js Metadata object adhering strictly to the LODHI INTERIORS SEO specification.
 */
export function buildMetadata({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  robots,
  keywords,
}: BuildMetadataOptions): Metadata {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  // Clean query params for canonical
  const cleanPath = normalizedPath.split('?')[0] || '/';
  const canonicalUrl = `${env.NEXT_PUBLIC_SITE_URL}${cleanPath === '/' ? '' : cleanPath}`;
  const formattedDescription = formatMetaDescription(description);

  const resolvedOgImage = ogImage.startsWith('http')
    ? ogImage
    : `${env.NEXT_PUBLIC_SITE_URL}${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`;

  const isIndexable = robots?.index !== false;
  const isFollowable = robots?.follow !== false;

  return {
    title: {
      absolute: title,
    },
    description: formattedDescription,
    keywords: keywords || [
      'Interior Designer Bhopal',
      'Architectural Interior Studio',
      'Turnkey Execution Bhopal',
      'Luxury Homes Bhopal',
      'Soumya Lodhi',
      'Lodhi Interiors',
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description: formattedDescription,
      url: canonicalUrl,
      siteName: 'LODHI INTERIORS',
      type: ogType,
      locale: 'en_IN',
      images: [
        {
          url: resolvedOgImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: formattedDescription,
      images: [resolvedOgImage],
    },
    robots: {
      index: isIndexable,
      follow: isFollowable,
      googleBot: {
        index: isIndexable,
        follow: isFollowable,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: ['Atuff5E5Q6dYHtIgxzxI97aMES3pBu1YoH15TsBdsTw', 'googleecadafb3769b6cc7'],
    },
  };
}
