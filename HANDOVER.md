# LODHI INTERIORS — STUDIO HANDOVER PACK & OPERATIONS MANUAL

**Studio Context**: LODHI INTERIORS — Premium Interior Design & Turnkey Execution Studio in Bhopal, Madhya Pradesh.  
**Founder**: Soumya Lodhi (8+ years in architectural practice).  
**Studio Address**: Plot No 02, near Capital Petrol Pump, Bhopal, MP 462023.  
**Canonical Domain**: https://lodhiinteriors.com  

---

## 1. How to Add a New Project Case Study

Every case study on the LODHI INTERIORS website is content-driven through MDX files located in `content/projects/`. Case studies are automatically loaded, validated, indexed at `/work`, and rendered at `/work/[slug]`.

### Step 1: Create the MDX File
Create a new file named `content/projects/<slug>.mdx` where `<slug>` is a lowercase, hyphenated string (e.g., `gulmohar-residence.mdx`).

### Step 2: Frontmatter Schema
Every project case study must specify the following frontmatter fields:

```yaml
---
title: "The Gulmohar Residence"
slug: "gulmohar-residence"
headline: "A light-filled double-height duplex balancing natural Kota stone, fluted teak joinery, and quiet courtyards."
clientBrief: "The clients, a family of senior physicians in Bhopal, sought an uncluttered, acoustically peaceful residence that celebrated natural Central Indian stones without ornate embellishments."
concept: "We conceived the residence around an internal vertical atrium that draws southern daylight through custom teak louvers. Surfaces were restricted to four honest materials: rough-split Kota stone, honed Italian travertine, warm quarter-sawn teak, and matte champagne brass reveals."
locality: "Gulmohar"
city: "Bhopal"
projectType: "luxury-home" # Options: residential | luxury-home | modular-kitchen | office | retail | hospitality | commercial
scope: "Turnkey Design & Execution"
areaSqft: 4200
year: 2024
duration: "20 weeks"
budgetRange: "₹60L — ₹1.2 Cr"
heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=75&w=2000&auto=format&fit=crop"
gallery:
  - src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=75&w=1600&auto=format&fit=crop"
    alt: "Double-height living pavilion featuring natural Kota stone and custom fluted joinery in Gulmohar, Bhopal"
    orientation: "landscape" # Options: landscape | portrait | square
    caption: "The living pavilion looking toward the internal louvered courtyard."
  - src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=75&w=1200&auto=format&fit=crop"
    alt: "Handcrafted solid teak dining table and fluted glass partitions in Gulmohar, Bhopal"
    orientation: "portrait"
    caption: "Dining salon with bespoke teak millwork and acoustic wall treatments."
challengesDecisions:
  - constraint: "The existing building RCC frame had a massive 650mm downstand beam dividing the dining and formal drawing zones."
    resolution: "Rather than dropping the entire ceiling and losing 300mm of vertical volume, we enveloped the beam within a fluted teak coffered portal with concealed indirect linear lighting."
  - constraint: "Bhopal summer heat gain through the west-facing double-height glass facade."
    resolution: "Engineered double-glazed Low-E acoustic glass units coupled with motorized exterior aluminum louvers angled at 45 degrees."
publishedAt: "2024-03-15"
featured: true # Set to true to pin project at the top of /work
---

Detailed narrative paragraphs exploring the spatial journey, lighting commissioning, material procurement from local quarries, and turnkey execution milestones.
```

### Step 3: Image Naming & Optimization Conventions
1. **Source Resolution**: High-resolution photography captured on site (minimum 2400px on long edge).
2. **File Naming Pattern**: `[project-slug]-[room-name]-[orientation].jpg`  
   *Examples*:
   - `gulmohar-living-pavilion-landscape.jpg`
   - `gulmohar-master-suite-portrait.jpg`
   - `gulmohar-kitchen-island-landscape.jpg`
3. **Storage**: Upload to the studio CDN or place in `public/images/projects/[slug]/`.
4. **Dimensions**: Aspect ratios must be `16/10` or `21/9` for landscape, `3/4` for portrait.
5. **Quality**: The site automatically compresses and converts images to AVIF/WebP at 75 quality. Never upload raw uncompressed 20MB camera files.

---

## 2. How to Publish an Insight Article

Editorial articles live in `content/insights/<slug>.mdx`. These serve to demonstrate technical authority on Bhopal architecture and turnkey execution.

### Frontmatter Schema:
```yaml
---
title: "The Architecture of Turnkey Interior Execution in Bhopal"
slug: "turnkey-execution-bhopal"
excerpt: "Why the fragmented contractor model fails high-value homes in Central India, and how single-custody execution safeguards structural integrity and budgets."
publishedAt: "2024-02-10"
updatedAt: "2024-03-01"
author:
  name: "Soumya Lodhi"
  role: "Principal Designer & Founder"
readingTime: "6 min read"
heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=75&w=1800&auto=format&fit=crop"
heroImageAlt: "Turnkey architectural interior execution in Bhopal by Lodhi Interiors"
tags: ["Turnkey Architecture", "Bhopal Construction", "Material Selection"]
---

Write in the studio voice: calm, architectural, educational, and grounded in Central Indian realities (monsoon dampness, stone grading, master joinery).
```

---

## 3. Environment Variables & Where They Live

Environment variables are defined in `.env.local` for local development and in the hosting platform (e.g., Vercel / Cloudflare / VPS) environment settings for production.

| Variable Name | Purpose | Example Value |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Canonical root domain without trailing slash | `https://lodhiinteriors.com` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Studio WhatsApp number (Country code + digits, no spaces) | `918109392314` |
| `NEXT_PUBLIC_PHONE_NUMBER` | Formatted phone number for website display & tel: links | `+91 81093 92314` |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | Google Analytics 4 tracking ID | `G-XXXXXXXXXX` |
| `CRM_WEBHOOK_URL` | Optional webhook URL for automatic lead ingestion | `https://hooks.zapier.com/...` |

> **Strict Rule**: Always import environment variables through `import { env } from "@/lib/env"`. Never call `process.env` directly in component files.

---

## 4. How to Update Studio Contact Information

### To Update Phone or WhatsApp Number:
1. Update `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env.local` and production dashboard.
2. Update `NEXT_PUBLIC_PHONE_NUMBER` in `.env.local` and production dashboard.
3. Redeploy the application. All `wa.me` links, floating WhatsApp buttons, sticky mobile bar, and `tel:` click-to-call actions across all 32 routes update automatically.

### To Update Physical Address or Opening Hours:
1. Open `lib/schema.ts` and edit the `address` block in `buildLocalBusinessSchema()`.
2. Open `components/sections/Footer.tsx` and edit the displayed address and operating hours.

---

## 5. Internal-Linking Rules When Adding Content

1. **Bidirectional Case Study & Service Links**: When adding a residential project, link to `/services/residential-interiors` in the copy. In return, add the project to the service page’s curated list if relevant.
2. **Neighborhood Enclaves**: When referencing a project in Arera Colony, Shahpura, Koh-e-Fiza, or Chuna Bhatti, include an internal link to its respective location dossier (e.g., `/locations/arera-colony`).
3. **Descriptive Anchor Text**: Never use "click here", "learn more", or "read this". Always use descriptive, architectural anchor text (e.g., "explore our [turnkey interior execution process](/process)" or "view the [Aranya Residence case study](/work/aranya-residence)").
4. **Primary CTA**: Conclude substantial case studies and articles with a route into `/contact`.

---

## 6. Studio Content Guardrails — What Must NEVER Be Added

The strategic advantage of LODHI INTERIORS over local Bhopal competitors is authentic architectural trust, precision, and verified work. Adhere strictly to these non-negotiable boundaries:

1. **NO Stock Photography as Real Work**: Never upload stock photos or 3D renders masquerading as completed Lodhi Interiors projects. If a project is in progress, label it as "3D Architectural Render" or wait until post-styling site photography is complete.
2. **NO Fake or Anonymous Reviews**: Every testimonial must be from a real client with verified space typology and locality (e.g., "Dr. V. Sharma, Duplex Villa, Arera Colony"). Never use stock headshots or invented names.
3. **NO Fabricated Awards or Press Logos**: Never display "As Seen On" or badge icons for publications where the studio has not actually been featured.
4. **NO Doorway Locality Pages**: Do not generate thin, automated pages for neighborhoods where the studio has no architectural relevance. Every location page must carry real Bhopal architectural insight and actual project references.
5. **NO Unverified Pricing Guarantees**: Never advertise "cheapest rates" or package pricing. High-end turnkey execution is quoted on an itemized Bill of Quantities with transparent material grades.
