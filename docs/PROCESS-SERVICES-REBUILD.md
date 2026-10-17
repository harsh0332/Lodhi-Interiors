# Process and services — editorial rebuild

## Research and decisions
Reviewed 17 October 2026. Website text/structure research; reference sites were not visually inspected in a live browser during this iteration.

- [Studio Como: process](https://studiocomo.com/project-division/process/): concept, refinement, execution and care are explained as a sequence with client decisions. Adopted the clarity of stages and outcomes, with original Lodhi copy and assets.
- [1.61 London: design process](https://www.161london.com/the-1-61-design-process/): a journey from discovery through design, implementation and handover. Informed the chapter structure, client involvement and consultation CTA.
- [Banda: services](https://bandaproperty.com/services/): distinct expertise, imagery and service scope. Informed the separate residential, commercial, kitchen and execution stories.
- [TH2](https://www.th2designs.co.uk/): imagery, service categories and a direct consultation path. Informed the service-to-enquiry links.
- [Google: JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics): server rendering helps users and crawlers; not every crawler runs JavaScript. All five process chapters and four service narratives are now in the initial HTML. Service detail links are available without client hydration.
- [web.dev: high-performance animations](https://web.dev/articles/animations-guide): prefer transform/opacity and avoid layout-triggering animation. New motion uses transform only, one-time IntersectionObserver triggers and no animation dependency.

## Visual system
Warm ivory #f6f0e7, oxblood #2b1d22, bronze #9a6a45. Original colour photography, large sans headings paired with serif italic accents, narrow uppercase captions, generous spacing, architectural rules and chapter numerals. The homepage video hero and existing logo remain unchanged.

## Process
Replaces the standalone page's tab widget with a continuous five-chapter story. Desktop chapter navigation follows the reader; native anchor links work without JavaScript. Mobile uses a normal document flow and a compact five-link chapter index. Each stage includes the work, client involvement and tangible outcome. A small decorative schematic introduces the drawing-to-space idea; it is illustrative rather than a project construction drawing.

## Services
Replaces the duplicate tab/catalog arrangement with four photographic service stories. Scope is visible next to each image, with links to the service details and a prefilled enquiry. Two engagement options explain consultancy versus complete design and execution. Eight native disclosure rows retain deeper service discovery. No hover-only content.

## Performance and accessibility
- No new packages, videos, downloaded stock or generated image payloads.
- Route-scoped CSS module; new JS is a single native observer and server children.
- These two routes skip the existing GSAP motion runtime; other routes retain it through a deferred component.
- Priority image only in each cover; all other Next images lazy-load with responsive sizes and reserved aspect ratios.
- No faded images, autoplay carousels, scroll hijacking, pinned mobile scenes or infinite animation.
- Reduced-motion removes animation/transitions; content is present without JS.
- Native links, keyboard-operable details, visible focus, labelled chapters, one H1 and existing canonical metadata.

## Verification
See HANDOVER-PROCESS-SERVICES.md for build and content checks. Live browser control was disabled by Work settings during implementation; desktop/mobile rendered screenshots, interaction checks and measured Core Web Vitals are not claimed.
