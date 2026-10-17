import { buildMetadata } from '@/lib/seo';
import { buildContactPageSchema } from '@/lib/schema';
import { env } from '@/lib/env';
import { PageIntro, Photo } from '@/components/editorial/Elements';
import { ContactForm } from '@/components/sections/ContactForm';
export const metadata = buildMetadata({
  title: 'Let’s talk — Contact Lodhi Interiors Bhopal',
  description:
    'Tell us about your home, workplace or interior design project. Contact the Lodhi Interiors studio in Bhopal.',
  path: '/contact',
});
export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildContactPageSchema()) }}
      />
      <PageIntro
        eyebrow="A new beginning"
        title="Tell us about"
        italic="your space."
        description="A new home, a fresh start, or an idea you have been holding onto. Share a little about your project, and let’s explore the possibilities together."
      />
      <section className="contact-layout wrap">
        <aside className="contact-aside">
          <Photo
            src="/images/projects/lodhi-interiors-ayodhya-bypass-formal-living-lounge.webp"
            alt="A warm and welcoming living room in the Lodhi Interiors portfolio"
            priority
          />
          <div className="contact-line">
            <span className="eyebrow">Call the studio</span>
            <a href={`tel:${env.NEXT_PUBLIC_PHONE_NUMBER.replace(/\s/g, '')}`}>
              {env.NEXT_PUBLIC_PHONE_NUMBER} ↗
            </a>
          </div>
          <div className="contact-line">
            <span className="eyebrow">Share ideas & floor plans</span>
            <a
              href={`https://wa.me/${env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Soumya, I would like to discuss an interior project.')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp ↗
            </a>
          </div>
          <div className="contact-line">
            <span className="eyebrow">Write to us</span>
            <a href="mailto:hello@lodhiinteriors.com">hello@lodhiinteriors.com ↗</a>
          </div>
          <div className="contact-line">
            <span className="eyebrow">Our home</span>
            <span>
              Shop No. 10, Ground Floor, Sagar High Street,
              <br />
              Ayodhya Bypass Road, Bhopal
            </span>
          </div>
        </aside>
        <ContactForm deliveryEnabled={Boolean(process.env.CRM_WEBHOOK_URL)} />
      </section>
    </>
  );
}
