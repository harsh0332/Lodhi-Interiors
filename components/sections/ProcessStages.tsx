'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/Typography';
import { Reveal } from '@/components/motion/Reveal';
import { useProcessSequence } from '@/components/motion/useProcessSequence';

interface Stage {
  number: string;
  title: string;
  duration: string;
  summary: string;
  detail: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  receives: string[];
  needs: string[];
}

const STAGES: Stage[] = [
  {
    number: '01',
    title: 'Consultation & Site Visit',
    duration: '1 to 2 weeks',
    summary:
      'Understanding spatial requirements, surveying existing civil conditions, and assessing natural daylight in Bhopal.',
    detail:
      'We begin with an in-depth on-site consultation at your property in Bhopal. Rather than presenting generic mood boards, we evaluate the real structural conditions: column placements, slab clearances, orientation for natural illumination, and existing plumbing/electrical chases. We listen to how you and your family live, identifying daily friction points and spatial opportunities before any drawing begins.',
    image: '/images/projects/site-bare-shell-survey.jpg',
    imageAlt: 'On-site laser survey and bare shell structural assessment in Bhopal',
    imageCaption: 'Stage 01 • Physical bare-shell structural survey & laser datum measurement',
    receives: [
      'Site assessment notes and orientation analysis',
      'Structural feasibility and civil alteration summary',
      'Preliminary scope definition and project road-map',
    ],
    needs: [
      'Unrestricted site access for laser measurement',
      'Architectural CAD/PDF floor plans if available',
      'Priorities on functional living habits and family requirements',
    ],
  },
  {
    number: '02',
    title: 'Concept & 3D Visualisation',
    duration: '3 to 4 weeks',
    summary:
      'Developing the spatial layout, circulation flows, lighting strategies, and photorealistic 3D architectural models.',
    detail:
      'Our team reorganises the floor plan to unlock natural light, cross-ventilation, and logical circulation. We test multiple spatial volumes, ceiling reveals, and joinery planes. You receive photorealistic 3D perspectives that model true Bhopal daylight angles and authentic material textures, allowing you to experience the exact proportion and light of each space before physical work starts.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop',
    imageAlt: '3D volumetric visualization and natural daylight simulation in Bhopal',
    imageCaption: 'Stage 02 • High-fidelity photometric 3D renders and spatial zoning',
    receives: [
      'Measured spatial layout blueprints',
      'Comprehensive 3D photorealistic architectural renders',
      'Ceiling elevations and lighting schematic drafts',
    ],
    needs: [
      'Feedback on preliminary spatial zoning options',
      'Confirmation on desired appliance and sanitary fixture configurations',
      'Design direction approval before technical drafting',
    ],
  },
  {
    number: '03',
    title: 'Material Palette & Costing',
    duration: '2 to 3 weeks',
    summary:
      'Physical material curation, joinery construction drawings, comprehensive BOQ, and fixed-rate turnkey estimate.',
    detail:
      'In this phase, tactile decisions are locked in. We assemble physical samples of stone slabs, quarter-sawn veneers, textured lime plasters, and architectural hardware in our studio. Concurrently, our technical team completes MEP engineering drawings and an exhaustive, itemised Bill of Quantities (BOQ). Every finish, linear foot of ply, and hardware hinge is quantified with fixed rates—eliminating budget ambiguities.',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Tactile material board curation and fixed line-item BOQ in Bhopal studio',
    imageCaption: 'Stage 03 • Studio material curation and transparent fixed-price BOQ',
    receives: [
      'Physical tactile material board (stone, timber, metal, fabric)',
      'Detailed construction and joinery shop drawings',
      'Itemised, transparent Bill of Quantities (BOQ) with fixed line-item pricing',
      'Binding execution timeline and trade schedule',
    ],
    needs: [
      'Sign-off on physical material selections',
      'Review and sign-off on the contractual BOQ and execution agreement',
    ],
  },
  {
    number: '04',
    title: 'Execution & Site Management',
    duration: '8 to 16 weeks',
    summary:
      'Demolition, civil modifications, MEP infrastructure, precision joinery fabrication, and continuous site supervision.',
    detail:
      'The single-source model becomes evident here. Lodhi Interiors takes full, unshared custody of the site. Our in-house site supervisors, certified electricians, plumbers, and master carpenters execute the drawings without third-party handoffs. We maintain continuous daily presence in Bhopal, running laser levels for joinery, pressure-testing plumbing to 6 bar, and coordinating MEP runs to ensure 1.5mm tolerances.',
    image: '/images/projects/craft-moulding-installation.jpg',
    imageAlt: 'In-house master carpenters executing wall moulding joinery on site in Bhopal',
    imageCaption: 'Stage 04 • Single-source turnkey execution with in-house trade custody',
    receives: [
      'Single accountable point of contact for all trades',
      'Weekly photographic site logs and progress tracking',
      'Laser-aligned joinery carcasses and zero-leak pressure test reports',
      'Milestone inspection sign-offs prior to finish closures',
    ],
    needs: [
      'Clearance of agreed milestone payments',
      'Prompt confirmation of any client-procured sanitary fittings or appliances',
    ],
  },
  {
    number: '05',
    title: 'Styling & Finishing',
    duration: '1 to 2 weeks',
    summary:
      'Architectural hardware installation, loose furniture positioning, lighting scene commissioning, and professional cleaning.',
    detail:
      'With civil interventions and built-in joinery completed, we install custom architectural ironmongery, position loose furniture, and calibrate lighting circuits for appropriate warm colour temperatures. We conduct a thorough industrial clean across all surfaces and millwork interiors to remove all trace of construction dust.',
    image: '/images/projects/craft-stepped-arch-joinery.jpg',
    imageAlt: 'Bespoke architectural archway joinery and illuminated vitrine detailing',
    imageCaption: 'Stage 05 • Fine joinery installation, architectural lighting & acoustic fit-out',
    receives: [
      'Calibrated multi-scene lighting channels and dimming settings',
      'Placement and assembly of loose furniture and soft furnishings',
      'Joint preliminary snagging review document',
    ],
    needs: [
      'Joint site walkthrough with Soumya Lodhi and the site lead to review details',
      'Consolidation of any micro-snags or touch-up requests',
    ],
  },
  {
    number: '06',
    title: 'Handover & Post-Occupancy Support',
    duration: 'Handover & Ongoing',
    summary:
      'Snag completion, delivery of technical operation manuals, warranties, and dedicated post-occupancy care.',
    detail:
      'Every item logged during the styling walkthrough is resolved before key handover. We present a complete handover dossier containing as-built electrical single-line diagrams, concealed plumbing valve locations, hardware warranty documents, and maintenance protocols for stone and veneer surfaces. Our team remains available for post-occupancy care as your space settles.',
    image: '/images/projects/vishnu-gupta-grand-living.jpg',
    imageAlt: 'Completed turnkey luxury residence delivered snag-free in Bhopal',
    imageCaption: 'Stage 06 • Official handover dossier, warranty certificates & key handover',
    receives: [
      'Official Handover Certificate and keys',
      'Complete as-built technical folder (drawings, valve locations)',
      'Manufacturer warranty documents for hardware and appliances',
      'Material care and cleaning protocol guide',
      'Direct post-occupancy maintenance support channel',
    ],
    needs: ['Final joint inspection sign-off', 'Transition of site custody and balance settlement'],
  },
];

export function ProcessStages() {
  const [activeStage, setActiveStage] = useState('01');
  const rootRef = useRef<HTMLDivElement>(null);

  const handleActiveChange = useCallback((idx: number) => {
    if (STAGES[idx]) {
      setActiveStage(STAGES[idx].number);
    }
  }, []);

  useProcessSequence(rootRef, handleActiveChange);

  const scrollToStage = (stageNum: string) => {
    const el = document.getElementById(`stage-${stageNum}`);
    if (el) {
      const yOffset = -110;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveStage(stageNum);
    }
  };

  const activeIndex = STAGES.findIndex((s) => s.number === activeStage);
  const progressPercent = activeIndex >= 0 ? (activeIndex / (STAGES.length - 1)) * 100 : 0;

  return (
    <div ref={rootRef} data-motion-module="process">
      {/* 1. Interactive Horizontal Architectural Progress Ribbon */}
      <div className="mb-14 overflow-x-auto pb-4 pt-2">
        <div className="relative flex min-w-[680px] items-center justify-between px-4">
          {/* Background Connecting Rail */}
          <div className="absolute left-10 right-10 top-5 h-[2px] bg-greige/25" aria-hidden="true" />
          {/* Active Animated Gold Progress Line */}
          <div
            className="absolute left-10 top-5 h-[2px] bg-accent transition-all duration-500 ease-out"
            style={{ width: `calc(${progressPercent}% * 0.88)` }}
            aria-hidden="true"
          />

          {STAGES.map((s) => {
            const isActive = activeStage === s.number;
            const isPassed = parseInt(activeStage, 10) >= parseInt(s.number, 10);
            return (
              <button
                key={s.number}
                type="button"
                data-motion="stage"
                onClick={() => scrollToStage(s.number)}
                className="group relative z-10 flex flex-col items-center focus-visible:outline-none"
              >
                <span
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 font-mono text-xs font-semibold transition-all duration-300",
                    isActive
                      ? "border-accent bg-accent text-charcoal scale-110 shadow-[0_0_14px_rgba(197,162,101,0.6)]"
                      : isPassed
                        ? "border-accent bg-bone text-accent"
                        : "border-greige/30 bg-bone text-greige group-hover:border-accent/60",
                  )}
                >
                  {s.number}
                </span>
                <span
                  className={cn(
                    "mt-2.5 max-w-[105px] text-center font-sans text-[0.75rem] font-medium transition-colors duration-200",
                    isActive ? "text-accent font-semibold" : "text-charcoal/70 group-hover:text-charcoal",
                  )}
                >
                  {(s.title.split('&')[0] ?? s.title).trim()}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div data-motion="pin-scope" className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
        {/* 2. Desktop Sticky Navigation Column with Animated Progress Rail */}
        <aside data-motion="pin-col" className="hidden border border-greige/30 bg-paper/60 p-6 lg:sticky lg:top-36 lg:col-span-4 lg:block">
          <Label className="mb-4 block text-accent">Sequence of Work</Label>
          <h3 className="mb-6 font-serif text-[1.25rem] font-normal text-charcoal">
            Six Disciplined Stages
          </h3>

          <nav aria-label="Process stages quick jump" className="relative">
            <ul className="space-y-2">
              {STAGES.map((s) => {
                const isActive = activeStage === s.number;
                return (
                  <li key={s.number}>
                    <button
                      type="button"
                      data-motion="stage"
                      onClick={() => scrollToStage(s.number)}
                      className={cn(
                        "group flex w-full items-center justify-between rounded-sm px-3.5 py-2.5 text-left font-sans text-xs transition-all duration-200",
                        isActive
                          ? "bg-charcoal font-medium text-bone shadow-md"
                          : "text-charcoal/70 hover:bg-paper hover:text-charcoal",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={cn(
                            "font-mono transition-colors",
                            isActive ? "text-accent font-bold" : "text-greige group-hover:text-accent",
                          )}
                        >
                          {s.number}
                        </span>
                        <span>{s.title}</span>
                      </span>
                      <span className="ml-2 flex-shrink-0 font-mono text-[0.75rem] opacity-70">
                        {s.duration}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-8 border-t border-greige/20 pt-6">
            <span className="mb-1 block font-sans text-[0.8125rem] text-greige">
              Total Typical Duration
            </span>
            <span className="font-serif text-[1.125rem] font-medium text-charcoal">
              16 to 26 weeks
            </span>
            <p className="mt-1 font-sans text-[0.8125rem] leading-relaxed text-charcoal/70">
              Variable depending on structural scope, monsoon windows, and custom millwork volume.
            </p>
          </div>
        </aside>

        {/* 3. Scrolling Stages Detail Column with Stage Milestone Visuals */}
        <div className="space-y-20 md:space-y-28 lg:col-span-8">
          {STAGES.map((stage) => (
            <article
              key={stage.number}
              id={`stage-${stage.number}`}
              data-motion="detail"
              className="scroll-mt-36 border-t border-greige/30 pt-8 md:pt-10"
            >
              <Reveal>
                {/* Header: Number, Duration, Title */}
                <div className="mb-4 flex flex-wrap items-baseline justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-ui-label font-medium text-accent">
                      STAGE {stage.number}
                    </span>
                    <span className="font-sans text-ui-caption text-greige" aria-hidden="true">
                      &bull;
                    </span>
                    <span className="font-mono text-ui-caption text-greige">
                      Duration: {stage.duration}
                    </span>
                  </div>
                </div>

                <h2 className="mb-4 font-serif text-fluid-h2 text-charcoal">{stage.title}</h2>

                <p className="mb-6 font-sans text-[1.0625rem] font-medium leading-relaxed text-charcoal">
                  {stage.summary}
                </p>

                {/* Architectural Stage Milestone Visualizer Card */}
                <div className="group relative mb-8 overflow-hidden border border-greige/30 bg-charcoal/5">
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <Image
                      src={stage.image}
                      alt={stage.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 65vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
                    {/* Architectural Drafting Corner Brackets */}
                    <div className="pointer-events-none absolute inset-3 border border-bone/20 transition-all duration-300 group-hover:border-accent/60" />
                  </div>
                  <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-bone">
                    <span className="font-mono text-[0.75rem] uppercase tracking-wider text-accent drop-shadow">
                      {stage.imageCaption}
                    </span>
                    <span className="hidden font-mono text-[0.75rem] text-bone/75 drop-shadow sm:inline">
                      Turnkey Custody
                    </span>
                  </div>
                </div>

                <p className="mb-8 font-sans text-[0.9375rem] leading-[1.75] text-charcoal/80">
                  {stage.detail}
                </p>

                {/* Two-Column Deliverables & Requirements Grid */}
                <div className="grid grid-cols-1 gap-6 border border-greige/30 bg-paper/50 p-6 md:grid-cols-2">
                  {/* What you receive */}
                  <div>
                    <span className="mb-3 block font-sans text-ui-label font-medium uppercase tracking-wider text-accent">
                      What You Receive
                    </span>
                    <ul className="space-y-2.5">
                      {stage.receives.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 font-sans text-xs leading-relaxed text-charcoal/85"
                        >
                          <svg
                            className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-accent"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* What we need from you */}
                  <div className="border-t border-greige/25 pt-5 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                    <span className="mb-3 block font-sans text-ui-label font-medium uppercase tracking-wider text-greige">
                      What We Need From You
                    </span>
                    <ul className="space-y-2.5">
                      {stage.needs.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 font-sans text-xs leading-relaxed text-charcoal/85"
                        >
                          <svg
                            className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-greige"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
