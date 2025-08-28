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
          50: '#f0f2ff',
          100: '#e5e9ff',
          500: '#667eea',
          600: '#5a6fd8',
          700: '#4f5bc7',
        },
        secondary: {
          500: '#764ba2',
          600: '#6b4190',
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
