"use client";
import { useState } from "react";
import Link from "next/link";
import { Arrow } from "@/components/editorial/Elements";
const choices = [
  ["Home interiors", "A home to make my own", "01"],
  ["Office", "A space for my business", "02"],
  ["Modular kitchen", "A kitchen, thoughtfully made", "03"],
] as const;
export function ProjectBrief() {
  const [type, setType] = useState<string>("Home interiors");
  return (
    <section className="project-brief" id="start-project">
      <div className="wrap brief-layout">
        <div data-reveal>
          <span className="cin-label">
            LET’S MAKE ROOM FOR SOMETHING EXTRAORDINARY
          </span>
          <h2>
            Your space.
            <br />
            <em>Our next story.</em>
          </h2>
          <p>
            Start with an idea. We’ll talk about your space, your priorities and
            how we can bring them together.
          </p>
        </div>
        <div className="brief-choices" data-reveal>
          <fieldset>
            <legend>I’m thinking about…</legend>
            {choices.map(([value, label, number]) => (
              <label
                key={value}
                className={value === type ? "is-selected" : ""}
              >
                <input
                  type="radio"
                  name="project-interest"
                  value={value}
                  checked={type === value}
                  onChange={() => setType(value)}
                />
                <span className="cin-label">{number}</span>
                <span>{label}</span>
                <span className="choice-dot" />
              </label>
            ))}
          </fieldset>
          <Link
            className="atelier-button brass-button"
            href={`/contact?project=${encodeURIComponent(type)}`}
          >
            Start the conversation <Arrow diagonal />
          </Link>
          <span className="brief-note">
            A conversation first. Share your floor plan when you’re ready.
          </span>
        </div>
      </div>
    </section>
  );
}
