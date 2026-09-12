# LODHI INTERIORS — Image Asset Specification & SEO Standards

## 1. File Naming Convention

All photographic assets stored in `/public/images` must adhere strictly to the following kebab-case semantic pattern:

```
[space-or-feature]-[primary-material]-[locality]-bhopal.[format]
```

### Examples

- `master-bedroom-fluted-teak-arera-colony-bhopal.avif`
- `dining-pavilion-navona-travertine-arera-colony-bhopal.avif`
- `waterfront-living-room-italian-marble-shahpura-bhopal.avif`
- `culinary-island-sintered-stone-bawadiya-kalan-bhopal.avif`
- `executive-boardroom-walnut-panelling-mp-nagar-bhopal.avif`
- `ridge-terrace-lounge-kota-stone-kohefiza-bhopal.avif`

## 2. Image Format & Compression Hierarchy

1. **AVIF** (Primary production format): Highest quality-to-filesize ratio, next-gen browser support.
2. **WebP** (Secondary fallback): Broad compatibility.
3. **JPEG / PNG** (Preserved for legacy Open Graph crawlers like WhatsApp and Facebook scraping bots).

## 3. Alt Text Architectural Rules

- **Rule 1: Space + Materiality**: Always describe what is physically depicted in the frame (e.g. _"Quarter-sawn teak wood paneling with fluted profile in Arera Colony, Bhopal"_).
- **Rule 2: Zero Keyword Stuffing**: Never repeat generic strings like _"best interior designer in bhopal"_ or _"cheap turnkey package"_.
- **Rule 3: Orientation & Context**: State architectural perspective where relevant (e.g. _"Axial view across the dining pavilion toward the central courtyard garden"_).
