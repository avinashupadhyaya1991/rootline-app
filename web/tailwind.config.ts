import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        hanken: ['var(--font-hanken)', 'system-ui', 'sans-serif'],
      },
      colors: {
        rl: {
          dark:       '#0D4A28',
          mid:        '#1A6B3C',
          light:      '#E8F4ED',
          lighter:    '#F2FAF5',
          gold:       '#9A6B00',
          'gold-bg':  '#FDF3DC',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
