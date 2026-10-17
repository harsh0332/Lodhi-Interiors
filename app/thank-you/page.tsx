import { buildMetadata } from '@/lib/seo';
import { PageIntro, TextLink } from '@/components/editorial/Elements';
import { env } from '@/lib/env';
import { ThankYouTracker } from './ThankYouTracker';
export const metadata = buildMetadata({
  title: 'Thank you | Lodhi Interiors',
  description: 'Thank you for getting in touch with the Lodhi Interiors studio.',
  path: '/thank-you',
  robots: { index: false, follow: false },
});
export default function ThankYou() {
  return (
    <>
      <ThankYouTracker />
      <PageIntro
        eyebrow="Your next chapter"
        title="Thank you"
        italic="for reaching out."
        description="If you have just submitted the enquiry form successfully, your enquiry has been accepted by our delivery service. Our studio will review your project details and get in touch."
      />
      <section className="wrap page-body">
        <p className="mb-6 text-sm text-greige">
          Have a floor plan or some ideas to share? You can send them directly on WhatsApp.
        </p>
        <a
          className="solid-link mb-8"
          href={`https://wa.me/${env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Continue on WhatsApp ↗
        </a>
        <div>
          <TextLink href="/work">Explore the collection</TextLink>
        </div>
      </section>
    </>
  );
}
