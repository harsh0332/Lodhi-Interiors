import Link from "next/link";
import { Arrow } from "@/components/editorial/Elements";
export function ClosingCTA() {
  return (
    <section className="closing-cta">
      <div className="wrap closing-composition" data-reveal>
        <span className="eyebrow">Your space. Our next conversation.</span>
        <h2>
          Let’s make it
          <br />
          <em>personal.</em>
        </h2>
        <p className="closing-note">
          A home, a workplace, a new beginning.
          <br />
          Tell us what you have in mind.
        </p>
        <Link href="/contact" className="cin-button">
          Start your project <Arrow diagonal />
        </Link>
      </div>
    </section>
  );
}
