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

          {/* Right Column: Verified Studio NAP Block */}
          <div className="flex flex-col space-y-4 font-sans text-[0.875rem] text-greige lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="mb-2">
                <BrandLogo size="md" tone="light" />
              </div>

              <address className="not-italic leading-relaxed">
                Plot No 02, near Capital Petrol Pump,
                <br />
                Bhopal, Madhya Pradesh 462023, India
              </address>

              <div className="flex flex-col space-y-1.5 pt-2">
                <a
                  href={`tel:${env.NEXT_PUBLIC_PHONE_NUMBER}`}
                  className="w-fit transition-colors hover:text-bone focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {env.NEXT_PUBLIC_PHONE_NUMBER}
                </a>
                <a
                  href={`https://wa.me/${env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit transition-colors hover:text-bone focus-visible:ring-2 focus-visible:ring-accent"
                >
                  WhatsApp Consultation
                </a>
                <a
                  href="https://instagram.com/lodhiinteriors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit transition-colors hover:text-bone focus-visible:ring-2 focus-visible:ring-accent"
                >
                  Instagram (@lodhiinteriors)
                </a>
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

              {/* Legal / Studio Heritage */}
              <div className="col-span-2 flex flex-col justify-between md:col-span-3">
                <div>
                  <span className="mb-4 block font-sans text-ui-label uppercase tracking-[0.08em] text-greige">
                    Practice
                  </span>
                  <p className="font-sans text-[0.8125rem] leading-relaxed text-greige">
                    Founded by Soumya Lodhi. Over 8 years of dedicated architectural design and
                    in-house turnkey execution across Bhopal and Madhya Pradesh.
                  </p>
                </div>
                <div className="mt-8 flex flex-col gap-2 pt-4 font-sans text-ui-caption text-greige/80 md:mt-0">
                  <div>© {currentYear} LODHI INTERIORS. All rights reserved.</div>
                  <div className="text-[0.75rem] text-greige/70">
                    Designed &amp; Crafted by{' '}
                    <a
                      href="https://pixellayerss.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent transition-colors duration-200 hover:text-bone hover:underline focus-visible:ring-1 focus-visible:ring-accent"
                    >
                      Pixel Layer
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </footer>
  );
}
