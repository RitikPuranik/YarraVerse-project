/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
      },
      dropShadow: {
        glow: "0 0 10px rgba(255, 255, 255, 0.6)",
      },
      keyframes: {
        slideShrinkLeft: {
          '0%': { transform: 'translateX(0) scale(1)' },
          '100%': { transform: 'translateX(-120px) scale(0.85)' },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        blink: {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: '#ffa500' },
        },
        glow: {
          '0%, 100%': { textShadow: '0 0 8px #fff' },
          '50%': { textShadow: '0 0 20px #ffaa33' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideFadeUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        }
      },
      animation: {
        'slide-shrink-left': 'slideShrinkLeft 1.5s ease-out forwards',
        typewriter: 'typewriter 3s steps(40, end) 1s forwards',
        blink: 'blink 1s step-end infinite',
        glow: 'glow 2s ease-in-out infinite',
        'fade-in': 'fadeIn 1s ease-in-out',
        'slide-fade-up': 'slideFadeUp 1s ease-out',
      },
    },
  },
  plugins: [],
};
