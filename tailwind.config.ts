import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1a1a1a',
        stone: '#f6f3ef',
        sand: '#efe9e2',
        gold: '#d4af37',
        white: '#ffffff',
        sage: '#9caf88',
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'serif'],
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        shake: 'shake 0.5s ease-in-out',
        shimmer: 'shimmer 1.5s infinite',
      },
      boxShadow: {
        soft: '0 20px 40px rgba(15, 15, 15, 0.08)',
      },
    },
  },
  plugins: [],
}

export default config
