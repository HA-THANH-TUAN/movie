/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'cart-movie-mobile': "var(--cart-movie-mobile)",
        'cart-movie': "var(--cart-movie)"
      }
    },
  },
  plugins: [],
}