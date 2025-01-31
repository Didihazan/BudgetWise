/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'gan': ['Gan CLM Bold', 'sans-serif'],
        'vag': ['VAG Rounded Bold', 'sans-serif'],
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at center, rgba(255, 255, 255, 0.2), transparent)',
      },
    },
  },
  plugins: [],
}