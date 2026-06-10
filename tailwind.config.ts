import type { Config } from 'tailwindcss';

/**
 * Classic & elegant palette:
 *  - "parchment" tones for light mode (aged paper, marble, gold leaf)
 *  - "midnight" tones for dark mode (deep ink blue, bronze, candlelight gold)
 */
const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#fdfaf3',
          100: '#f8f1e0',
          200: '#efe2c2',
          300: '#e2cd9b',
          400: '#d2b272',
          500: '#c49a52',
        },
        midnight: {
          700: '#1d2433',
          800: '#151b28',
          900: '#0e1320',
          950: '#090d16',
        },
        gold: {
          300: '#e8c87a',
          400: '#d9ad4f',
          500: '#c2922f',
          600: '#a3771f',
        },
        ink: '#2b2117',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'Georgia', 'serif'],
      },
      boxShadow: {
        plinth: '0 24px 48px -16px rgb(0 0 0 / 0.35)',
        card: '0 8px 30px rgb(0 0 0 / 0.08)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out both',
        'fade-in': 'fadeIn 1s ease-out both',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
