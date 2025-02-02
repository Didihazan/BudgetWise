/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'nav-break': '900px',
      },
      fontFamily: {
        'heebo': ['Heebo', 'sans-serif'],
      },
    },
    plugins: [],
  }
}