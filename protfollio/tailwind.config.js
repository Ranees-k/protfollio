/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#F3F1ED',
        ink: '#1C1B1A',
        muted: '#6B6560',
        accent: '#2F4A3F',
        'accent-soft': '#3D5C4E',
        line: '#D9D4CC',
        surface: '#FFFEFB',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Outfit', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        elegant: '0.22em',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(1.25rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'line-grow': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        'status-pulse': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.55', transform: 'scale(0.85)' },
        },
        'status-ring': {
          '0%': { opacity: '0.45', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(2.4)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.9s ease-out both',
        'fade-in': 'fade-in 1s ease-out both',
        'line-grow': 'line-grow 1s ease-out both',
        'status-pulse': 'status-pulse 2s ease-in-out infinite',
        'status-ring': 'status-ring 2s ease-out infinite',
      },
    },
  },
  plugins: [],
}
