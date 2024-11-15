import daisyui from "daisyui"
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        myfont: "Montserrat"
      }
    },
  },
  plugins: [daisyui],
}