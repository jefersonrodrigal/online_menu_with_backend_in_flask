/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily:{
        'sans': ['Roboto', 'sans-serif']
      },
      backgroundImage: {
        "home": "url('/static/img/bg.png')"
      }
    },
  },
  plugins: [],
}

