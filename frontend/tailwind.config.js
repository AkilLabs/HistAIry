/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./popup.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fffe',
          100: '#a6ffdd',
          200: '#8cfcd4',
          300: '#73f9cb',
          400: '#59f6c2',
          500: '#40f3b9',
          600: '#33c297',
          700: '#269175',
        },
        secondary: {
          50: '#ffffff',
          100: '#f0fffe',
          500: '#a6ffdd',
          600: '#8cfcd4',
        },
        accent: '#a6ffdd',
        text: {
          primary: '#000000',
          secondary: '#ffffff',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
