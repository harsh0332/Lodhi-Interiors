import Link from "next/link";
import { Photo, Arrow } from "@/components/editorial/Elements";
import { getAllServices } from "@/lib/services";
import { ChapterMotion } from "./ChapterMotion";
import s from "./Narrative.module.css";

const expertise = [
  {
    id: "homes",
    label: "Homes & villas",
    title: "Uniquely yours.",
    italic: "In every room.",
    text: "A home should feel like you. We connect the spaces you share, the corners you retreat to and the details you live with every day.",
    image: "/images/projects/lodhi-interiors-ayodhya-bypass-dining-atrium.webp",
    alt: "Double-height dining atrium with timber screens and a sculptural chandelier",
    scope: [
      "Layouts & furniture planning",
      "Materials, lighting & finishes",
      "Custom furniture & joinery",
    ],
    href: "/residential-interior-design-bhopal",
    enquiry: "Home interiors",
    detail: "For apartments, independent homes and villas",
  },
  {
    id: "workplaces",
    label: "Workplaces & commercial",
    title: "A space that works.",
    italic: "A presence that lasts.",
    text: "From a focused workspace to a memorable first impression. We bring your identity into the layout, lighting and experience of your business.",
    image: "/images/projects/vinay-yadav-cabin-1.jpg",
    alt: "Executive office interior with marble wall detail and integrated storage",
    scope: [
      "Workplace & visitor circulation",
      "Cabins, reception & shared spaces",
      "Lighting, storage & brand details",
    ],
    href: "/office-interior-design-bhopal",
    enquiry: "Office",
    detail: "For offices, retail and hospitality spaces",
  },
  {
    id: "kitchens",
    label: "Kitchens & joinery",
    title: "Beautiful to see.",
    italic: "A pleasure to use.",
    text: "The small movements matter. Where you reach, prepare, cook and gather shapes a kitchen with intuitive storage and a place for everything.",
    image:
      "/images/projects/lodhi-interiors-ayodhya-bypass-modular-kitchen-island.webp",
    alt: "Kitchen island and full-height cabinetry in a warm contemporary kitchen",
    scope: [
      "Workflow & appliance planning",
      "Cabinetry & internal storage",
      "Worktops, hardware & finishes",
    ],
    href: "/modular-kitchen-bhopal",
    enquiry: "Modular kitchen",
    detail: "For new kitchens and considered renovations",
  },
  {
    id: "execution",
    label: "Design & execution",
    title: "One clear vision.",
    italic: "Right to the finish.",
    text: "A good design deserves careful execution. Drawings, selections, trades and site reviews stay connected as your space comes together.",
    image: "/images/projects/craft-moulding-installation.jpg",
    alt: "Detailed wall moulding being installed by a craftsperson",
    scope: [
      "Drawings & material coordination",
      "Trade sequencing & site reviews",
      "Finishing, walkthrough & handover",
    ],
    href: "/services/turnkey-interiors",
    enquiry: "Home interiors",
    detail: "For projects that need design and site coordination",
  },
];
const slugs = [
  "residential-interiors",
  "luxury-home-interiors",
  "modular-kitchens",
  "office-interiors",
  "retail-showroom-interiors",
  "hospitality-restaurant-interiors",
  "turnkey-interiors",
  "false-ceiling-design-bhopal",
];

export function ServicesStory() {
  const services = getAllServices().filter((service) =>
    slugs.includes(service.slug),
  );
  return (
    <ChapterMotion className={s.narrative}>
      <section className={`${s.cover} ${s.servicesCover}`}>
        <div className={s.coverCopy}>
          <span className={s.kicker}>Interior design studio / Bhopal</span>
          <h1>
            Your space.
            <br />
            Our expertise.
            <br />
            <em>Every detail.</em>
          </h1>
          <p>
            Homes with personality. Workplaces with purpose. Thoughtful design
            and coordinated execution, shaped around the way you use your space.
          </p>
          <a href="#homes" className={s.roundLink}>
            <span>Explore our expertise</span>
            <span className={s.arrowCircle}>
              <Arrow />
            </span>
          </a>
          <div className={s.coverNote}>
            <span>Design consultancy</span>
            <span>Complete execution</span>
          </div>
        </div>
        <div className={s.coverComposition}>
          <Photo
            src="/images/projects/lodhi-interiors-ayodhya-bypass-formal-living-lounge.webp"
            alt="Bespoke residential living room with warm timber and layered lighting"
            priority
            sizes="(max-width: 800px) 100vw, 52vw"
            className={s.coverPhoto}
          />
          <div className={s.serviceSeal} aria-hidden="true">
            <span>THE WHOLE PICTURE</span>
            <strong>
              Designed.
              <br />
              <em>Resolved.</em>
            </strong>
            <span>FROM CONCEPT TO COMPLETION</span>
          </div>
          <span className={s.imageCaption}>
            Residential interiors / Lodhi Interiors
          </span>
        </div>
      </section>
      <nav className={s.expertiseNav} aria-label="Service collections">
        {expertise.map((item, i) => (
          <a
            key={item.id}
            data-chapter-link
            href={`#${item.id}`}
            aria-current={i === 0 ? "step" : undefined}
          >
            <span>0{i + 1}</span>
            <span className={s.navLabel}>{item.label}</span>
            <Arrow diagonal />
          </a>
        ))}
      </nav>
      <div className={s.expertiseStories}>
        {expertise.map((item, i) => (
          <section
            key={item.id}
            id={item.id}
            data-chapter
            className={`${s.expertiseStory} ${i % 2 ? s.expertiseReverse : ""}`}
            aria-labelledby={`service-${item.id}`}
          >
            <div className={s.expertiseVisual}>
              <Photo
                src={item.image}
                alt={item.alt}
                sizes="(max-width: 800px) 100vw, 54vw"
              />
              <span className={s.expertiseNumber} aria-hidden="true">
                0{i + 1}
              </span>
              <div className={s.photoFootnote}>
                <span>{item.label}</span>
                <span>LODHI / 0{i + 1}</span>
              </div>
            </div>
            <div className={s.expertiseCopy}>
              <span className={s.kicker}>
                0{i + 1} / {item.label}
              </span>
              <h2 id={`service-${item.id}`}>
                {item.title}
                <em>{item.italic}</em>
              </h2>
              <p>{item.text}</p>
              <ul className={s.scopeList}>
                {item.scope.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <span className={s.suitability}>{item.detail}</span>
              <div className={s.serviceActions}>
                <Link href={item.href} className={s.roundLink}>
                  Explore the service{" "}
                  <span className={s.arrowCircle}>
                    <Arrow diagonal />
                  </span>
                </Link>
                <Link
                  href={`/contact?project=${encodeURIComponent(item.enquiry)}`}
                  className={s.secondaryLink}
                >
                  Discuss your project <Arrow />
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>
      <section className={s.engagement}>
        <div className={s.engagementIntro}>
          <span className={s.kicker}>How we can work together</span>
          <h2>
            The right support.
            <br />
            <em>For your project.</em>
          </h2>
          <p>
            Start with what you need. We agree the scope, deliverables and
            responsibilities before work begins.
          </p>
        </div>
        <div className={s.engagementChoices}>
          <article>
            <span className={s.kicker}>01 / Design consultancy</span>
            <h3>
              The vision,
              <br />
              <em>fully resolved.</em>
            </h3>
            <p>
              For clients who need a design direction and drawings to guide
              their own execution team.
            </p>
            <ul>
              <li>Layouts and design development</li>
              <li>Material and lighting direction</li>
              <li>Agreed drawings and specifications</li>
            </ul>
            <Link href="/contact" className={s.roundLink}>
              Discuss design{" "}
              <span className={s.arrowCircle}>
                <Arrow diagonal />
              </span>
            </Link>
          </article>
          <article>
            <span className={s.kicker}>02 / Design + execution</span>
            <h3>
              The vision,
              <br />
              <em>brought to life.</em>
            </h3>
            <p>
              For clients who want the design and on-site work coordinated
              together by our studio.
            </p>
            <ul>
              <li>Design and technical planning</li>
              <li>Trade and site coordination</li>
              <li>Finishing and handover review</li>
            </ul>
            <Link href="/services/turnkey-interiors" className={s.roundLink}>
              Explore turnkey{" "}
              <span className={s.arrowCircle}>
                <Arrow diagonal />
              </span>
            </Link>
          </article>
        </div>
        <Link href="/process" className={s.processBridge}>
          <span>
            Wondering what happens next?
            <strong>Walk through our five-stage process.</strong>
          </span>
          <Arrow diagonal />
        </Link>
      </section>
      <section
        className={s.serviceDirectory}
        aria-labelledby="complete-expertise"
      >
        <div>
          <span className={s.kicker}>Find your service</span>
          <h2 id="complete-expertise">
            A closer look
            <br />
            <em>at the details.</em>
          </h2>
          <p>
            Explore the scope for your space. Each project is tailored after we
            understand your brief.
          </p>
        </div>
        <div className={s.serviceDetails}>
          {services.map((item, i) => (
            <details key={item.slug}>
              <summary>
                <span>0{i + 1}</span>
                <h3>{item.name}</h3>
                <span className={s.detailPlus} aria-hidden="true">
                  +
                </span>
              </summary>
              <div>
                <p>{item.shortDescription}</p>
                <Link
                  href={`/services/${item.slug}`}
                  className={s.secondaryLink}
                >
                  View service details <Arrow diagonal />
                </Link>
              </div>
            </details>
          ))}
        </div>
      </section>
    </ChapterMotion>
  );
}
