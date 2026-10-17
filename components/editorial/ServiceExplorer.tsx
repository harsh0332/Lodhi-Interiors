"use client";
import { useId, useState, useRef, type KeyboardEvent } from "react";
import { Photo, Arrow } from "./Elements";
import Link from "next/link";
const services = [
  {
    name: "Homes & villas",
    heading: "A home with your signature.",
    text: "Rooms that connect. Materials that belong. A home planned around the way you live, host and unwind.",
    scope: [
      "Space planning",
      "Lighting & materials",
      "Bespoke furniture & joinery",
    ],
    href: "/residential-interior-design-bhopal",
    enquiry: "Home interiors",
    image:
      "/images/projects/lodhi-interiors-ayodhya-bypass-formal-living-lounge.webp",
    alt: "Living room with coordinated furniture, lighting and wall details",
  },
  {
    name: "Workplaces",
    heading: "Make room for better work.",
    text: "A clear identity and a practical flow. Offices and commercial interiors that support your people and the work they do.",
    scope: [
      "Workplace layout",
      "Cabins & collaboration spaces",
      "Storage, lighting & finishes",
    ],
    href: "/office-interior-design-bhopal",
    enquiry: "Office",
    image: "/images/projects/vinay-yadav-cabin-1.jpg",
    alt: "Office cabin with a marble backdrop and integrated storage",
  },
  {
    name: "Kitchens",
    heading: "Designed around your everyday.",
    text: "From the first cup of tea to a full family meal. Storage, surfaces and movement come together in a kitchen that works for you.",
    scope: ["Kitchen planning", "Cabinetry & storage", "Worktops & finishes"],
    href: "/modular-kitchen-bhopal",
    enquiry: "Modular kitchen",
    image:
      "/images/projects/lodhi-interiors-ayodhya-bypass-modular-kitchen-island.webp",
    alt: "Modular kitchen with an island and handleless cabinetry",
  },
  {
    name: "Turnkey",
    heading: "One vision. Carried through.",
    text: "Design and execution stay connected. Our studio coordinates drawings, material selections and site work through to the finishing details.",
    scope: [
      "Design & technical drawings",
      "Site and trade coordination",
      "Finishing & handover",
    ],
    href: "/civil-construction-interior-work-bhopal",
    enquiry: "Home interiors",
    image: "/images/projects/craft-moulding-installation.jpg",
    alt: "Wall moulding installation during interior execution",
  },
];
export function ServiceExplorer() {
  const [active, setActive] = useState(0);
  const id = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  function key(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    let n = i;
    if (e.key === "ArrowRight") n = (i + 1) % 4;
    else if (e.key === "ArrowLeft") n = (i + 3) % 4;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = 3;
    else return;
    e.preventDefault();
    setActive(n);
    refs.current[n]?.focus();
  }
  return (
    <div className="experience-explorer">
      <div
        className="experience-tabs"
        role="tablist"
        aria-label="Explore our expertise"
      >
        {services.map((s, i) => (
          <button
            key={s.name}
            id={`${id}-tab-${i}`}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls={`${id}-panel-${i}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => key(e, i)}
            ref={(el) => {
              refs.current[i] = el;
            }}
          >
            <span>0{i + 1}</span>
            {s.name}
            <Arrow diagonal />
          </button>
        ))}
      </div>
      {services.map((s, i) => (
        <div
          key={s.name}
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={`${id}-tab-${i}`}
          id={`${id}-panel-${i}`}
          hidden={active !== i}
          className="experience-panel"
        >
          {active === i && (
            <>
              <div className="experience-photo">
                <Photo
                  src={s.image}
                  alt={s.alt}
                  sizes="(max-width:760px) 100vw, 55vw"
                />
                <span className="experience-photo-label">
                  {s.name} / LODHI INTERIORS
                </span>
              </div>
              <div className="experience-copy">
                <span className="atelier-kicker">
                  Your space, thoughtfully resolved
                </span>
                <h3>{s.heading}</h3>
                <p>{s.text}</p>
                <ul>
                  {s.scope.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <div className="experience-actions">
                  <Link href={s.href} className="text-link">
                    Explore this service
                    <Arrow diagonal />
                  </Link>
                  <Link
                    href={`/contact?project=${encodeURIComponent(s.enquiry)}`}
                    className="experience-enquire"
                  >
                    Discuss your space <Arrow />
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
