import { Photo, TextLink } from "./Elements";
export function StudioSignature({ full = false }: { full?: boolean }) {
  return (
    <section className={`signature-section ${full ? "signature-full" : ""}`}>
      <div className="wrap signature-layout">
        <div className="signature-visual">
          <div className="signature-outline" aria-hidden="true" />
          <Photo
            className="signature-portrait"
            src="/images/soumya-lodhi.jpg"
            alt="Soumya Lodhi, founder and principal designer of Lodhi Interiors"
            priority={full}
          />
          <div className="signature-detail" data-image-reveal>
            <Photo
              src="/images/projects/lodhi-interiors-shahpura-villa-crystal-chandelier-drawing-room.webp"
              alt="Interior detail with architectural lighting and wall panelling"
              sizes="(max-width:760px) 35vw, 20vw"
            />
          </div>
          <span className="signature-coordinate">
            BHOPAL, INDIA / A PERSONAL PRACTICE
          </span>
        </div>
        <div className="signature-copy">
          <span className="atelier-kicker">
            {full ? "The person behind the practice" : "04 / Inside the studio"}
          </span>
          <h2 data-reveal>
            Spaces are personal.
            <br />
            <em>So is our approach.</em>
          </h2>
          <p className="signature-lead">
            Your home should carry your personality.
            <br />
            Our work begins with understanding it.
          </p>
          <p>
            Led by Soumya Lodhi, our Bhopal studio brings design and turnkey
            execution into one conversation. How you live, what you value and
            how you want to feel guide the decisions we make.
          </p>
          <div className="signature-principles">
            <span>
              <b>Listen.</b> Understand your life.
            </span>
            <span>
              <b>Consider.</b> Resolve the details.
            </span>
            <span>
              <b>Create.</b> Bring it together.
            </span>
          </div>
          <div className="signature-byline">
            <span>Soumya Lodhi</span>
            <span>Founder & principal designer</span>
          </div>
          <TextLink href={full ? "/contact" : "/studio"}>
            {full ? "Begin a conversation" : "Meet the studio"}
          </TextLink>
        </div>
      </div>
    </section>
  );
}
