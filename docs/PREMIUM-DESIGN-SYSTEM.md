# Lodhi — architectural presence

Research and direction recorded before implementation, 17 October 2026.

## Audit
The previous direction repeated large lightweight serif headings, broad cream spaces and generic poetic copy. Three consecutive full-screen project images were cropped from portrait originals, with dark gradients covering finishes. Low-opacity scroll reveals made both text and photography feel faded. Services, process and enquiry had similar visual weight, making the route to a conversation unnecessarily long.

## Reference review
- https://yodezeen.com/ — inspected live desktop hero and next section. Large uninterrupted architectural imagery, compact navigation, emphatic uppercase typography, project-specific routes. Adopt visual scale and strong image/type contrast; avoid intro gates, custom cursors and copying any assets.
- https://bandaproperty.com/ — inspected live homepage and read project/service positioning. Image-led opening and highly edited language; private-client enquiry path. Adopt restraint in copy and full-colour image presentation, not the muted colour grading or a hidden enquiry route.
- https://www.essajeesatelier.com/ — inspected live homepage and read its portfolio/process/contact structure. Projects lead into studio, four-step delivery process and contact. Adopt evidence-before-enquiry sequencing. Their claims, awards, testimonials and commercial terms are not Lodhi's and must not be reused.

These are observed design patterns, not evidence of measured conversion uplift.

## Design system
- Obsidian wine #291B21: identity and enquiry backgrounds.
- Ink #201C1A: high-contrast reading text.
- Porcelain #F7F3ED: portfolio and document canvas.
- Copper #B68561 and pale champagne #E6C9A7: accents, rules, buttons.
- Sans display: Plus Jakarta Sans, 600, tight tracking, 64–112px desktop; 38–56px mobile. Used for short, explicit section headlines.
- Serif accent: Cormorant Garamond italic, 400. Limited expressive words and founder quote, not every headline.
- Body: 15–17px with generous line-height. Labels 10–11px uppercase, visible contrast.
- Layout: 12-column feeling, asymmetrical project pair, horizontal feature, photo-led service cards, split founder composition. 24px mobile gutters, 5vw desktop, maximum width 1440px.
- Image policy: existing user portfolio only. No global opacity, desaturation, blend mode or grey overlay. Project captions outside photographs. Portraits retain portrait framing. No synthetic images represented as executed work.
- Shape: sharp rectangular image frames, thin rules, circular directional CTA used sparingly. No generic rounded dashboard cards.

## Funnel
Original video hero unchanged → short positioning statement and immediate project preview → selected projects with labels and case-study links → service selection → visible delivery stages → 3D experience + original two PDF documents → founder accountability → practical FAQs → project-type selection and enquiry.
Persistent navigation provides direct contact for ready visitors. Mid-page enquiry after work prevents requiring the whole scroll. Form carries selected project type; validation and WhatsApp fallback remain truthful. No invented urgency, ratings, project counts or guarantees.

## Motion
Use transform-based headline entrances, cropped image reveals, slow depth within image frames, staggered card entrances and interactive process states. Never animate image opacity. Desktop motion scales down on mobile. Respect reduced motion and keep links, text and images usable without animation. Original film pause control retained.

## Acceptance
Visually inspect at desktop 1440px and mobile 390px; inspect 320px overflow. Verify project routes, service links, process accordion, PDF/tour destinations, contact prefill, navigation, keyboard focus, video controls and reduced-motion behavior. Production build and existing route/resource checks. Save actual browser screenshots.
