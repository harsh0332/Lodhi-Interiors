import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import {
  Display,
  Heading,
  Body,
  Caption,
  Label,
  Button,
  ProjectCard,
  Section,
  FullBleedImage,
  MetaRow,
  MetaList,
} from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'Design System & Primitives Review | LODHI INTERIORS',
  description: 'Internal design tokens and UI primitives demonstration for Phase 1 verification.',
  robots: {
    index: false,
    follow: false,
  },
};

const COLOR_TOKENS = [
  {
    name: 'bone',
    bgClass: 'bg-bone',
    textClass: 'text-charcoal',
    usage: 'Page background & light sections',
  },
  {
    name: 'paper',
    bgClass: 'bg-paper',
    textClass: 'text-charcoal',
    usage: 'Subtle alternate band & image plates',
  },
  {
    name: 'greige',
    bgClass: 'bg-greige',
    textClass: 'text-charcoal',
    usage: 'Hairlines (30%) & captions',
  },
  {
    name: 'charcoal',
    bgClass: 'bg-charcoal',
    textClass: 'text-bone',
    usage: 'Primary dark tone & body text',
  },
  {
    name: 'charcoal-2',
    bgClass: 'bg-charcoal-2',
    textClass: 'text-bone',
    usage: 'Dark section alternate band',
  },
  {
    name: 'accent',
    bgClass: 'bg-accent',
    textClass: 'text-bone',
    usage: 'Single muted brass accent & focus rings',
  },
];

export default function DemoPage() {
  return (
    <div className="pt-24 md:pt-32">
      {/* 1. Header & Introduction */}
      <Section tone="light" className="pb-16 pt-12">
        <Reveal>
          <Label className="mb-3 block text-accent">Design System v1.0</Label>
          <Display className="mb-6">Architectural Tokens & Primitives</Display>
          <Body className="text-greige">
            Phase 1 global foundation for LODHI INTERIORS. High-contrast typography, warm
            architectural neutrals, 2px maximum radius, hairline rules, and zero box shadows.
          </Body>
        </Reveal>
      </Section>

      {/* 2. Color Tokens */}
      <Section tone="paper">
        <Reveal>
          <Label className="mb-2 block text-accent">Token Palette</Label>
          <Heading level={2} className="mb-10">
            Warm Architectural Neutrals
          </Heading>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COLOR_TOKENS.map((token) => (
            <Reveal key={token.name} delay={0.1}>
              <div className="border border-greige/30 bg-bone p-5">
                <div
                  className={cn(
                    'mb-4 flex h-24 w-full items-center justify-center border border-greige/20 font-mono text-xs',
                    token.bgClass,
                    token.textClass,
                  )}
                >
                  bg-{token.name}
                </div>
                <div className="mb-1 flex items-baseline justify-between">
                  <span className="font-serif text-[1.125rem] capitalize text-charcoal">
                    {token.name}
                  </span>
                  <span className="font-mono text-ui-caption text-greige">bg-{token.name}</span>
                </div>
                <Caption>{token.usage}</Caption>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 3. Typography Scale */}
      <Section tone="light">
        <Reveal>
          <Label className="mb-2 block text-accent">Typography System</Label>
          <Heading level={2} className="mb-12">
            Fluid Clamp Scale
          </Heading>
        </Reveal>

        <div className="space-y-12 divide-y divide-greige/30">
          <div className="pt-6">
            <Caption className="mb-2 block font-mono">
              Display (Cormorant Garamond / clamp 2.75rem - 6rem)
            </Caption>
            <Display>Lodhi Interiors</Display>
          </div>

          <div className="pt-6">
            <Caption className="mb-2 block font-mono">
              Heading Level 1 (Cormorant Garamond / clamp 2.25rem - 4rem)
            </Caption>
            <Heading level={1}>Timeless Architectural Turnkey Execution</Heading>
          </div>

          <div className="pt-6">
            <Caption className="mb-2 block font-mono">
              Heading Level 2 (Cormorant Garamond / clamp 1.6rem - 2.5rem)
            </Caption>
            <Heading level={2}>Craft, Discipline and Structural Honesty</Heading>
          </div>

          <div className="pt-6">
            <Caption className="mb-2 block font-mono">
              Heading Level 3 (Plus Jakarta Sans / clamp 1.15rem - 1.5rem, weight 500)
            </Caption>
            <Heading level={3}>Turnkey Residential Execution in Bhopal</Heading>
          </div>

          <div className="pt-6">
            <Caption className="mb-2 block font-mono">
              Body (Plus Jakarta Sans / clamp 1rem - 1.125rem / 68ch max width)
            </Caption>
            <Body>
              Every competitor in this market uses template WordPress sites with stock photos. Our
              entire advantage is craft, speed, and real project storytelling. Under one roof, we
              bridge architectural vision with rigorous on-site turnkey delivery.
            </Body>
          </div>

          <div className="flex flex-wrap items-center gap-8 pt-6">
            <div>
              <Caption className="mb-1 block font-mono">
                Caption (0.8125rem sans text-greige)
              </Caption>
              <Caption>Arera Colony, Bhopal • Completed March 2024</Caption>
            </div>
            <div>
              <Caption className="mb-1 block font-mono">
                Label (0.6875rem sans uppercase tracking 0.08em)
              </Caption>
              <Label>Turnkey Architecture</Label>
            </div>
          </div>
        </div>
      </Section>

      {/* 4. Button Primitives */}
      <Section tone="paper">
        <Reveal>
          <Label className="mb-2 block text-accent">Interactive Primitives</Label>
          <Heading level={2} className="mb-4">
            Button Variants
          </Heading>
          <Body className="mb-10 text-greige">
            Two variants only. Primary features an animated 1px underline. Secondary is a 1px
            outline filling with charcoal on hover. Both support links and guarantee a 44px minimum
            target.
          </Body>
        </Reveal>

        <div className="flex flex-wrap items-center gap-8 border-b border-greige/30 pb-12">
          <div>
            <Caption className="mb-3 block font-mono">
              Primary Variant (Underline Origin Animation)
            </Caption>
            <Button variant="primary" href="#test">
              Start your project
            </Button>
          </div>

          <div>
            <Caption className="mb-3 block font-mono">Secondary Variant (1px Outline Fill)</Caption>
            <Button variant="secondary" href="#test">
              Explore Portfolio
            </Button>
          </div>
        </div>
      </Section>

      {/* 5. ProjectCard Component */}
      <Section tone="light">
        <Reveal>
          <Label className="mb-2 block text-accent">Editorial Showcase</Label>
          <Heading level={2} className="mb-4">
            ProjectCard Primitive
          </Heading>
          <Body className="mb-12 text-greige">
            Desktop hover triggers 1.03 image scale and meta line fade-in. On touch, meta line is
            permanently visible. Zero shadows, zero rounded corners, zero borders.
          </Body>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <ProjectCard
            slug="aranya-residence"
            title="The Aranya Residence"
            locality="Arera Colony"
            projectType="residential"
            heroImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
          />
          <ProjectCard
            slug="shahpura-villa"
            title="Shahpura Lake Villa"
            locality="Shahpura"
            projectType="luxury-home"
            heroImage="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop"
          />
          <ProjectCard
            slug="atelier-studio"
            title="Studio Workspace"
            locality="MP Nagar"
            projectType="office"
            heroImage="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop"
          />
        </div>
      </Section>

      {/* 6. MetaRow & MetaList */}
      <Section tone="paper">
        <Reveal>
          <Label className="mb-2 block text-accent">Structured Facts</Label>
          <Heading level={2} className="mb-4">
            MetaRow Definition List
          </Heading>
          <Body className="mb-10 text-greige">
            Definition-list style rows for project facts with 1px hairline rules in greige/30.
          </Body>
        </Reveal>

        <div className="max-w-xl">
          <MetaList>
            <MetaRow label="Location" value="Arera Colony, Bhopal" />
            <MetaRow label="Typology" value="Luxury Residence" />
            <MetaRow label="Scope" value="Turnkey Design & Execution" />
            <MetaRow label="Built-Up Area" value="4,800 sq.ft." />
            <MetaRow label="Year" value="2024" />
            <MetaRow label="Materials" value="Italian Travertine, Fluted Teak, Gunmetal Brass" />
          </MetaList>
        </div>
      </Section>

      {/* 7. FullBleedImage */}
      <Section tone="light">
        <Reveal>
          <Label className="mb-2 block text-accent">Architectural Scale</Label>
          <Heading level={2} className="mb-4">
            FullBleedImage Primitive
          </Heading>
          <Body className="mb-6 text-greige">
            Escapes the 1280px container to stretch across the full viewport width with a reserved
            21:9 or 16:9 ratio to eliminate Cumulative Layout Shift (CLS).
          </Body>
        </Reveal>

        <FullBleedImage
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop"
          alt="Full bleed architectural interior perspective"
          caption="Full-bleed architectural spatial perspective escaping container margins."
        />
      </Section>

      {/* 8. Dark Section Tone Demonstration */}
      <Section tone="dark">
        <Reveal>
          <Label className="mb-2 block text-accent">Contrast Inversion</Label>
          <Heading level={2} className="mb-4 text-bone">
            Dark Section Tone
          </Heading>
          <Body className="mb-8 text-bone/80">
            The Section wrapper automatically inverts text to bone on charcoal sections without
            manual overrides. Buttons and borders adapt accordingly.
          </Body>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" tone="dark" href="#test">
              Primary on Dark
            </Button>
            <Button variant="secondary" tone="dark" href="#test">
              Secondary on Dark
            </Button>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
