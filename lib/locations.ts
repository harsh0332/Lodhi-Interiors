export interface LocalityData {
  slug: string;
  name: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  heroImageAlt: string;
  projectSlugs: string[];
  relatedServices: { slug: string; name: string }[];
  keyFactors: { label: string; detail: string }[];
  narrative: {
    heading: string;
    paragraphs: string[];
  };
}

export const LOCALITIES_DATA: Record<string, LocalityData> = {
  'arera-colony': {
    slug: 'arera-colony',
    name: 'Arera Colony',
    tagline:
      'Refined architectural residences and turnkey restorations in Bhopal’s premier garden suburb.',
    metaTitle: 'Interior Designer in Arera Colony, Bhopal | Lodhi Interiors',
    metaDescription:
      'Architectural interior design and turnkey execution in Arera Colony, Bhopal. Monolithic stone, custom teak joinery, and single-source site custody by Soumya Lodhi.',
    heroImage:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt:
      'Turnkey residence interior with fluted teak and travertine flooring in Arera Colony, Bhopal',
    projectSlugs: ['aranya-residence'],
    relatedServices: [
      { slug: 'residential-interiors', name: 'Residential Interiors' },
      { slug: 'luxury-home-interiors', name: 'Luxury Home Interiors' },
      { slug: 'turnkey-interiors', name: 'Turnkey Execution' },
    ],
    keyFactors: [
      {
        label: 'Plot Typography & Setbacks',
        detail:
          'Generous residential plots (4,000 to 12,000 sqft) requiring deep axial sightlines and seamless integration between indoor living volumes and private perimeter gardens.',
      },
      {
        label: 'Climatic Solar Exposure',
        detail:
          'Mature tree canopies offer natural shade, but intense dry summer heat demands breathable lime-washed walls, thermal mass floor stones, and deep window reveals.',
      },
      {
        label: 'Structural Renovation Nuances',
        detail:
          'Many legacy homes built in the 1980s and 1990s feature compartmentalized load-bearing brick walls; our interventions carefully insert steel portals to unlock expansive living spines.',
      },
    ],
    narrative: {
      heading: 'Architectural Craftsmanship in Bhopal’s Established Core',
      paragraphs: [
        'Arera Colony remains the definitive residential standard in Bhopal. Organized from Sector E-1 through E-7, the neighborhood is distinguished by wide, tree-lined avenues, generous plot ratios, and an architectural history spanning five decades of quiet prestige. When clients commission Lodhi Interiors for an estate in Arera Colony, the assignment rarely involves superficial cosmetic styling; it is an exercise in structural clarification, spatial flow, and enduring materiality.',
        'Older residences across E-3, E-5, and Char Imli often suffer from the architectural tendencies of their era: dark internal circulation corridors, heavy masonry partitions that sever cross-ventilation, and fragmented service areas. Our practice approaches these homes with structural engineering discipline. We strip back non-load-bearing walls, introduce concealed steel portal frames, and establish axial sightlines connecting the front formal lounge directly through dining spaces to private interior courtyard gardens.',
        'Materiality in Arera Colony must honor the microclimate. While the abundant tree cover provides intermittent shade, Bhopal’s summer temperatures regularly surpass 42°C with sharp drops during dry winter nights. We avoid synthetic surface laminates that warp under these thermal fluctuations. Instead, we specify honed Italian Navona travertine, local Vidisha sandstones, and quarter-sawn teak millwork seasoned specifically for central Indian humidity cycles. Every joinery component is pre-machined in our workshop and assembled on site with 1.5mm shadowline tolerances.',
        'By maintaining complete turnkey custody under one roof, Soumya Lodhi and our master carpenters ensure that architectural design and civil reality remain completely aligned. From obtaining municipal approvals and upgrading antiquated electrical loads to final brass hardware installation, we provide homeowners in Arera Colony with a calm, single-point delivery process that preserves property value for generations.',
      ],
    },
  },

  shahpura: {
    slug: 'shahpura',
    name: 'Shahpura',
    tagline: 'Waterfront estates, modern villas, and panoramic lakeview sanctuaries.',
    metaTitle: 'Interior Designer in Shahpura, Bhopal | Lodhi Interiors',
    metaDescription:
      'Luxury residential interior design and turnkey execution in Shahpura, Bhopal. Tailored waterfront estates, moisture-resistant joinery, and architectural lighting.',
    heroImage:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt:
      'Double-height living space overlooking Shahpura Lake in Bhopal by Lodhi Interiors',
    projectSlugs: ['shahpura-villa'],
    relatedServices: [
      { slug: 'luxury-home-interiors', name: 'Luxury Home Interiors' },
      { slug: 'turnkey-interiors', name: 'Turnkey Execution' },
      { slug: 'modular-kitchens', name: 'Modular Kitchens' },
    ],
    keyFactors: [
      {
        label: 'Waterfront Microclimate',
        detail:
          'Proximity to Shahpura Lake creates elevated seasonal humidity and morning mist, requiring marine-grade substructures, anti-fungal lime plasters, and vapor-permeable sealers.',
      },
      {
        label: 'Panoramic Glazing & Glare',
        detail:
          'Expansive lake vistas demand high-performance Low-E acoustic double glazing to harvest daylight without causing intense afternoon solar heat gain.',
      },
      {
        label: 'Acoustic Buffer Design',
        detail:
          'Popular lakefront promenades create evening pedestrian and traffic sound, addressed through decoupled acoustic wall assemblies and magnetic drop seals on all openings.',
      },
    ],
    narrative: {
      heading: 'Turnkey Precision for Bhopal’s Lakeside Residences',
      paragraphs: [
        'Shahpura has evolved into one of Bhopal’s most coveted residential destinations, combining close proximity to commercial centers with the tranquil expanse of Shahpura Lake. The architectural typology here is modern, expansive, and outward-looking, characterized by multi-level villas, rooftop entertainment pavilions, and double-height living volumes designed to capture shimmering water reflections.',
        'Designing along the lake presents unique atmospheric and technical requirements. The immediate water body produces a humid microclimate that can compromise standard commercial woodwork and low-grade gypsum boards within two monsoons. At Lodhi Interiors, our turnkey methodology incorporates marine-grade calibrated plywood, solid hardwood framing, and moisture-regulating natural lime washes that naturally resist mildew and breathe alongside Bhopal’s seasonal humidity cycles.',
        'In our landmark Shahpura Lake Villa project, the brief demanded maximizing panoramic vistas while safeguarding internal acoustic tranquility. We introduced floor-to-ceiling thermally broken acoustic glazing paired with motorized architectural shading recessed invisibly into structural reveals. Internally, book-matched Italian marble floors ground the space, while fluted timber paneling softens acoustic reverb across lofty 18-foot living ceiling heights.',
        'Because our studio handles both architectural design and on-site trade execution under single-source accountability, clients in Shahpura avoid the friction of coordinating separate civil contractors, electrical vendors, and finish carpenters. We manage every detail—from custom stone fabrication to smart lighting scenes—delivering turnkey homes that marry international restraint with deep regional durability.',
      ],
    },
  },

  kohefiza: {
    slug: 'kohefiza',
    name: 'Koh-e-Fiza',
    tagline: 'Historic ridge residences, elevated penthouses, and panoramic lake vistas.',
    metaTitle: 'Interior Designer in Koh-e-Fiza, Bhopal | Lodhi Interiors',
    metaDescription:
      'High-end interior design and turnkey execution in Koh-e-Fiza, Bhopal. Cliffside penthouses, passive thermal cooling, and handcrafted architectural millwork.',
    heroImage:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt:
      'Minimalist penthouse lounge overlooking Upper Lake in Koh-e-Fiza, Bhopal by Lodhi Interiors',
    projectSlugs: ['kohefiza-penthouse'],
    relatedServices: [
      { slug: 'residential-interiors', name: 'Residential Interiors' },
      { slug: 'luxury-home-interiors', name: 'Luxury Home Interiors' },
      { slug: 'turnkey-interiors', name: 'Turnkey Execution' },
    ],
    keyFactors: [
      {
        label: 'Ridge Wind & Sun Exposure',
        detail:
          'Elevated cliffside topography exposes structures to high wind loads and direct western solar radiation over the Upper Lake, requiring heavy thermal envelope management.',
      },
      {
        label: 'Upper Lake Sightlines',
        detail:
          'Strategic spatial orientation prioritizing uninterrupted panoramic views across Bada Talab while maintaining total privacy from neighboring hill properties.',
      },
      {
        label: 'Basalt Terrain Foundations',
        detail:
          'Rocky foundation substrates necessitate careful planning for plumbing chases, floor level transitions, and structural service integration.',
      },
    ],
    narrative: {
      heading: 'Elevated Sanctuaries Overlooking Bhopal’s Upper Lake',
      paragraphs: [
        'Perched along the northwestern ridge of Bhopal, Koh-e-Fiza holds a storied position in the city’s architectural fabric. Known for its breezy elevations and iconic vistas across the Upper Lake (Bada Talab) toward the historic VIP Road, the locality offers some of the most dramatic natural settings in Central India. Designing residences here requires acute sensitivity to orientation, wind dynamics, and intense western afternoon sun.',
        'In elevated ridge properties and penthouses, excessive solar gain can easily overwhelm air-conditioning systems if interior architecture is treated merely as decoration. Lodhi Interiors approaches Koh-e-Fiza spaces with passive thermal zoning principles. We introduce deep architectural louvers, insulated cavity wall linings, and dense natural stone surfaces—such as honed Kota and Jodhpur grey stone—that absorb thermal loads during the day and release cool air at night.',
        'Our Koh-e-Fiza Penthouse case study highlights our execution mastery in this demanding terrain. By stripping away heavy partitioning, we created a 3,800-sqft fluid living gallery anchored by a continuous bronze-shadowline ceiling datum. Custom low-slung joinery was designed to never obstruct the sightline toward the lake horizon, while concealed motorized shades provide instant glare reduction when the sun descends over the water.',
        'Our on-site execution team handles the complex logistics of working at height and on steep ridge inclines. We maintain strict site hygiene, calibrated crane hoisting for monolithic stone slabs, and millimeter-precise joinery calibration. The result is a residence that feels quietly anchored to the hilltop, delivering timeless serenity and flawless daily function.',
      ],
    },
  },

  chunabhatti: {
    slug: 'chunabhatti',
    name: 'Chuna Bhatti',
    tagline: 'Contemporary villas, sprawling family estates, and modern suburban residences.',
    metaTitle: 'Interior Designer in Chuna Bhatti, Bhopal | Lodhi Interiors',
    metaDescription:
      'Bespoke villa interior design and turnkey construction execution in Chuna Bhatti, Bhopal. Monolithic marble floors, custom kitchens, and precision architectural millwork.',
    heroImage:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt:
      'Sprawling modern villa dining and living pavilion in Chuna Bhatti, Bhopal by Lodhi Interiors',
    projectSlugs: ['chunabhatti-villa'],
    relatedServices: [
      { slug: 'luxury-home-interiors', name: 'Luxury Home Interiors' },
      { slug: 'modular-kitchens', name: 'Modular Kitchens' },
      { slug: 'turnkey-interiors', name: 'Turnkey Execution' },
    ],
    keyFactors: [
      {
        label: 'Suburban Villa Scale',
        detail:
          'Expansive footprint residences requiring coherent spatial hierarchies, clear acoustic division between family and service wings, and dramatic double-height volume treatment.',
      },
      {
        label: 'Alluvial Basin Hydrology',
        detail:
          'Proximity to the Kaliyasot river basin produces seasonal groundwater shifts; subfloors demand comprehensive damp-proofing barriers before laying premium natural stones.',
      },
      {
        label: 'Monolithic Surface Detailing',
        detail:
          'Large continuous floor plates require calibrated expansion joints and zero-joint Italian stone laying to avoid thermal stress cracks during dry summer heat.',
      },
    ],
    narrative: {
      heading: 'Expansive Modern Villas Conceived and Built Without Compromise',
      paragraphs: [
        'Chuna Bhatti represents the contemporary evolution of upscale living in Bhopal. Located along the scenic Kolar corridor near the Kaliyasot reservoir, it has become the favored neighborhood for homeowners seeking substantial land parcels, independent villas, and custom-built multi-generational homes. Here, spatial freedom allows for soaring double-height volumes, landscaped lightwells, and dedicated wellness or entertainment wings.',
        'However, generous square footage requires disciplined architectural restraint. Without careful material continuity and proportional control, large homes quickly feel sterile or disjointed. Lodhi Interiors works with a cohesive architectural palette: monolithic stone floor planes that link entrance foyers through to double-height dining spaces, balanced by textured lime plasters and bespoke quarter-sawn oak or teak joinery that adds warmth and acoustic comfort.',
        'In the Chuna Bhatti Heritage Villa, our execution team was tasked with translating intricate architectural blueprints into physical reality under strict tolerances. We installed over 4,000 sqft of zero-joint imported marble floors, coordinated multi-zone VRV HVAC ducting hidden behind continuous architectural shadowlines, and fabricated custom acoustic paneling for private bedroom wings.',
        'Our turnkey practice takes complete ownership of the site from day one. Homeowners in Chuna Bhatti benefit from daily on-site supervision, weekly transparent progress reporting, and an in-house guild of master carpenters, plumbers, and electricians. We eliminate the stress of managing disjointed vendors, ensuring your estate is delivered on schedule, on budget, and built to stand for decades.',
      ],
    },
  },

  'bawadiya-kalan': {
    slug: 'bawadiya-kalan',
    name: 'Bawadiya Kalan',
    tagline: 'Modern luxury apartments, duplex homes, and high-performance culinary spaces.',
    metaTitle: 'Interior Designer in Bawadiya Kalan, Bhopal | Lodhi Interiors',
    metaDescription:
      'Turnkey interior design and modular kitchen execution in Bawadiya Kalan, Bhopal. Precision joinery, German hardware, and contemporary residential spaces.',
    heroImage:
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt:
      'High-performance contemporary kitchen with fluted oak and quartzite island in Bawadiya Kalan, Bhopal',
    projectSlugs: ['bawadiya-kitchen'],
    relatedServices: [
      { slug: 'modular-kitchens', name: 'Modular Kitchens' },
      { slug: 'residential-interiors', name: 'Residential Interiors' },
      { slug: 'turnkey-interiors', name: 'Turnkey Execution' },
    ],
    keyFactors: [
      {
        label: 'Modern High-Rise & Duplex Layouts',
        detail:
          'Contemporary multi-storey apartments and gated enclaves requiring intelligent spatial optimization, concealed storage walls, and clean architectural lighting layouts.',
      },
      {
        label: 'High-Heat Culinary Ergonomics',
        detail:
          'Indian culinary requirements demand separate wet/dry preparation zones, commercial-grade suction extraction (1500+ m³/hr), and stain-impervious sintered stone worktops.',
      },
      {
        label: 'Sound & Vibration Isolation',
        detail:
          'Shared concrete floor slabs in multi-unit buildings addressed with acoustic underlays beneath wooden flooring and soft-close Austrian hardware throughout all joinery.',
      },
    ],
    narrative: {
      heading: 'Precision Living and Modular Craft in Bhopal’s New Growth Corridor',
      paragraphs: [
        'Bawadiya Kalan has emerged as Bhopal’s most vibrant modern residential neighborhood. Home to leading premium gated communities, contemporary high-rises, and private duplex enclaves, it attracts young professionals, physicians, and business leaders who value clean aesthetics, efficient layouts, and international hardware standards. Space in modern developments must work hard; every square inch requires intelligent planning and durable execution.',
        'Our work in Bawadiya Kalan centers on transforming standard builder-delivered spaces into refined, custom-tailored homes. We replace generic tile floors with monolithic architectural stone or European engineered timber, redesign electrical layouts for museum-grade architectural lighting, and design custom floor-to-ceiling storage walls that integrate seamlessly into wall planes without visual clutter.',
        'Culinary design is a particular specialty of Lodhi Interiors in this district. As showcased in our Bawadiya Culinary Kitchen case study, we reject flat-pack, off-the-shelf modular systems that fall apart under Bhopal’s rigorous cooking routines and monsoon humidity. Instead, we engineer kitchens with marine-grade calibrated ply carcasses, Blum soft-close runners, non-porous sintered stone counters, and twin-motor extraction hoods that keep living spaces completely odor-free.',
        'With our design studio and dedicated joinery workshop in Bhopal, we deliver fast, predictable execution schedules. We protect apartment corridors, coordinate with building management associations, and ensure clean, dust-controlled site operations from demolition through to white-glove handover.',
      ],
    },
  },

  'mp-nagar': {
    slug: 'mp-nagar',
    name: 'MP Nagar',
    tagline: 'High-focus executive offices, corporate headquarters, and commercial studios.',
    metaTitle: 'Office & Commercial Interior Designer in MP Nagar | Lodhi Interiors',
    metaDescription:
      'Corporate interior design and turnkey office fit-outs in MP Nagar, Bhopal. Acoustic isolation, bespoke executive suites, and rapid commercial turnkey execution.',
    heroImage:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt:
      'Acoustically isolated executive office suite and boardroom in MP Nagar, Bhopal by Lodhi Interiors',
    projectSlugs: ['atelier-studio'],
    relatedServices: [
      { slug: 'office-interiors', name: 'Office Interiors' },
      { slug: 'commercial-interiors', name: 'Commercial Interiors' },
      { slug: 'turnkey-interiors', name: 'Turnkey Execution' },
    ],
    keyFactors: [
      {
        label: 'Urban Acoustic Decoupling',
        detail:
          'Dense arterial commercial traffic in Zone I & II countered with STC 50+ acoustic double glazing, decoupled gypsum ceiling baffles, and heavy acoustic timber doors.',
      },
      {
        label: 'Fast-Track Turnkey Schedules',
        detail:
          'Commercial lease structures require rapid fit-out schedules, enabled by prefabricated workshop joinery and overnight MEP infrastructure installation.',
      },
      {
        label: 'Integrated Data & VRV Climate',
        detail:
          'High-density server and data cabling concealed within accessible perimeter raised raceways, paired with individual-zone climate management for boardrooms and cabins.',
      },
    ],
    narrative: {
      heading: 'Architectural Workplaces Engineered for Focus and Authority',
      paragraphs: [
        'Maharana Pratap Nagar (MP Nagar) is the commercial nerve center of Bhopal. Comprising Zones I and II, it accommodates the state’s foremost corporate offices, investment banking institutions, legal chambers, and technology consultancies. A high-performing workplace in MP Nagar must project credibility to clients while providing an acoustically isolated, serene sanctuary where leadership teams can conduct deep-focus business.',
        'The prevailing challenge in MP Nagar’s commercial buildings is acoustic pollution and chaotic exterior infrastructure. Traffic noise from the main Chetak Bridge and Jyoti Cineplex arteries regularly exceeds 75 decibels. Lodhi Interiors approaches corporate interiors with specialized acoustic architectural engineering. We construct double-stud drywall partitions with high-density rockwool acoustic insulation, install acoustic drop-seals on executive doors, and install micro-perforated timber ceiling baffles that eliminate sound reverberation.',
        'In our Atelier Studio corporate headquarters project, we designed a warm, residential-feeling workplace that rejects sterile cubicles. Using fluted walnut wall cladding, honed basalt stone floors, and indirect 3000K warm architectural lighting, the office balances private executive suites with an inviting hospitality lounge for high-net-worth client consultations.',
        'We understand that in commercial projects, every day of delay represents wasted rent and lost productivity. Lodhi Interiors executes commercial fit-outs under strict liquidated milestone schedules. Our in-house trades handle all civil, HVAC, fire fighting, electrical, and millwork contracts simultaneously under single-point responsibility, delivering move-in ready workspaces on time and without excuses.',
      ],
    },
  },
};

export function getAllLocalities(): LocalityData[] {
  return Object.values(LOCALITIES_DATA);
}

export function getLocalityBySlug(slug: string): LocalityData | null {
  return LOCALITIES_DATA[slug] ?? null;
}
