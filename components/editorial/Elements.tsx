import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      aria-hidden="true"
    >
      {diagonal ? <path d="M5 19 19 5M5 5h14v14" /> : <path d="M4 12h15m-6-6 6 6-6 6" />}
    </svg>
  );
}
export function TextLink({
  href,
  children,
  className = '',
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`text-link ${className}`}>
      {children}
      <Arrow diagonal />
    </Link>
  );
}
export function Photo({
  src,
  alt,
  className = '',
  priority = false,
  sizes = '(max-width: 760px) 100vw, 50vw',
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={`editorial-photo ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} quality={80} />
    </div>
  );
}
export function PageIntro({
  eyebrow,
  title,
  italic,
  description,
}: {
  eyebrow: string;
  title: string;
  italic?: string;
  description?: string;
}) {
  return (
    <section className="page-intro wrap">
      <div className="eyebrow">
        <span className="little-line" />
        {eyebrow}
      </div>
      <div className="page-intro-grid">
        <h1>
          {title} {italic && <em>{italic}</em>}
        </h1>
        {description && <p>{description}</p>}
      </div>
    </section>
  );
}
export function SectionHeading({
  number,
  label,
  title,
  italic,
  href,
  linkText,
}: {
  number: string;
  label: string;
  title: string;
  italic?: string;
  href?: string;
  linkText?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <div className="eyebrow">
          {number} <span className="little-line" />
          {label}
        </div>
        <h2>
          {title} {italic && <em>{italic}</em>}
        </h2>
      </div>
      {href && <TextLink href={href}>{linkText || 'Explore more'}</TextLink>}
    </div>
  );
}
