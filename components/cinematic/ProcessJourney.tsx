"use client";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { Photo, Arrow, TextLink } from "@/components/editorial/Elements";
import { designJourney } from "@/lib/design-journey";
export function ProcessJourney({ detailed = false }: { detailed?: boolean }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const stage = designJourney[active]!;
  function onKey(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % 5;
    else if (e.key === "ArrowLeft") next = (i + 4) % 5;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = 4;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }
  return (
    <section
      className={`flow-journey ${detailed ? "flow-detailed" : ""}`}
      id="our-approach"
    >
      <div className="wrap">
        {!detailed && (
          <div className="atelier-heading">
            <div>
              <span className="atelier-kicker">
                03 / A clear path from idea to home
              </span>
              <h2 data-reveal>
                Beautiful spaces.
                <br />
                <em>By a clear process.</em>
              </h2>
            </div>
            <p>
              Five connected stages.
              <br />
              Know what happens, what you review
              <br />
              and what comes next.
            </p>
          </div>
        )}
        <div
          className="flow-navigation"
          role="tablist"
          aria-label="Design journey stages"
        >
          {designJourney.map((s, i) => (
            <button
              type="button"
              role="tab"
              key={s.name}
              id={`${id}-tab-${i}`}
              aria-controls={`${id}-panel-${i}`}
              aria-selected={active === i}
              tabIndex={active === i ? 0 : -1}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              onKeyDown={(e) => onKey(e, i)}
              onClick={() => setActive(i)}
              className={i <= active ? "flow-reached" : ""}
            >
              <span className="flow-node">0{i + 1}</span>
              <span>{s.name}</span>
              <span className="flow-connector" aria-hidden="true" />
            </button>
          ))}
        </div>
        {designJourney.map((s, i) => (
          <div
            role="tabpanel"
            tabIndex={0}
            key={s.name}
            id={`${id}-panel-${i}`}
            aria-labelledby={`${id}-tab-${i}`}
            hidden={active !== i}
            className="flow-panel"
          >
            {active === i && (
              <>
                <div className={`flow-visual ${i === 2 ? "flow-drawing" : ""}`}>
                  <Photo
                    src={s.image}
                    alt={s.alt}
                    sizes="(max-width:760px) 100vw, 50vw"
                  />
                  <div className="flow-image-caption">
                    <span>THE LODHI JOURNEY</span>
                    <span>0{i + 1} / 05</span>
                  </div>
                </div>
                <div className="flow-copy">
                  <span className="atelier-kicker">
                    Stage 0{i + 1} / {s.name}
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  {detailed && (
                    <ul className="flow-details">
                      {s.details.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  )}
                  <div className="flow-review">
                    <span className="atelier-kicker">
                      Your part in the process
                    </span>
                    <p>{s.client}</p>
                  </div>
                  <div className="flow-output">
                    <span aria-hidden="true">↳</span>
                    <div>
                      <span className="atelier-kicker">
                        What this stage brings
                      </span>
                      <strong>{s.output}</strong>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
        <div className="flow-bottom">
          <span className="flow-current">
            0{active + 1}
            <span> / 05 — {stage.name}</span>
          </span>
          {detailed ? (
            <TextLink href="/contact">Discuss your project</TextLink>
          ) : (
            <TextLink href="/process">The complete journey</TextLink>
          )}
          <button
            className="flow-next"
            onClick={() => {
              const next = (active + 1) % 5;
              setActive(next);
              tabs.current[next]?.focus({ preventScroll: true });
              tabs.current[next]?.scrollIntoView({
                block: "nearest",
                inline: "nearest",
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                  .matches
                  ? "auto"
                  : "smooth",
              });
            }}
          >
            {active === 4
              ? "Back to the beginning"
              : `Next: ${designJourney[active + 1]!.name}`}
            <Arrow />
          </button>
        </div>
      </div>
    </section>
  );
}
