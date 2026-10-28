import { Photo, Arrow } from "./Elements";
export function DesignResources() {
  return (
    <section className="atelier-resources">
      <div className="wrap">
        <div className="atelier-heading">
          <div>
            <span className="atelier-kicker">Inside the design process</span>
            <h2 data-reveal>
              See it.
              <br />
              <em>Before you live it.</em>
            </h2>
          </div>
          <p>
            Walk through an idea. Look inside the drawings.
            <br />
            See how a space takes shape before work begins.
          </p>
        </div>
        <a
          href="/work"
          className="atelier-tour"
        >
          <div className="tour-picture">
            <Photo
              src="/images/projects/lodhi-interiors-ayodhya-bypass-dining-atrium.webp"
              alt="Dining atrium interior design"
              sizes="(max-width: 760px) 100vw, 60vw"
            />
          </div>
          <div className="tour-copy">
            <span className="atelier-kicker">Selected interiors</span>
            <h3>
              Step into
              <br />
              <em>the possibilities.</em>
            </h3>
            <span className="text-link">
              View projects <Arrow diagonal />
            </span>
            <span className="resource-meta">
              Interior design portfolio
            </span>
          </div>
        </a>
        <div className="atelier-documents">
          <a
            href="/design-resources/residence-24x42-3d-views.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="atelier-document"
          >
            <Photo
              src="/design-resources/residence-24x42-preview.webp"
              alt="24 by 42 residence presentation cover"
            />
            <div>
              <span className="atelier-kicker">01 / Design presentation</span>
              <h3>
                The 24′ × 42′
                <br />
                residence.
              </h3>
              <p>Room-by-room 3D views and the floor plan.</p>
              <span className="text-link">
                View presentation <Arrow diagonal />
              </span>
              <span className="resource-meta">PDF · 10 pages · 1.3 MB</span>
            </div>
          </a>
          <a
            href="/design-resources/raja-residence-elevation-details.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="atelier-document"
          >
            <Photo
              src="/design-resources/elevation-details-preview.webp"
              alt="Raja residence bedroom elevation and plan"
            />
            <div>
              <span className="atelier-kicker">02 / Working drawings</span>
              <h3>
                From concept
                <br />
                to construction.
              </h3>
              <p>Plans, elevations and details for the Raja residence.</p>
              <span className="text-link">
                View drawing set <Arrow diagonal />
              </span>
              <span className="resource-meta">PDF · 8 pages · 1.5 MB</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
