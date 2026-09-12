'use client';

import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/Typography';
import { Reveal } from '@/components/motion/Reveal';

interface Stage {
  number: string;
  title: string;
  duration: string;
  summary: string;
  detail: string;
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

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Call ScrollTrigger refresh after initial layout settles
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const scrollToStage = (stageNum: string) => {
    const el = document.getElementById(`stage-${stageNum}`);
    if (el) {
      const yOffset = -120;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveStage(stageNum);
    }
  };

  return (
    <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
      {/* 1. Desktop Sticky Navigation Column */}
      <aside className="hidden border border-greige/30 bg-paper/60 p-6 lg:sticky lg:top-36 lg:col-span-4 lg:block">
        <Label className="mb-4 block text-accent">Sequence of Work</Label>
        <h3 className="mb-6 font-serif text-[1.25rem] font-normal text-charcoal">
          Six Disciplined Stages
        </h3>

        <nav aria-label="Process stages quick jump">
          <ul className="space-y-2">
            {STAGES.map((s) => {
              const isActive = activeStage === s.number;
              return (
                <li key={s.number}>
                  <button
                    type="button"
                    onClick={() => scrollToStage(s.number)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-sm px-3 py-2 text-left font-sans text-xs transition-all duration-200',
                      isActive
                        ? 'bg-charcoal font-medium text-bone'
                        : 'text-charcoal/70 hover:bg-paper hover:text-charcoal',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span className={cn('font-mono', isActive ? 'text-accent' : 'text-greige')}>
                        {s.number}
                      </span>
                      <span>{s.title}</span>
                    </span>
                    <span className="ml-2 flex-shrink-0 font-mono text-[0.8125rem] opacity-70">
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

      {/* 2. Scrolling Stages Detail Column */}
      <div className="space-y-16 md:space-y-24 lg:col-span-8">
        {STAGES.map((stage) => (
          <article
            key={stage.number}
            id={`stage-${stage.number}`}
            className="scroll-mt-36 border-t border-greige/30 pt-8 md:pt-10"
          >
            <Reveal>
              {/* Header: Number, Duration, Title */}
              <div className="mb-3 flex flex-wrap items-baseline justify-between gap-4">
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
  );
}
