/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        grotesk: ["Space Grotesk", "sans-serif"],
        host: ["Host Grotesk", "sans-serif"],
        neue: ["neue","sans-serif"],
        codesaver : ["code-saver","sans-serif"]
      },
      colors: {
          "filter" : "hsla(0, 100%, 0%,0.6)"
      },
      screens: {
        "990" : '990px'
      }
    },
  },
  plugins: [],
}

