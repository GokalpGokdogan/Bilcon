/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
    colors: {
      'main-bg': '#DEE2E7',
      'blue':'#5E6BDE',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'blue-dark': '#323EA6',
      'gray-dark': '#273444',
      'gray': '#979797',
      'gray-light': '#F5F5F5',
    },
    fontFamily: {
      sans: 'DM Sans',
      inter: 'Inter'
    },
  },
  },
  plugins: [],
}

