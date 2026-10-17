import Link from "next/link";
import { Photo, Arrow } from "@/components/editorial/Elements";
import { designJourney } from "@/lib/design-journey";
import { ChapterMotion } from "./ChapterMotion";
import s from "./Narrative.module.css";

const stageNotes = [
  "Listen / Measure / Understand",
  "Plan / Visualise / Refine",
  "Select / Specify / Approve",
  "Coordinate / Build / Review",
  "Finish / Walk through / Settle in",
];

export function ProcessStory() {
  return (
    <ChapterMotion className={s.narrative}>
      <section className={`${s.cover} ${s.processCover}`}>
        <div className={s.coverCopy}>
          <span className={s.kicker}>Lodhi Interiors / Our process</span>
          <h1>
            A considered
            <br />
            journey.
            <br />
            <em>A personal space.</em>
          </h1>
          <p>
            Behind a beautiful space is a sequence of thoughtful decisions. We
            guide you through each one, from your first idea to the final
            walkthrough.
          </p>
          <a href="#discover" className={s.roundLink}>
            <span>Follow the journey</span>
            <span className={s.arrowCircle}>
              <Arrow />
            </span>
          </a>
          <div className={s.coverNote}>
            <span>05 stages</span>
            <span>One connected vision</span>
          </div>
        </div>
        <div className={s.coverComposition}>
          <Photo
            src="/images/projects/lodhi-interiors-ayodhya-bypass-formal-living-lounge.webp"
            alt="A thoughtfully composed living space with warm materials and sculptural lighting"
            priority
            sizes="(max-width: 800px) 100vw, 52vw"
            className={s.coverPhoto}
          />
          <div className={s.drawingCard} aria-hidden="true">
            <span>THE IDEA TAKES SHAPE</span>
            <svg
              viewBox="0 0 260 150"
              fill="none"
              stroke="currentColor"
              strokeWidth=".8"
            >
              <g className={s.planLines}>
                <path d="M22 126V26h210v100H22ZM22 40h108v86M130 26v57h102M144 83v43M22 107h108M47 40v67M47 64h58v43M62 64V40M105 64V40" />
                <path d="M153 42h59v24h-59zM166 94h44v21h-44zM30 49h9v48h-9z" />
                <path d="M130 83a24 24 0 0 1-24 24M130 83v24M144 83a22 22 0 0 1 22-22M144 83V61" />
                <path
                  strokeDasharray="3 3"
                  d="M10 13h234M10 139h234M10 5v141M244 5v141"
                />
              </g>
            </svg>
            <span>CONCEPT → DETAIL → SPACE</span>
          </div>
          <span className={s.imageCaption}>
            From intention to interior / Lodhi Interiors
          </span>
        </div>
      </section>
      <div className={s.journeyLayout}>
        <aside className={s.chapterRail}>
          <span className={s.kicker}>The design journey</span>
          <nav aria-label="Process chapters">
            {designJourney.map((stage, i) => (
              <a
                key={stage.name}
                href={`#${stage.name.toLowerCase()}`}
                data-chapter-link
                aria-current={i === 0 ? "step" : undefined}
              >
                <span>0{i + 1}</span>
                {stage.name}
                <span className={s.railDot} />
              </a>
            ))}
          </nav>
          <p>
            Your involvement.
            <br />
            Our expertise.
            <br />
            <em>At every step.</em>
          </p>
          <Link href="/contact" className={s.railContact}>
            Discuss your project <Arrow diagonal />
          </Link>
        </aside>
        <div className={s.chapters}>
          {designJourney.map((stage, i) => (
            <section
              key={stage.name}
              id={stage.name.toLowerCase()}
              data-chapter
              className={`${s.chapter} ${i % 2 ? s.chapterReverse : ""}`}
              aria-labelledby={`heading-${stage.name.toLowerCase()}`}
            >
              <div className={s.chapterTop}>
                <span className={s.kicker}>
                  Chapter 0{i + 1} / {stage.name}
                </span>
                <span className={s.stageNote}>{stageNotes[i]}</span>
              </div>
              <div className={s.chapterBody}>
                <div
                  className={`${s.chapterVisual} ${i === 2 ? s.technicalVisual : ""}`}
                >
                  <Photo
                    src={stage.image}
                    alt={stage.alt}
                    sizes="(max-width: 800px) 100vw, (max-width: 1100px) 42vw, 34vw"
                  />
                  <span className={s.bigNumber} aria-hidden="true">
                    0{i + 1}
                  </span>
                </div>
                <div className={s.chapterCopy}>
                  <h2 id={`heading-${stage.name.toLowerCase()}`}>
                    {stage.title}
                  </h2>
                  <p>{stage.text}</p>
                  <ul className={s.scopeList}>
                    {stage.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                  <div className={s.clientMoment}>
                    <span className={s.kicker}>Your moment</span>
                    <p>{stage.client}</p>
                  </div>
                </div>
              </div>
              <div className={s.stageOutcome}>
                <span className={s.outcomeIcon} aria-hidden="true">
                  ↳
                </span>
                <div>
                  <span className={s.kicker}>What we move forward with</span>
                  <p>{stage.output}</p>
                </div>
                <span className={s.outcomeCheck} aria-hidden="true">
                  ✓
                </span>
              </div>
            </section>
          ))}
        </div>
      </div>
      <section className={s.conversation}>
        <span className={s.kicker}>Your first step is simple</span>
        <h2>
          Bring an idea.
          <br />
          <em>We’ll take it from there.</em>
        </h2>
        <p>
          A floor plan, site photos or even a few references you love. Tell us
          where you are in your journey, and we’ll discuss the right next step.
        </p>
        <Link href="/contact" className={s.solidLink}>
          Start a conversation <Arrow diagonal />
        </Link>
        <span className={s.conversationNote}>
          Bhopal & surrounding areas · Design and execution
        </span>
      </section>
    </ChapterMotion>
  );
}
