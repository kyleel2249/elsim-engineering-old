import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        steel: {
          950: '#070B14',
          900: '#0B1220',
          800: '#101A2C',
          700: '#182338',
          600: '#233350',
          500: '#3A4C6E',
          400: '#64748B',
          300: '#94A3B8',
          200: '#C4CEDB',
          100: '#E6EDF5'
        },
        cyan: {
          400: '#22D3EE',
          500: '#0FB8D6',
          600: '#0A93AE'
        },
        copper: {
          400: '#F0A868',
          500: '#E08A3C',
          600: '#B96A24'
        }
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)']
      },
      backgroundImage: {
        blueprint:
          'linear-gradient(rgba(34,211,238,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.06) 1px, transparent 1px)'
      },
      backgroundSize: {
        grid: '48px 48px',
        'grid-sm': '16px 16px'
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 18s linear infinite',
        marquee: 'marquee 32s linear infinite'
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      }
    }
  },
  plugins: []
};

export default config;
