# Lodhi premium rebuild — 17 October 2026

## Preview and source
Production preview: http://localhost:3000/
Original project: /Users/harshchouksey/Desktop/lodhi interiors
Reliable working mirror: /Users/harshchouksey/.cache/lodhi-cinematic-preview

The Desktop directory uses iCloud and previously offloaded source files. Changed source files have been atomically copied back to the original project. The preview runs from the reliable mirror. The archive contains the runnable active source and referenced assets, excluding node_modules, build output, credentials and the unused original media archive. Existing original files were not deleted.

## What changed
Research preceded implementation; see PREMIUM-DESIGN-SYSTEM.md for observed references and decisions.
- Original hero component, original video and sequence preserved.
- Rebuilt homepage: wine/espresso identity, bold sans display typography with selective serif accents, asymmetric project gallery, original unfiltered images, photo-led expertise, interactive delivery stages, split 3D tour and original PDF resources, founder section, FAQ and project-type enquiry.
- Removed opacity-based scroll reveals; retained transform/clip reveals, project depth motion, moving typography, hover transitions and original film controls.
- Shared palette, navigation, typography, footer and resource presentation carry into inner pages.
- Contact form now uses two steps on desktop and mobile, preserves data on Back, validates step one and carries selected project type. Enter on step one advances without sending. Budget choices no longer imply unsupported project-price promises.
- No new stock/generated projects, invented awards or testimonials were added.

## Verified
- npm run build: pass; 58 generated static entries.
- npm run typecheck: pass.
- python3 scripts/check-redesign.py: 49 HTML pages, 47 local linked targets, 169 image elements, 5 resources, no errors. One H1 and canonical per checked page; image alt attributes; missing URL returns 404.
- npx tsx scripts/check-contact.ts: validation, unavailable delivery, upstream/network failure and successful mocked delivery pass. No external requests sent.
- Live browser visual inspection before access became disabled: desktop 1440 × 1000 and mobile 390 × 844. Width checks at 390 and 320 showed no horizontal page overflow. Project photographs had opacity 1 and filter none.
- Process Design selection changed the active panel and image. Office selection reached contact with Office prefilled. Form step advancement, invalid name blocking, Back with preserved values, keyboard Enter advancement and focus transfer checked. Mobile menu opened and Escape closed it.
- Corrected founder badge clipping and mobile header CTA wrapping during visual inspection.

## Limits and final state
Browser access became disabled during the final production/reduced-motion check. No screenshot file was exported; screenshots were viewed in the browser tool during development. Reduced-motion safeguards exist in CSS and GSAP matchMedia, but the final emulated live check was not completed. Browser viewport was last set to 320 × 740 and could not be reset after access was disabled.
The production preview is running locally. Nothing has been deployed or committed.
Contact delivery remains the existing truthful WhatsApp draft fallback unless CONTACT_WEBHOOK_URL is configured; no real enquiry was sent. Existing legacy project claims/content remain outside this visual revision.

## Run
Install Node dependencies with npm ci, then npm run dev. For production: npm run build && npm run start.
