import Link from 'next/link';
import { env } from '@/lib/env';
import { Arrow } from '@/components/editorial/Elements';
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <div className="eyebrow">Thoughtfully designed. Personally yours.</div>
            <p>
              A place for your
              <br />
              next <em>chapter.</em>
            </p>
            <Link href="/contact" className="text-link">
              Let’s start a conversation <Arrow diagonal />
            </Link>
          </div>
          <div className="footer-contact">
            <span className="eyebrow">Find us in Bhopal</span>
            <a href={`tel:${env.NEXT_PUBLIC_PHONE_NUMBER.replace(/\s/g, '')}`}>
              {env.NEXT_PUBLIC_PHONE_NUMBER}
            </a>
            <a href="mailto:hello@lodhiinteriors.com">hello@lodhiinteriors.com</a>
            <span>Madhya Pradesh, India</span>
            <a
              href={`https://wa.me/${env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect on WhatsApp ↗
            </a>
          </div>
        </div>
        <nav className="footer-nav" aria-label="Footer navigation">
          {(
            [
              ['Work', '/work'],
              ['Studio', '/studio'],
              ['Services', '/services'],
              ['Process', '/process'],
              ['Journal', '/insights'],
              ['Locations', '/locations'],
              ['Contact', '/contact'],
            ] as [string, string][]
          ).map(([label, href]) => (
            <Link href={href} key={href}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="footer-wordmark" aria-hidden="true">
          lodhi interiors
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Lodhi Interiors</span>
          <span>Interior design & turnkey execution</span>
          <a
            href="https://www.instagram.com/lodhiinteriors.bhopal"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
