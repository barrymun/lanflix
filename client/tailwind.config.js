/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '0px',
      },
      colors: {
        'dark-mode-gray': '#111111',
      },
      height: {
        'header': '3.25rem',
        'side-menu': 'calc(100vh - 6rem)',
      },
      width: {
        'side-menu': '16rem',
      }
    },
  },
  plugins: [],
}

