import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        bone: '#F6F3EE',
        paper: '#EDE9E2',
        greige: '#A8A29A',
        charcoal: '#1A1A18',
        'charcoal-2': '#24241F',
        accent: '#8A6A3B',
      },
      fontSize: {
        'fluid-display': [
          'clamp(2.25rem, 7vw, 5.5rem)',
          { lineHeight: '1.04', letterSpacing: '-0.02em' },
        ],
        'fluid-h1': ['clamp(2rem, 5vw, 3.75rem)', { lineHeight: '1.08' }],
        'fluid-h2': ['clamp(1.5rem, 3.2vw, 2.35rem)', { lineHeight: '1.15' }],
        'fluid-h3': ['clamp(1.125rem, 2vw, 1.45rem)', { lineHeight: '1.3' }],
        'fluid-body': ['clamp(1rem, 1.2vw, 1.125rem)', { lineHeight: '1.65' }],
        'ui-caption': ['0.8125rem', { lineHeight: '1.4' }],
        'ui-label': ['0.8125rem', { lineHeight: '1.4', letterSpacing: '0.08em' }],
        xs: ['0.8125rem', { lineHeight: '1.4' }],
      },
      maxWidth: {
        container: '1280px',
        content: '68ch',
      },
      borderRadius: {
        DEFAULT: '2px',
        sm: '2px',
        none: '0px',
      },
    },
  },
  plugins: [],
};

export default config;
