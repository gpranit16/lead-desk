/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#050505',
        surface: '#090909',
        card: '#101010',
        elevated: '#151515',
        border: '#232323',
        primary: '#F8F8F8',
        secondary: '#A1A1AA',
        muted: '#71717A',
        blue: '#3B82F6',
        purple: '#7C3AED',
        green: '#22C55E',
        orange: '#F59E0B',
        red: '#EF4444',
      },
      fontFamily: {
        display: ['"Clash Display"', 'sans-serif'],
        sans: ['"General Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        card: '18px',
        button: '16px',
        input: '16px',
        sidebar: '20px',
      },
      spacing: {
        '18': '72px',
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'counter': 'counter 2s ease-out forwards',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'grid-pulse': 'gridPulse 4s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        gridPulse: {
          '0%, 100%': { opacity: 0.03 },
          '50%': { opacity: 0.07 },
        },
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
