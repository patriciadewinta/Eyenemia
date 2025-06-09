/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        'dark-purple': '#0F0824',
        'medium-purple': '#2D1B58',
        'light-purple': '#6B46C1',
        'turquoise': '#A8E6E2',
        'coral': '#FFA9A3',
        'white-gray': '#F5F5F7',
      },
      boxShadow: {
        'glow': '0 0 15px 5px rgba(107, 70, 193, 0.2)',
      },
    },
  },
  plugins: [],
};