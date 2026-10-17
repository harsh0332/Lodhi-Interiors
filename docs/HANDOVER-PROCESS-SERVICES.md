# Lodhi Interiors — process and services rebuild

Open locally: http://localhost:3000/process and http://localhost:3000/services.

## Delivered
- Rebuilt process page as five continuous visual chapters, with a desktop sticky chapter rail, responsive mobile index, project imagery, client decisions and outcomes.
- Rebuilt services page with four photographic narratives, scope, service links and prefilled enquiries; consultancy/turnkey comparison and eight native service disclosures.
- Warm ivory/oxblood/brass palette, large sans/serif typography, animated architectural schematic, chapter rules/numerals, subtle photo settling and interactive arrows.
- No changes to the accepted homepage hero, video, logo or project images. Existing 3D link and both PDF resources remain.
- All process and service narrative content is server-rendered. New motion uses a native observer, CSS transforms and reduced-motion support, with no added packages. The two pages skip the older GSAP motion runtime.
- Mobile CSS includes 800px and 540px layouts, normal vertical flow, no hover-only interactions, native disclosures and visible keyboard focus.

## Validation
Production build generated 58 static entries. TypeScript passed.
Read-only production content crawl: 49 HTML pages, 47 local link targets, 167 image alt checks and five resource checks; zero errors.
New content tests: all five process stages and four service sections present without JavaScript, unique IDs, valid chapter anchors, labelled sections, service enquiry links and both PDF links. Existing homepage tab accessibility markup checks passed.
Next build reports 112 kB First Load JS for each rebuilt page, including shared framework code. This is a build estimate, not a Lighthouse or runtime performance measurement.

Live browser use is disabled in Work settings. Rendered desktop/mobile visual QA, real keyboard interactions, motion behaviour and Core Web Vitals have not been verified in this iteration. Do not treat source/CSS checks as a substitute for those checks.

## Running the project
npm install
npm run build
npm run start -- --port 3000

Development: npm run dev -- --port 3000
Do not build into the same .next directory while a production preview is serving it.

Source is also mirrored at /Users/harshchouksey/.cache/lodhi-cinematic-preview to avoid iCloud file-offloading stalls in the Desktop project. Changed source files are synced atomically to the user's project folder. No deployment or Git commit was performed.

Research rationale and sources: docs/PROCESS-SERVICES-REBUILD.md.
