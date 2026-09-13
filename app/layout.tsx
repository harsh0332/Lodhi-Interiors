import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { serifFont, sansFont } from '@/app/fonts';
import { env } from '@/lib/env';
import { GA_MEASUREMENT_ID } from '@/lib/analytics';
import { LenisProvider } from '@/components/motion/LenisProvider';
import { ProjectTransitionProvider } from '@/components/motion/ProjectTransition';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import '@/styles/globals.css';

import { CustomCursor } from '@/components/ui/CustomCursor';
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp';
import { StickyMobileBar } from '@/components/sections/StickyMobileBar';

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: 'LODHI INTERIORS | Architectural & Turnkey Interior Studio Bhopal',
    template: '%s | LODHI INTERIORS',
  },
  description:
    'Editorial, minimal interior design and turnkey execution studio in Bhopal, Madhya Pradesh, India. Founded by Soumya Lodhi with 8+ years of craft in luxury residential and commercial architecture.',
  keywords: [
    'Interior Designer Bhopal',
    'Architectural Studio Bhopal',
    'Turnkey Interior Execution',
    'Luxury Home Design Bhopal',
    'Soumya Lodhi',
    'Lodhi Interiors',
    'Arera Colony Interior Designer',
  ],
  authors: [{ name: 'Soumya Lodhi', url: env.NEXT_PUBLIC_SITE_URL }],
  creator: 'LODHI INTERIORS',
  publisher: 'LODHI INTERIORS',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: env.NEXT_PUBLIC_SITE_URL,
    siteName: 'LODHI INTERIORS',
    title: 'LODHI INTERIORS | Architectural & Turnkey Interior Studio Bhopal',
    description:
      'Editorial, minimal interior design and turnkey execution studio in Bhopal, Madhya Pradesh, India. Founded by Soumya Lodhi.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LODHI INTERIORS | Architectural & Turnkey Interior Studio Bhopal',
    description:
      'Editorial, minimal interior design and turnkey execution studio in Bhopal, Madhya Pradesh, India.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: ['Atuff5E5Q6dYHtIgxzxI97aMES3pBu1YoH15TsBdsTw', 'googleecadafb3769b6cc7'],
  },
};

export const viewport: Viewport = {
  themeColor: '#F6F3EE',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${serifFont.variable} ${sansFont.variable}`}>
      <body className="flex min-h-screen flex-col bg-bone text-charcoal">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <LenisProvider>
          <ProjectTransitionProvider>
            <Header />
            <main id="main-content" tabIndex={-1} className="flex-grow">
              {children}
            </main>
            <Footer />
            {/* Global Conversion & Visual Motion Layer */}
            <CustomCursor />
            <FloatingWhatsApp />
            <StickyMobileBar />
          </ProjectTransitionProvider>
        </LenisProvider>

        {/* Google Analytics 4 (Non-blocking) */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
