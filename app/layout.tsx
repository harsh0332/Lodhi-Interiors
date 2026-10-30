import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { serifFont, sansFont } from "@/app/fonts";
import { env } from "@/lib/env";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";

import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import "@/styles/globals.css";
import "@/styles/editorial.css";
import "@/styles/cinematic.css";
import "@/styles/atelier.css";
import "@/styles/refinements.css";
import { MotionDirector } from "@/components/cinematic/MotionDirector";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: "Interior Designer in Bhopal | Lodhi Interiors",
    template: "%s | LODHI INTERIORS",
  },
  description:
    "Bespoke interior design and turnkey execution studio in Bhopal, Madhya Pradesh, India. Founded by Soumya Lodhi with 8+ years of craft in luxury residential and commercial architecture.",
  keywords: [
    "Interior Designer Bhopal",
    "Architectural Studio Bhopal",
    "Turnkey Interior Execution",
    "Luxury Home Design Bhopal",
    "Soumya Lodhi",
    "Lodhi Interiors",
    "Arera Colony Interior Designer",
  ],
  authors: [{ name: "Soumya Lodhi", url: env.NEXT_PUBLIC_SITE_URL }],
  creator: "LODHI INTERIORS",
  publisher: "LODHI INTERIORS",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: env.NEXT_PUBLIC_SITE_URL,
    siteName: "LODHI INTERIORS",
    title: "LODHI INTERIORS | Architectural & Turnkey Interior Studio Bhopal",
    description:
      "Bespoke interior design and turnkey execution studio in Bhopal, Madhya Pradesh, India. Founded by Soumya Lodhi.",
  },
  twitter: {
    card: "summary_large_image",
    title: "LODHI INTERIORS | Architectural & Turnkey Interior Studio Bhopal",
    description:
      "Bespoke interior design and turnkey execution studio in Bhopal, Madhya Pradesh, India.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: [
      "Atuff5E5Q6dYHtIgxzxI97aMES3pBu1YoH15TsBdsTw",
      "googleecadafb3769b6cc7",
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#F6F3EE",
  width: "device-width",
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

        <Header />
        <main id="main-content" tabIndex={-1} className="flex-grow">
          {children}
        </main>
        <Footer />
        <MotionDirector />
        {/* Global Conversion & Visual Motion Layer */}

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
