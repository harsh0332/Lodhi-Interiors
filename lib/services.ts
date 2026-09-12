import type { ProjectType } from '@/lib/content';

export interface ServiceMaterial {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface RelatedServiceLink {
  slug: string;
  name: string;
  description: string;
}

export interface ServiceData {
  slug: string;
  name: string;
  shortDescription: string;
  categoryTag: string;
  heroH1: string;
  heroPromise: string;
  heroImage: string;
  heroImageAlt: string;
  scopeSummary: string;
  scopeItems: string[];
  approachTitle: string;
  approachParagraphs: string[];
  projectType: ProjectType;
  materialsTitle: string;
  materialsProse: string;
  materialsList: ServiceMaterial[];
  faqs: ServiceFAQ[];
  relatedServices: RelatedServiceLink[];
  metaTitle: string;
  metaDescription: string;
}

export const SERVICES_DATA: Record<string, ServiceData> = {
  'residential-interiors': {
    slug: 'residential-interiors',
    name: 'Residential Interiors',
    shortDescription:
      'Complete interior design and turnkey execution for private apartments and standalone residences across Bhopal.',
    categoryTag: 'Residential',
    heroH1: 'Residential Interiors in Bhopal',
    heroPromise:
      'Homes conceived with spatial clarity, honest natural materials, and turnkey site custody.',
    heroImage:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1800&auto=format&fit=crop',
    heroImageAlt:
      'Open-plan modern living and dining room with fluted timber partitions in an Arera Colony residence, Bhopal',
    scopeSummary:
      'We take complete responsibility for your residential space from architectural planning through to civil modifications and custom joinery installation.',
    scopeItems: [
      'Comprehensive spatial layout and circulation planning',
      'Civil modifications, wall relocations, and structural repairs',
      'Electrical layout redesign, lighting circuitry, and home automation conduits',
      'Bespoke living room entertainment units and timber wall paneling',
      'Full-height wardrobe systems with integrated LED profiles and internal joinery',
      'Bathroom vanity fabrication, sanitary re-piping, and tile installation',
      'Drop ceiling design with concealed cove lighting and ducted AC integration',
      'Loose furniture procurement, custom upholstery, and bespoke soft furnishings',
    ],
    approachTitle: 'Designing for Family Rhythm and Central Indian Climate',
    approachParagraphs: [
      'In Bhopal residences, spaces must adapt to intense seasonal shifts—from dry summer heat exceeding 42°C to extended monsoon dampness. Our residential approach begins by analyzing solar orientation, cross-ventilation corridors, and family circulation before drawing a single decorative element. We avoid standard commercial catalog fixtures, opting instead for tailored layouts that accommodate multi-generational living without visual clutter.',
      'Unlike conventional local interior firms that sub-contract civil works to third-party labourers, Lodhi Interiors executes all construction in-house. Our site supervisors ensure that concealed conduits, waterproofing barriers, and wall alignments are verified with laser levels before finishes arrive on site. This single-custody approach guarantees that bespoke joinery fits flush against walls with zero filler gaps or structural settling cracks.',
      'Every residential commission balances durability with quiet warmth. We curate tactile surfaces that patinate gracefully over decades—fluted natural oak, honed Indian travertine, matte lime wash, and brushed metal trims. The outcome is a calm sanctuary calibrated precisely to your daily household rituals.',
    ],
    projectType: 'residential',
    materialsTitle: 'Selected Residential Palette',
    materialsProse:
      'We select materials resilient to Bhopal seasonal thermal expansion and humidity cycles, prioritizing local and natural compositions.',
    materialsList: [
      {
        title: 'Honed Travertine & Kota Stone',
        description:
          'Vapor-permeable natural stone slabs calibrated for thermal comfort underfoot during Central Indian summers.',
        image:
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
        imageAlt: 'Honed travertine floor slabs with flush architectural grouting',
      },
      {
        title: 'Fluted Teak & Smoked Oak',
        description:
          'Kiln-dried natural hardwoods finished with matte organic hardwax oils to prevent post-monsoon warping.',
        image:
          'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop',
        imageAlt: 'Close-up of bespoke fluted teak joinery detailing',
      },
      {
        title: 'Cast Lime & Mineral Plaster',
        description:
          'Breathable, non-toxic wall coatings that regulate ambient humidity and reflect soft architectural daylight.',
        image:
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop',
        imageAlt: 'Textured matte lime plaster wall finish',
      },
    ],
    faqs: [
      {
        question:
          'What is the realistic cost of residential interior design and execution in Bhopal?',
        answer:
          'In Bhopal, a complete turnkey residential execution typically ranges from ₹1,800 to ₹3,200 per sq.ft. for premium residences, while high-spec bespoke architectural projects can exceed ₹4,000 per sq.ft. The primary drivers of cost are civil structural alterations, imported stone vs. engineered tiles, the density of bespoke in-house joinery, and HVAC ducted configurations. We provide a line-item bill of quantities before site commencement, eliminating mid-project price escalations.',
      },
      {
        question: 'How long does a full home turnkey execution take in Bhopal?',
        answer:
          'A typical 3BHK or 4BHK home spanning 2,200 to 3,500 sq.ft. requires approximately 4.5 to 6.5 months from initial design sign-off to turnkey handover. This schedule includes 4 weeks of technical architectural drafting and 3D detailing, followed by 16 to 22 weeks of phased on-site civil, plumbing, joinery, and styling execution.',
      },
      {
        question:
          'Do you work in apartments with strict society guidelines like in Arera Colony or Bawadiya Kalan?',
        answer:
          'Yes. We regularly execute projects in high-end Bhopal apartment complexes. Our team handles society permissions, debris disposal via designated service shafts, noisy work scheduling within permitted hours (typically 10:00 AM to 5:00 PM), and lift protection.',
      },
      {
        question: 'Can you retain existing flooring or structural elements?',
        answer:
          'Absolutely. If your property has sound Kota, marble, or existing structural concrete, we assess its structural condition and can integrate it into the revised architectural narrative, focusing your capital on high-touch joinery and lighting.',
      },
    ],
    relatedServices: [
      {
        slug: 'turnkey-interiors',
        name: 'Turnkey Interiors',
        description: 'Single-source site management from bare shell to final handover.',
      },
      {
        slug: 'modular-kitchens',
        name: 'Modular Kitchens',
        description: 'Architectural culinary spaces with European hardware and BWP cores.',
      },
      {
        slug: 'luxury-home-interiors',
        name: 'Luxury Home Interiors',
        description: 'Large-scale bespoke residential estates and villas.',
      },
    ],
    metaTitle: 'Residential Interiors in Bhopal | Lodhi Interiors',
    metaDescription:
      'Complete residential interior design and turnkey execution in Bhopal. Custom joinery, natural stone, and single-source site accountability.',
  },

  'luxury-home-interiors': {
    slug: 'luxury-home-interiors',
    name: 'Luxury Home Interiors',
    shortDescription:
      'Bespoke architectural interiors for standalone villas, bungalows, and sprawling estates in Bhopal.',
    categoryTag: 'Luxury Residential',
    heroH1: 'Luxury Home Interiors in Bhopal',
    heroPromise:
      'Architectural estates tailored with bespoke masonry, imported stone, and hand-finished joinery.',
    heroImage:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1800&auto=format&fit=crop',
    heroImageAlt:
      'Grand double-height villa living room overlooking lakefront gardens in Shahpura, Bhopal',
    scopeSummary:
      'Comprehensive architectural interior execution for sprawling residential homes exceeding 4,000 sq.ft., encompassing interior civil interventions, double-height volumes, and custom artisan fabrication.',
    scopeItems: [
      'Double-height spatial volume articulation and bespoke architectural screening',
      'Bookmatched Italian marble and imported travertine dry-lay inspection and installation',
      'Structural steel framing for cantilevered staircases and mezzanine reading lofts',
      'Custom architectural metalwork in brushed bronze and patinated brass',
      'Acoustic ceiling baffles and high-fidelity multi-zone concealed sound engineering',
      'Master dressing suites with climate-controlled glass vitrines and custom leather hardware',
      'Integrated home wellness zones, steam enclosures, and bespoke stone soaker basins',
      'Exterior-interior terrace flow with weathered teak decking and microcement transitions',
    ],
    approachTitle: 'Architectural Scale Without Superficial Ostentation',
    approachParagraphs: [
      'Luxury in Bhopal is too frequently confused with gold leaf, synthetic paneling, and imported catalogs. At Lodhi Interiors, we approach luxury through the lens of architectural restraint, proportion, and structural permanence. When dealing with large volumes—such as 14-foot ceilings or double-height voids in Shahpura and Arera Colony villas—the primary challenge is creating acoustic intimacy and purposeful light balance.',
      'Our studio manages the entire procurement and dry-lay inspection of raw materials. When sourcing bookmatched marble or silver travertine, Soumya Lodhi personally inspects slabs at the stockyard to verify vein continuity before cutting schedules are issued. Every joinery junction is detailed down to 2-millimeter shadow reveals rather than relying on standard commercial beading.',
      'Because luxury estates involve intricate multi-contractor complexities, having our single turnkey team oversee the structural civil teams, VRV air conditioning engineers, automation consultants, and stone artisans eliminates the finger-pointing that typically plagues high-value builds.',
    ],
    projectType: 'luxury-home',
    materialsTitle: 'Monumental Material Curation',
    materialsProse:
      'We work with heavy natural stones, solid hardwoods, and raw metals hand-patinated to develop warmth over decades.',
    materialsList: [
      {
        title: 'Silver Travertine & Bookmatched Statuario',
        description:
          'Precision-cut slabs dry-laid on site to ensure seamless grain continuation across architectural planes.',
        image:
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop',
        imageAlt: 'Bookmatched natural stone installation detail',
      },
      {
        title: 'Gunmetal & Patinated Brass',
        description:
          'Heavy gauge brass and architectural steel hand-rubbed with liver of sulfur for subtle, matte depth.',
        image:
          'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop',
        imageAlt: 'Bespoke patinated brass detail on structural partition',
      },
      {
        title: 'Full-Grain Saddle Leather',
        description:
          'Tuscan vegetable-tanned leather wrapped over internal wardrobe pulls and custom headboard paneling.',
        image:
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
        imageAlt: 'Saddle leather and walnut joinery junction',
      },
    ],
    faqs: [
      {
        question: 'What investment is typically required for a luxury villa interior in Bhopal?',
        answer:
          'High-end luxury residences in Bhopal typically command an execution budget of ₹3,500 to ₹6,500+ per sq.ft., depending upon the selection of imported stone, specialized VRV/ducted HVAC systems, and bespoke architectural metalwork. We provide complete transparent cost accounting before contracts are initiated.',
      },
      {
        question: 'Can you coordinate with our existing building architect or structural engineer?',
        answer:
          'Yes. We frequently collaborate with core architects and structural engineers across Central India, stepping in at the shell phase to coordinate internal MEP drops, beam concealment, and custom floor slab openings.',
      },
      {
        question: 'How do you handle acoustic reverberation in high-ceiling spaces?',
        answer:
          'We engineer concealed acoustic solutions, including micro-perforated acoustic timber paneling, strategic fabric baffles, heavy woven drapery pockets, and dense fibrous substrate insulation within ceiling coves to keep reverberation time (RT60) under 0.6 seconds.',
      },
      {
        question: 'Is Soumya Lodhi directly involved on site during luxury builds?',
        answer:
          'Yes. We restrict our simultaneous luxury commissions to a selective roster specifically so Soumya Lodhi leads every critical design review, stone selection, and site milestone inspection in person.',
      },
    ],
    relatedServices: [
      {
        slug: 'residential-interiors',
        name: 'Residential Interiors',
        description: 'Refined interior design for private homes and family apartments.',
      },
      {
        slug: 'turnkey-interiors',
        name: 'Turnkey Interiors',
        description: 'Single-source site management from bare shell to final handover.',
      },
      {
        slug: 'modular-kitchens',
        name: 'Modular Kitchens',
        description: 'Architectural culinary spaces with European hardware and BWP cores.',
      },
    ],
    metaTitle: 'Luxury Home Interiors in Bhopal | Lodhi Interiors',
    metaDescription:
      'Bespoke luxury home and villa interior design in Bhopal. Architectural travertine, bookmatched marble, and precision turnkey execution.',
  },

  'turnkey-interiors': {
    slug: 'turnkey-interiors',
    name: 'Turnkey Interiors',
    shortDescription:
      'Total single-point delivery encompassing design, civil works, joinery, and site management in Bhopal.',
    categoryTag: 'Turnkey Execution',
    heroH1: 'Turnkey Interiors in Bhopal',
    heroPromise: 'One accountable contract from architectural concept to final keys in hand.',
    heroImage:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1800&auto=format&fit=crop',
    heroImageAlt: 'Seamless turnkey interior execution of a living and dining salon in Bhopal',
    scopeSummary:
      'We eliminate the traditional friction between interior designers and independent contractors by providing a complete, vertically integrated execution service under one contract.',
    scopeItems: [
      'Comprehensive architectural drafting, MEP schematics, and 3D visualization',
      'On-site demolition, civil alterations, lintel casting, and wall masonry',
      'Certified electrical rewiring, breaker panel balancing, and smart lighting circuits',
      'Plumbing overhaul with pressure testing, manifold systems, and leak-proof waterproofing',
      'Precision false ceiling systems with acoustic backing and ducted AC integration',
      'Factory-finished modular cabinetry and on-site master carpentry joinery',
      'Natural stone cutting, diamond-pad polishing, and dry-area microcement application',
      'Deep cleaning, snag list rectification, and formal turnkey key handover',
    ],
    approachTitle: 'The Superiority of Single-Custody Accountability',
    approachParagraphs: [
      'The traditional Indian model of building an interior—hiring a designer for drawings, then bidding the work to independent civil, carpenter, and electrical contractors—is systematically broken. When a joiner cuts a panel out of plumb, they blame the mason; when tiles crack, the mason blames the plumber. The client is left arbitrating technical arguments on an unlivable construction site while budgets balloon.',
      'Turnkey execution with Lodhi Interiors removes this entire failure mode. Because our studio drafts the blueprint and employs the full on-site team, there is zero ambiguity regarding accountability. If a conduit is misaligned or a joint fails our quality threshold, our site supervisor rectifies it immediately at our cost, not the client’s.',
      'We run sites with daily milestone logs, digital material receipts, and weekly scheduled video walk-throughs for out-of-town or busy clients. We believe turnkey should not mean an opaque black box; it means complete transparency supported by uncompromising craftsmanship.',
    ],
    projectType: 'residential',
    materialsTitle: 'Substrate & Infrastructure Integrity',
    materialsProse:
      'True turnkey quality begins where the client cannot see: behind walls, under floor screeds, and inside joinery carcasses.',
    materialsList: [
      {
        title: 'Calibrated BWP Marine Plywood (IS 710)',
        description:
          'Zero-gap boiling waterproof core plywood treated against termites for all structural internal carcasses.',
        image:
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
        imageAlt: 'Calibrated marine plywood carcass joinery',
      },
      {
        title: 'Multi-Coat Polymer Waterproofing',
        description:
          'Three-layer elastomeric waterproofing membranes applied with geotextile corner reinforcement.',
        image:
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop',
        imageAlt: 'Precision waterproofing substrate application',
      },
      {
        title: 'Concealed CPVC & Manifold Plumbing',
        description:
          'Individual shut-off valves for every fixture and pressure-tested plumbing lines to 10 bar.',
        image:
          'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop',
        imageAlt: 'Concealed manifold plumbing infrastructure',
      },
    ],
    faqs: [
      {
        question: 'What is included in a turnkey interior contract in Bhopal?',
        answer:
          'Our turnkey contract covers every stage of execution: design blueprints, 3D renders, civil demolition, masonry, electrical cabling, plumbing, false ceilings, flooring, bespoke cabinetry, paint finishes, lighting fixtures, hardware, and post-construction deep cleaning. You receive a fully commissioned, turnkey space ready for immediate occupancy.',
      },
      {
        question: 'How are turnkey payment milestones structured?',
        answer:
          'Payments are strictly tied to verified physical milestones: initial design deposit, structural civil & MEP completion, carcass joinery completion, finishes/surfaces installation, and a final retention payment upon snag-free handover.',
      },
      {
        question: 'What is the cost range for turnkey interiors in Bhopal?',
        answer:
          'Turnkey projects in Bhopal typically range from ₹1,800 to ₹3,500 per sq.ft. for standard premium builds, and ₹3,500 to ₹6,000+ per sq.ft. for luxury residences with high-spec imported materials. Every proposal includes an itemized bill of quantities with fixed rates.',
      },
      {
        question: 'How do you prevent project delays?',
        answer:
          'We operate on a critical-path Gantt schedule where procurement of long-lead items (marble, tiles, hardware, lighting) occurs concurrently with early civil demolition, preventing idle time on site.',
      },
    ],
    relatedServices: [
      {
        slug: 'residential-interiors',
        name: 'Residential Interiors',
        description: 'Refined interior design for private homes and family apartments.',
      },
      {
        slug: 'modular-kitchens',
        name: 'Modular Kitchens',
        description: 'Architectural culinary spaces with European hardware and BWP cores.',
      },
      {
        slug: 'office-interiors',
        name: 'Office Interiors',
        description: 'Commercial corporate spaces built for operational focus.',
      },
    ],
    metaTitle: 'Turnkey Interiors in Bhopal | Lodhi Interiors',
    metaDescription:
      'Single-source turnkey interior design and execution in Bhopal. Full civil, electrical, joinery, and site management under one contract.',
  },

  'modular-kitchens': {
    slug: 'modular-kitchens',
    name: 'Modular Kitchens',
    shortDescription:
      'Precision architectural kitchens with BWP marine cores, Blum hardware, and quartz stone surfaces.',
    categoryTag: 'Joinery & Kitchens',
    heroH1: 'Modular Kitchens in Bhopal',
    heroPromise:
      'Architectural culinary systems engineered for heavy Indian cooking, moisture, and daily utility.',
    heroImage:
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1800&auto=format&fit=crop',
    heroImageAlt:
      'Minimal architectural modular kitchen with fluted oak island and dark quartz counters in Bhopal',
    scopeSummary:
      'We design and install heavy-duty, architecturally resolved modular kitchens engineered specifically for the demands of Indian cooking, wet cleaning, and long-term hardware durability.',
    scopeItems: [
      'Ergonomic culinary zoning: Preparation, Cooking, Wet Cleaning, and Pantry Storage',
      '100% Boiling Waterproof (IS 710) marine plywood carcasses with calibrated thicknesses',
      'Austrian Blum and German Hettich soft-close drawer runners and lift systems',
      'Heat-resistant, non-porous engineered quartz and natural granite countertops',
      'Concealed high-suction ventilation integration (1200+ m3/hr) with baffled duct paths',
      'Moisture-resistant PU lacquer, anti-fingerprint acrylic, and natural veneer shutter finishes',
      'Dedicated concealed spice pull-outs, corner tandem carousels, and bottle organizers',
      'Under-cabinet 3000K shadow-free task lighting channels',
    ],
    approachTitle: 'Engineering for Heat, Turmeric, and High-Impact Use',
    approachParagraphs: [
      'A kitchen in Bhopal cannot be treated like a delicate European display. It must withstand intense mustard oil splatters, heavy brass kadhais, and daily wet floor mopping without the plinth decaying. Many modular kitchens sold by showroom brands fail within three years because their carcasses are constructed from compressed particle board (MDF/HDF) that swells the moment water breaches a sink seal.',
      'Lodhi Interiors constructs kitchen carcasses exclusively from calibrated, chemical-treated IS 710 Boiling Waterproof (BWP) marine plywood. Every exposed edge is bonded with 2mm PVC edging using high-temperature polyurethane adhesive to form an impenetrable moisture barrier. Our sink units feature integrated aluminum drip trays to prevent under-sink moisture damage.',
      'We use exclusively genuine Austrian Blum and German Hettich hardware with lifetime functional warranties. Drawer channels are calculated to carry 40kg to 70kg of dynamic load, ensuring smooth glide action even when drawers are packed with heavy Indian cookware.',
    ],
    projectType: 'modular-kitchen',
    materialsTitle: 'Kitchen Core & Surface Engineering',
    materialsProse:
      'We combine industrial-grade core substrates with non-porous, stain-resistant architectural worktops.',
    materialsList: [
      {
        title: 'Calibrated IS 710 Marine Plywood',
        description:
          'Hardwood core plywood with zero core voids, chemically treated against termites and boiling water immersion.',
        image:
          'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop',
        imageAlt: 'Calibrated marine plywood kitchen carcass construction',
      },
      {
        title: 'Engineered Quartz & Black Pearl Granite',
        description:
          'Resistant to turmeric staining, citrus acids, and high thermal shock from hot cookware.',
        image:
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
        imageAlt: 'Quartz kitchen countertop with undermount sink cutout',
      },
      {
        title: 'Anti-Fingerprint Matte Acrylic & PU Lacquer',
        description:
          'Scratch-resistant frontages that repel grease and clean effortlessly with warm microfibre cloth.',
        image:
          'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop',
        imageAlt: 'Matte acrylic kitchen cabinet frontages',
      },
    ],
    faqs: [
      {
        question: 'What is the price range for a modular kitchen in Bhopal?',
        answer:
          'A custom modular kitchen by Lodhi Interiors typically ranges from ₹2.5 Lakhs to ₹7 Lakhs+ for standard apartments, and ₹6 Lakhs to ₹14 Lakhs+ for large luxury residences with island counters and built-in appliances. Pricing is driven by linear footage, carcass substrate (we use only BWP marine ply), shutter finish (acrylic vs PU vs veneer), and hardware accessories.',
      },
      {
        question: 'Why do you avoid MDF or particle board in kitchen construction?',
        answer:
          'In Bhopal’s climate with monsoon humidity and traditional wet cleaning, MDF or particle board absorbs moisture at screw anchor points, causing hinge drop and swollen plinths within 24 to 36 months. Calibrated BWP plywood provides permanent screw-holding capacity.',
      },
      {
        question: 'Do you handle the gas pipeline, electrical, and chimney ducting?',
        answer:
          'Yes. Our turnkey service includes core cutting for chimney exhaust, concealed gas piping from utility balconies, and dedicated high-amperage electrical lines for ovens, dishwashers, and induction cooktops.',
      },
      {
        question: 'How long does a modular kitchen installation take?',
        answer:
          'From architectural measurement and 3D sign-off, factory fabrication requires 3 to 4 weeks. On-site installation, countertop installation, and plumbing connections are completed in 7 to 10 working days.',
      },
    ],
    relatedServices: [
      {
        slug: 'residential-interiors',
        name: 'Residential Interiors',
        description: 'Refined interior design for private homes and family apartments.',
      },
      {
        slug: 'turnkey-interiors',
        name: 'Turnkey Interiors',
        description: 'Single-source site management from bare shell to final handover.',
      },
      {
        slug: 'luxury-home-interiors',
        name: 'Luxury Home Interiors',
        description: 'Large-scale bespoke residential estates and villas.',
      },
    ],
    metaTitle: 'Modular Kitchens in Bhopal | Lodhi Interiors',
    metaDescription:
      'Bespoke modular kitchens in Bhopal. 100% BWP marine ply, Blum hardware, quartz stone, and heavy Indian culinary engineering.',
  },

  'office-interiors': {
    slug: 'office-interiors',
    name: 'Office Interiors',
    shortDescription:
      'Corporate headquarters, advisory suites, and modern workspaces built for operational clarity in Bhopal.',
    categoryTag: 'Commercial Workplace',
    heroH1: 'Office Interiors in Bhopal',
    heroPromise:
      'Workplaces engineered for acoustic focus, ergonomic rigor, and executive brand stature.',
    heroImage:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1800&auto=format&fit=crop',
    heroImageAlt:
      'Executive boardroom with acoustic timber paneling and linear architectural lighting in MP Nagar, Bhopal',
    scopeSummary:
      'We deliver commercial office and corporate interiors from bare shell or live-space refurbishment, handling all civil works, HVAC zoning, acoustic partitions, and structured cabling.',
    scopeItems: [
      'Space programming, occupancy density modeling, and agile layout zoning',
      'Acoustic double-glazed glass partitions with concealed aluminum tracks',
      'Structured Cat6/fiber network cabling, server rack setup, and floor raceway distribution',
      'VRV/ducted air conditioning zoning with individual conference room dampers',
      'Acoustic baffle ceilings with sound absorption ratings exceeding NRC 0.75',
      'Custom executive desks, conference tables with integrated AV connectivity, and task joinery',
      'Reception statement architecture, brand signage wall, and visitor lounge curation',
      'Emergency egress compliance, fire sprinkler realignment, and access control integration',
    ],
    approachTitle: 'Acoustics, Cable Infrastructure, and Rapid Phased Delivery',
    approachParagraphs: [
      'In Bhopal’s growing business hubs like MP Nagar, Arera Hills, and Hoshangabad Road, corporate offices often suffer from either cold, soulless generic cubicles or visually distracting decorative schemes that ruin acoustic focus. Our office design philosophy is rooted in acoustic discipline, intuitive cable management, and ergonomic lighting.',
      'We treat noise isolation with scientific rigor. Boardroom walls are constructed with double-stud gypsum assemblies with 50mm acoustic rockwool infill, achieving Sound Transmission Class (STC) ratings above 50. Conversations in the boardroom remain strictly confidential without sound bleeding into open collaborative spaces.',
      'We understand that commercial lease timelines create severe holding cost pressures. Our turnkey project management operates with military precision—scheduling noisy civil demolition after business hours, pre-fabricating modular workstations off-site, and completing electrical commissioning over phased weekends to prevent tenant disruption.',
    ],
    projectType: 'office',
    materialsTitle: 'Commercial Durability Standards',
    materialsProse:
      'High-traffic commercial materials certified for acoustic absorption, fire retardation, and continuous daily wear.',
    materialsList: [
      {
        title: 'Acoustic Fluted Oak & Fabric Paneling',
        description:
          'Micro-perforated natural timber panels with acoustic black fleece backing for targeted reverberation absorption.',
        image:
          'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
        imageAlt: 'Acoustic fluted oak boardroom wall paneling',
      },
      {
        title: 'Blackened Architectural Steel & Frameless Glass',
        description:
          'Matte powder-coated structural steel framing with 12mm acoustic laminated glass partitions.',
        image:
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
        imageAlt: 'Glass office partition with blackened steel hardware',
      },
      {
        title: 'Modular Commercial Carpet Tiles',
        description:
          'Heavy commercial nylon carpet tiles with cushion backing for footfall sound dampening and easy maintenance.',
        image:
          'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop',
        imageAlt: 'High-density commercial modular carpet tiles',
      },
    ],
    faqs: [
      {
        question: 'What is the cost per square foot for corporate office interiors in Bhopal?',
        answer:
          'Commercial office execution in Bhopal typically ranges from ₹1,500 to ₹2,800 per sq.ft. for standard IT and back-office spaces, and ₹2,800 to ₹4,500+ per sq.ft. for executive corporate headquarters with high acoustic specs and customized boardroom joinery.',
      },
      {
        question: 'Can you work while the office is partially operational?',
        answer:
          'Yes. We regularly execute phased commercial refurbishments. We isolate active working zones with dust-containment barriers and execute noisy core cutting, welding, and civil work during night shifts and weekends.',
      },
      {
        question: 'Do you handle local municipal and fire safety compliance in Bhopal?',
        answer:
          'Yes. We coordinate internal layout designs with Bhopal Municipal Corporation (BMC) fire egress norms, ensuring sprinkler drops, smoke detectors, and emergency lighting meet mandatory building codes.',
      },
      {
        question: 'What is the average timeline for a 5,000 sq.ft. commercial office?',
        answer:
          'A 5,000 sq.ft. office typically takes 8 to 12 weeks from finalized layout approval to full employee occupancy, supported by off-site modular pre-fabrication.',
      },
    ],
    relatedServices: [
      {
        slug: 'commercial-interiors',
        name: 'Commercial Interiors',
        description: 'Comprehensive commercial architectural interiors and multi-use spaces.',
      },
      {
        slug: 'retail-showroom-interiors',
        name: 'Retail & Showrooms',
        description: 'Brand-led commercial environments built for customer conversion.',
      },
      {
        slug: 'turnkey-interiors',
        name: 'Turnkey Interiors',
        description: 'Single-source site management from bare shell to final handover.',
      },
    ],
    metaTitle: 'Office Interiors in Bhopal | Lodhi Interiors',
    metaDescription:
      'Commercial office and corporate interior design in Bhopal. Acoustic isolation, structured cabling, and turnkey workplace execution.',
  },

  'retail-showroom-interiors': {
    slug: 'retail-showroom-interiors',
    name: 'Retail & Showroom Interiors',
    shortDescription:
      'Brand-defining retail environments, luxury showrooms, and commercial retail flagships in Bhopal.',
    categoryTag: 'Retail & Brand Spaces',
    heroH1: 'Retail Showrooms in Bhopal',
    heroPromise:
      'Brand environments engineered for customer journey, product focal clarity, and sales velocity.',
    heroImage:
      'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1800&auto=format&fit=crop',
    heroImageAlt:
      'Minimal luxury boutique showroom interior with focal pedestal displays and warm architectural lighting in Bhopal',
    scopeSummary:
      'We design and construct high-converting retail stores, jewelry boutiques, and flagship showrooms in Bhopal, balancing brand storytelling with commercial durability.',
    scopeItems: [
      'Customer journey pathing, sightline hierarchy, and visual merchandising architecture',
      'Bespoke retail vitrines, display islands, and concealed secure jewelry counters',
      'High Color Rendering Index (CRI > 95) architectural retail track lighting',
      'Heavy-traffic flooring systems (abrasion resistance PEI 5 and honed natural stone)',
      'Secure cash-wrap counters with integrated POS, cable concealment, and safe anchoring',
      'Storefront facade design, structural glass entries, and illuminated architectural signage',
      'Inventory backrooms, staff utility zones, and secure merchandise storage',
      'Integrated security camera conduit maps, EAS anti-theft sensors, and access control',
    ],
    approachTitle: 'Sightlines, Lighting CRI, and High Footfall Resistance',
    approachParagraphs: [
      'Retail design in Bhopal’s prime shopping corridors like New Market, Malviya Nagar, and 10 No. Market must achieve one fundamental commercial objective: guide the customer through an intuitive spatial hierarchy that showcases merchandise with absolute clarity. Over-designed retail with gimmicky decorative elements distracts from products and hurts sales.',
      'We engineer retail lighting as a primary sales instrument. Standard commercial lighting distorts colors; we specify architectural LED luminaires with a minimum CRI of 95 and tailored color temperatures (3000K for warm jewelry and fashion; 4000K for technical goods). Beam angles are calculated to create theatrical drama on hero pedestals while maintaining comfortable ambient illumination.',
      'Retail surfaces endure unrelenting abuse from thousands of shoe soles, shopping bags, and display reconfigurations. We select abrasion-resistant materials like large-format vitrified slabs, cast terrazzo, and PVD-coated stainless steel that retain their pristine luster year after year with minimal maintenance.',
    ],
    projectType: 'retail',
    materialsTitle: 'High-Performance Retail Materials',
    materialsProse:
      'Surfaces engineered to endure relentless commercial footfall without showing wear or losing finish integrity.',
    materialsList: [
      {
        title: 'PVD-Coated Titanium Stainless Steel',
        description:
          'Ultra-durable, scratch-resistant brass and champagne metal finishes for garment racks and display cases.',
        image:
          'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=800&auto=format&fit=crop',
        imageAlt: 'PVD coated brass retail display hardware',
      },
      {
        title: 'Ultra-Clear Optiwhite Glass Vitrines',
        description:
          'Low-iron security glass with zero greenish tint for accurate, crystal-clear product visual presentation.',
        image:
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
        imageAlt: 'Low-iron glass retail jewelry display showcase',
      },
      {
        title: 'Honed Cast Terrazzo & Heavy Granite',
        description:
          'Dense, non-porous floor slabs resistant to heavy foot traffic, cart wheels, and daily mechanical cleaning.',
        image:
          'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop',
        imageAlt: 'Honed terrazzo retail flooring finish',
      },
    ],
    faqs: [
      {
        question: 'What is the cost of setting up a retail showroom in Bhopal?',
        answer:
          'Retail showroom fit-outs in Bhopal typically range from ₹1,800 to ₹3,500 per sq.ft. for standard apparel and lifestyle stores, and ₹3,500 to ₹7,000+ per sq.ft. for luxury jewelry boutiques and flagship showrooms requiring specialized security glass, high-CRI lighting, and PVD metal finishes.',
      },
      {
        question: 'How fast can you complete a retail fit-out to minimize lost rent?',
        answer:
          'Retail is all about speed to market. We can execute a 1,500 to 3,000 sq.ft. retail fit-out in 30 to 45 calendar days by pre-fabricating display counters off-site while on-site flooring and ceiling works run on 16-hour daily shifts.',
      },
      {
        question: 'Do you design retail storefront facades as well as interiors?',
        answer:
          'Yes. We handle the complete street-facing envelope: structural glass glazing, ACP or stone cladding, weather-sealed entrances, and local municipality-compliant architectural facade signage.',
      },
      {
        question: 'How do you ensure lighting shows true product colors?',
        answer:
          'We calculate photometric lux levels and deploy high-CRI (>95) architectural luminaires with tailored beam spreads, ensuring true fabric dyes, diamond sparkle, and gemstone warmth without color cast.',
      },
    ],
    relatedServices: [
      {
        slug: 'commercial-interiors',
        name: 'Commercial Interiors',
        description: 'Comprehensive commercial architectural interiors and multi-use spaces.',
      },
      {
        slug: 'hospitality-restaurant-interiors',
        name: 'Hospitality & Restaurants',
        description: 'Experiential hospitality environments with immersive atmosphere.',
      },
      {
        slug: 'turnkey-interiors',
        name: 'Turnkey Interiors',
        description: 'Single-source site management from bare shell to final handover.',
      },
    ],
    metaTitle: 'Retail Showrooms in Bhopal | Lodhi Interiors',
    metaDescription:
      'Luxury retail showroom and store interior design in Bhopal. Customer sightlines, high-CRI lighting, and turnkey commercial execution.',
  },

  'hospitality-restaurant-interiors': {
    slug: 'hospitality-restaurant-interiors',
    name: 'Hospitality & Restaurant Interiors',
    shortDescription:
      'Atmospheric dining spaces, boutique cafes, bars, and luxury hotel suites crafted in Bhopal.',
    categoryTag: 'Hospitality & Dining',
    heroH1: 'Hospitality Interiors in Bhopal',
    heroPromise:
      'Atmospheric culinary spaces balancing guest intimacy, acoustic comfort, and kitchen MEP integration.',
    heroImage:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1800&auto=format&fit=crop',
    heroImageAlt:
      'Warm atmospheric dining room with curved booths, fluted timber, and intimate architectural lighting in Bhopal',
    scopeSummary:
      'We design and execute experiential dining spaces, cafes, and boutique hospitality interiors in Bhopal, coordinating front-of-house atmosphere with back-of-house kitchen operations.',
    scopeItems: [
      'Table cover yield optimization, circulation aisle flow, and service station ergonomics',
      'Multi-tiered dimmable architectural lighting design (ambient, accent, table intimacy)',
      'Commercial kitchen layout coordination: exhaust hoods, fresh air ducts, and grease traps',
      'Custom acoustic ceiling baffles and upholstered booth sound absorption',
      'Heavy commercial stain-resistant banquet upholstery and solid hardwood tables',
      'Feature bar counter architecture with brass glass racks, speed rails, and bottle displays',
      'Restroom design as a luxury brand extension with touchless premium fixtures',
      'Compliance with local commercial food safety layouts, fire exits, and ventilation codes',
    ],
    approachTitle: 'Atmosphere, Acoustic Intimacy, and Kitchen Synergy',
    approachParagraphs: [
      'In Bhopal’s burgeoning dining scene across Arera Colony, Shyamla Hills, and Gulmohar, a restaurant’s interior directly dictates table turnover, average spend per head, and repeat visits. If dining tables are too loud because surfaces reflect noise, guests leave early; if tables feel like an exposed cafeteria, the food cannot command premium pricing.',
      'We design hospitality spaces from the guest sensory perspective. Lighting is never flat; we deploy multi-circuit dimmable scenes that transition smoothly from bright lunch daylight into warm, candlelit evening intimacy at 2400K. Acoustic treatments are seamlessly integrated into upholstered banquette backs, ribbed timber baffles, and textured lime ceilings to keep ambient noise lively without forcing guests to shout.',
      'Crucially, our turnkey execution team bridges the gap between the dining room and the commercial kitchen. We ensure heavy exhaust makeup air ducting, drainage gradients for wet kitchen sculleries, and fire-rated gas lines are installed with industrial precision, ensuring kitchen operations never disrupt guest comfort.',
    ],
    projectType: 'hospitality',
    materialsTitle: 'Atmospheric & Resilient Materials',
    materialsProse:
      'Tactile, atmospheric surfaces that absorb sound and endure wine spills, hot dishes, and heavy commercial cleaning.',
    materialsList: [
      {
        title: 'Commercial Crypton Upholstery & Fluted Leather',
        description:
          'Stain-repellent, moisture-barrier commercial fabrics that feel soft yet clean easily after food spills.',
        image:
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop',
        imageAlt: 'Custom leather hospitality booth banquette seating detail',
      },
      {
        title: 'Solid Ash & Teak Dining Tops',
        description:
          'Heavy solid hardwood tops treated with food-safe polyurethanes resistant to hot ceramic plates and alcohol.',
        image:
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
        imageAlt: 'Solid timber dining table finish detail',
      },
      {
        title: 'Deep Warm Travertine & Ribbed Concrete',
        description:
          'Tactile bar frontages and washroom vanities with water-repellent silane-siloxane impregnators.',
        image:
          'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop',
        imageAlt: 'Textured ribbed bar counter finish in natural stone',
      },
    ],
    faqs: [
      {
        question: 'What is the average fit-out budget for a restaurant or cafe in Bhopal?',
        answer:
          'Restaurant fit-outs in Bhopal typically range from ₹2,000 to ₹4,000 per sq.ft. for contemporary cafes and bistros, and ₹4,000 to ₹7,500+ per sq.ft. for premium fine-dining spaces and lounge bars. Factors influencing cost include commercial kitchen exhaust hoods, acoustic ceiling treatments, and custom booth seating.',
      },
      {
        question: 'How do you coordinate commercial kitchen MEP with interior dining areas?',
        answer:
          'We work directly with commercial kitchen equipment suppliers from day one, modeling grease trap locations, gas bank manifolds, electrical load balancing, and dedicated 24-inch exhaust riser paths before wall layouts are finalized.',
      },
      {
        question: 'How do you prevent restaurants from becoming painfully noisy at full capacity?',
        answer:
          'We engineer sound absorption into ceilings, upholstered seating backs, and soft window drapery, ensuring room reverberation remains below 0.7 seconds so conversations remain intimate even at 100% table occupancy.',
      },
      {
        question: 'Can you deliver within a strict pre-opening deadline?',
        answer:
          'Yes. We build hospitality spaces under committed Gantt schedules with liquidated damages clauses, ensuring your opening date, marketing campaign, and licensing inspections remain on track.',
      },
    ],
    relatedServices: [
      {
        slug: 'retail-showroom-interiors',
        name: 'Retail & Showrooms',
        description: 'Brand-defining retail environments and commercial flagships.',
      },
      {
        slug: 'commercial-interiors',
        name: 'Commercial Interiors',
        description: 'Comprehensive commercial architectural interiors and multi-use spaces.',
      },
      {
        slug: 'turnkey-interiors',
        name: 'Turnkey Interiors',
        description: 'Single-source site management from bare shell to final handover.',
      },
    ],
    metaTitle: 'Hospitality Interiors in Bhopal | Lodhi Interiors',
    metaDescription:
      'Restaurant, cafe, and boutique hospitality interior design in Bhopal. Acoustic dining, lighting layers, and turnkey commercial delivery.',
  },

  'commercial-interiors': {
    slug: 'commercial-interiors',
    name: 'Commercial Interiors',
    shortDescription:
      'Multi-use commercial spaces, corporate institutes, and healthcare facilities executed turnkey in Bhopal.',
    categoryTag: 'Commercial & Institutional',
    heroH1: 'Commercial Interiors in Bhopal',
    heroPromise:
      'Durable architectural spaces engineered for operational efficiency, safety, and institutional stature.',
    heroImage:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1800&auto=format&fit=crop',
    heroImageAlt: 'Large-scale commercial atrium and executive reception space in Bhopal',
    scopeSummary:
      'We deliver comprehensive turnkey architectural interiors for institutional headquarters, commercial buildings, multi-specialty clinics, and large retail centers across Bhopal.',
    scopeItems: [
      'Comprehensive master planning and zoning for multi-tenant or multi-department facilities',
      'Structural steel retrofitting, mezzanine floor casting, and heavy elevator lobby fit-outs',
      'Centralized HVAC ducting, smoke extraction, and fresh air supply engineering',
      'High-durability public circulation finishes: epoxy terrazzo, granite, and impact-resistant walls',
      'Institutional electrical infrastructure, 3-phase load panels, and backup diesel generator sync',
      'Bespoke public counter joinery, acoustic lecture halls, and executive briefing suites',
      'Full compliance with the National Building Code (NBC) of India, BMC fire safety, and ADA accessibility',
      'Rigorous project management with weekly milestone audits and certified technical sign-offs',
    ],
    approachTitle: 'Scale, Operational Durability, and Regulatory Precision',
    approachParagraphs: [
      'Commercial interiors spanning 10,000 to 50,000 square feet demand a fundamentally different methodology than boutique residential work. The governing priorities are operational flow, structural fire safety, low lifecycle maintenance, and rigorous construction timelines. Every detail must withstand continuous public interaction without degrading.',
      'Our studio brings engineering precision to large commercial footprints in Bhopal. We coordinate structural steel mezzanines, high-capacity electrical distribution, and centralized VRV chillers with full compliance under the National Building Code (NBC). Finishes are specified not for fleeting trends, but for 15-year durability cycles.',
      'Through our single-source turnkey model, institutional clients deal with a single legal entity for design drafting, municipal compliance coordination, civil execution, and final equipment commissioning. This eliminates contract disputes, cost overruns, and administrative delays.',
    ],
    projectType: 'commercial',
    materialsTitle: 'Institutional-Grade Materials',
    materialsProse:
      'Materials certified for high traffic, fire resistance, hygienic wipe-down, and decades of commercial service.',
    materialsList: [
      {
        title: 'Seamless Epoxy Terrazzo & Honed Granite',
        description:
          'Monolithic, joint-free commercial flooring engineered for heavy footfall and mechanical scrubber cleaning.',
        image:
          'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
        imageAlt: 'Seamless commercial epoxy terrazzo flooring',
      },
      {
        title: 'Class A Fire-Rated Acoustic Ceiling Tiles',
        description:
          'Mineral fiber and perforated metal ceiling tiles tested for zero flame spread and smoke safety.',
        image:
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
        imageAlt: 'Fire-rated commercial acoustic ceiling tile grid',
      },
      {
        title: 'Impact-Resistant Compact Laminate (HPL)',
        description:
          'Anti-microbial, impact-proof wall paneling for public lobbies, lift claddings, and wet utility cores.',
        image:
          'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop',
        imageAlt: 'High-pressure compact laminate commercial wall cladding',
      },
    ],
    faqs: [
      {
        question: 'What is the execution cost for large commercial interiors in Bhopal?',
        answer:
          'Commercial fit-outs in Bhopal typically range from ₹1,400 to ₹2,800 per sq.ft. for standard commercial shells and institutional spaces, and ₹2,800 to ₹5,000+ per sq.ft. for high-specification clinics, luxury corporate headquarters, and high-tech auditoriums.',
      },
      {
        question: 'Do you manage statutory municipal clearances and fire NOC compliance?',
        answer:
          'Yes. Our architectural team prepares all submission drawings for Bhopal Municipal Corporation (BMC) approvals, fire safety clearances, and emergency egress audits.',
      },
      {
        question: 'Can you handle projects exceeding 20,000 sq.ft.?',
        answer:
          'Yes. We have the project management infrastructure, supply chain relationships, and on-site engineering supervision to execute large commercial campuses on committed multi-phase schedules.',
      },
      {
        question: 'What warranties and post-handover support do you provide?',
        answer:
          'We provide a comprehensive 12-month defect liability period with scheduled quarterly site audits, alongside manufacturer warranties on all MEP equipment, lighting fixtures, and commercial hardware.',
      },
    ],
    relatedServices: [
      {
        slug: 'office-interiors',
        name: 'Office Interiors',
        description: 'Corporate headquarters, advisory suites, and modern workspaces.',
      },
      {
        slug: 'retail-showroom-interiors',
        name: 'Retail & Showrooms',
        description: 'Brand-defining retail environments and commercial flagships.',
      },
      {
        slug: 'turnkey-interiors',
        name: 'Turnkey Interiors',
        description: 'Single-source site management from bare shell to final handover.',
      },
    ],
    metaTitle: 'Commercial Interiors in Bhopal | Lodhi Interiors',
    metaDescription:
      'Institutional and commercial interior design and turnkey execution in Bhopal. Full civil, MEP, fire compliance, and large-scale project management.',
  },
};

export function getAllServices(): ServiceData[] {
  return Object.values(SERVICES_DATA);
}

export function getServiceBySlug(slug: string): ServiceData | null {
  return SERVICES_DATA[slug] ?? null;
}
