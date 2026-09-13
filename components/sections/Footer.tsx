import React from 'react';
import Link from 'next/link';
import { env } from '@/lib/env';
import { Button } from '@/components/ui/Button';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { Reveal } from '@/components/motion/Reveal';

const FOOTER_NAV = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'Studio', href: '/studio' },
  { label: 'Process', href: '/process' },
  { label: 'Insights', href: '/insights' },
  { label: 'Practice Areas', href: '/locations' },
  { label: 'Contact', href: '/contact' },
];

const FOOTER_SERVICES = [
  { label: 'Residential Interiors', href: '/services/residential-interiors' },
  { label: 'Luxury Home Interiors', href: '/services/luxury-home-interiors' },
  { label: 'Turnkey Execution', href: '/services/turnkey-interiors' },
  { label: 'Modular Kitchens', href: '/services/modular-kitchens' },
  { label: 'Office Interiors', href: '/services/office-interiors' },
  { label: 'Commercial & Hospitality', href: '/services/commercial-interiors' },
];

const FOOTER_LOCALITIES = [
  { label: 'Arera Colony', href: '/locations/arera-colony' },
  { label: 'Shahpura', href: '/locations/shahpura' },
  { label: 'Koh-e-Fiza', href: '/locations/kohefiza' },
  { label: 'Chuna Bhatti', href: '/locations/chunabhatti' },
  { label: 'MP Nagar', href: '/locations/mp-nagar' },
];

/**
 * Footer: Large editorial closing section on charcoal background.
 * - Staggered rise of the closing statement, studio NAP block, and column navigation.
 * - Completely static under prefers-reduced-motion.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-greige/20 bg-charcoal pb-12 pt-24 text-bone md:pt-36">
      <div className="mx-auto max-w-container px-5 md:px-12">
        {/* Top Editorial Callout + Studio NAP */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Editorial CTA */}
          <div className="flex flex-col items-start lg:col-span-7">
            <Reveal>
              <p className="max-w-[20ch] font-serif text-fluid-h2 font-normal leading-[1.15] text-bone">
                Planning a space? Let us design and deliver it.
              </p>
              <div className="mt-8">
                <Button
                  variant="primary"
                  tone="dark"
                  href="/contact"
                  className="text-[1rem] tracking-wide"
                >
                  Start your project
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Verified Studio NAP & Direct Action Buttons */}
          <div className="flex flex-col space-y-4 font-sans text-[0.875rem] text-greige lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="mb-2">
                <BrandLogo size="md" tone="light" />
              </div>

              <address className="not-italic leading-relaxed text-greige/90">
                Shop No 10, Sagar High Street,
                <br />
                Near Dmart, Ayodhya Bypass,
                <br />
                Bhopal, Madhya Pradesh 462021, India
              </address>

              {/* Structured Action Buttons with Icons */}
              <div className="pt-2">
                <span className="mb-2.5 block font-sans text-[0.75rem] font-medium uppercase tracking-[0.14em] text-accent">
                  Direct Inquiries &amp; Studio Desk
                </span>
                <div className="flex flex-wrap gap-2.5">
                  <a
                    href={`tel:${env.NEXT_PUBLIC_PHONE_NUMBER}`}
                    className="inline-flex items-center gap-2 border border-greige/30 bg-bone/[0.04] px-3.5 py-2 text-[0.8125rem] font-sans font-medium text-bone/90 transition-all duration-200 hover:border-accent hover:bg-bone/10 hover:text-bone focus-visible:ring-2 focus-visible:ring-accent"
                    aria-label={`Call studio desk: ${env.NEXT_PUBLIC_PHONE_NUMBER}`}
                  >
                    <svg
                      className="h-3.5 w-3.5 text-accent"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>{env.NEXT_PUBLIC_PHONE_NUMBER}</span>
                  </a>

                  <a
                    href={`https://wa.me/${env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-greige/30 bg-bone/[0.04] px-3.5 py-2 text-[0.8125rem] font-sans font-medium text-bone/90 transition-all duration-200 hover:border-[#25D366] hover:bg-bone/10 hover:text-bone focus-visible:ring-2 focus-visible:ring-[#25D366]"
                    aria-label="WhatsApp consultation"
                  >
                    <svg
                      className="h-3.5 w-3.5 text-[#25D366]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.072-2.148-.528-1.724-.716-2.827-2.477-2.913-2.593-.086-.115-.697-.927-.697-1.768 0-.842.438-1.255.594-1.428.156-.173.34-.216.455-.216.115 0 .23 0 .331.005.106.006.248-.04.388.297.144.347.49 1.196.533 1.282.043.086.072.187.014.303-.058.115-.087.187-.173.288-.087.101-.183.226-.261.303-.09.088-.184.184-.079.364.105.18 468.767 1.003 1.242.689.61 1.27.798 1.45.885.18.087.288.073.395-.05.108-.124.461-.536.584-.72.123-.184.246-.153.414-.092.17.061 1.077.508 1.261.6.185.093.308.139.353.216.046.077.046.447-.098.852z" />
                    </svg>
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href="https://instagram.com/lodhiinteriors"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-greige/30 bg-bone/[0.04] px-3.5 py-2 text-[0.8125rem] font-sans font-medium text-bone/90 transition-all duration-200 hover:border-[#E4405F] hover:bg-bone/10 hover:text-bone focus-visible:ring-2 focus-visible:ring-[#E4405F]"
                    aria-label="Instagram profile"
                  >
                    <svg
                      className="h-3.5 w-3.5 text-[#E4405F]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Hairline Divider Rule */}
        <div className="mt-16 border-t border-greige/30 pt-12 md:mt-24">
          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-10 md:grid-cols-12">
              {/* Navigation Column */}
              <div className="col-span-1 md:col-span-3">
                <span className="mb-4 block font-sans text-ui-label uppercase tracking-[0.08em] text-greige">
                  Studio
                </span>
                <ul className="space-y-2.5">
                  {FOOTER_NAV.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-sans text-[0.875rem] text-bone/80 transition-colors hover:text-bone focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services Column */}
              <div className="col-span-1 md:col-span-4">
                <span className="mb-4 block font-sans text-ui-label uppercase tracking-[0.08em] text-greige">
                  Capabilities
                </span>
                <ul className="space-y-2.5">
                  {FOOTER_SERVICES.map((service) => (
                    <li key={service.label}>
                      <Link
                        href={service.href}
                        className="font-sans text-[0.875rem] text-bone/80 transition-colors hover:text-bone focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        {service.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bhopal Localities Column */}
              <div className="col-span-1 md:col-span-2">
                <span className="mb-4 block font-sans text-ui-label uppercase tracking-[0.08em] text-greige">
                  Bhopal
                </span>
                <ul className="space-y-2.5">
                  {FOOTER_LOCALITIES.map((loc) => (
                    <li key={loc.label}>
                      <Link
                        href={loc.href}
                        className="font-sans text-[0.875rem] text-bone/80 transition-colors hover:text-bone focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        {loc.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Practice Summary */}
              <div className="col-span-2 md:col-span-3">
                <span className="mb-4 block font-sans text-ui-label uppercase tracking-[0.08em] text-greige">
                  Practice
                </span>
                <p className="font-sans text-[0.8125rem] leading-relaxed text-greige">
                  Founded by Soumya Lodhi. Over 8 years of dedicated architectural design and
                  in-house turnkey execution across Bhopal and Madhya Pradesh.
                </p>
              </div>
            </div>

            {/* Dedicated Legal Bar: Unobstructed by floating WhatsApp button */}
            <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-greige/20 pt-8 pb-20 font-sans text-ui-caption text-greige/80 sm:flex-row sm:items-center lg:pb-4">
              <div>© {currentYear} LODHI INTERIORS. All rights reserved.</div>
              {/* lg:pr-56 leaves ample safe margin so WhatsApp Soumya button never collides */}
              <div className="text-[0.78125rem] lg:pr-56">
                Designed &amp; Crafted by{' '}
                <a
                  href="https://pixellayerss.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-accent underline-offset-4 transition-colors duration-200 hover:text-bone hover:underline focus-visible:ring-1 focus-visible:ring-accent"
                >
                  Pixel Layer
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </footer>
  );
}
