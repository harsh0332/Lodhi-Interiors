import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Display, Label } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Page Not Found — 404 | Lodhi Interiors Bhopal',
  description:
    'The requested page could not be located. Explore our residential and commercial interior design work and turnkey execution services in Bhopal.',
  robots: {
    index: false,
    follow: true,
  },
};

const SUGGESTED_SERVICES = [
  { name: 'Modular Kitchens in Bhopal', href: '/modular-kitchen-bhopal' },
  { name: 'Residential Interiors & Villas', href: '/residential-interior-design-bhopal' },
  { name: 'False Ceiling & Acoustic Design', href: '/false-ceiling-design-bhopal' },
  { name: 'Office & Commercial Fitouts', href: '/office-interior-design-bhopal' },
  { name: 'Civil & Turnkey Construction', href: '/civil-construction-interior-work-bhopal' },
];

export default function NotFound() {
  return (
    <div className="pt-24 md:pt-36">
      <Section tone="light" className="py-20 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <Label className="mb-3 block text-accent">Error 404 · Page Not Located</Label>
          <Display as="h1" className="mb-6 font-serif text-fluid-h1 text-charcoal">
            Space not found.
          </Display>
          <p className="mx-auto mb-10 max-w-lg font-sans text-[1.0625rem] leading-relaxed text-charcoal/80">
            The page you are looking for may have moved, been renamed, or does not exist. Explore our
            portfolio or browse our specialized interior services in Bhopal below.
          </p>

          <div className="mb-14 flex flex-wrap items-center justify-center gap-4">
            <Button variant="primary" tone="light" href="/" className="px-7 py-3">
              Return to Homepage
            </Button>
            <Button variant="secondary" tone="light" href="/contact" className="px-7 py-3">
              Contact Studio
            </Button>
          </div>

          <div className="border-t border-greige/30 pt-10 text-left">
            <span className="mb-4 block font-mono text-xs font-semibold uppercase tracking-widest text-charcoal/60">
              Explore Our Core Services in Bhopal
            </span>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {SUGGESTED_SERVICES.map((svc) => (
                <Link
                  key={svc.href}
                  href={svc.href}
                  className="group flex items-center justify-between rounded-sm border border-greige/25 bg-white p-4 transition-all duration-200 hover:border-accent hover:shadow-sm"
                >
                  <span className="font-sans text-[0.9375rem] font-medium text-charcoal group-hover:text-accent">
                    {svc.name}
                  </span>
                  <span className="font-mono text-xs text-accent transition-transform group-hover:translate-x-1">
                    &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
