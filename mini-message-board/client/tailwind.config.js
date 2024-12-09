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
        neue: ["neue","sans-serif"]
      },
    },
  },
  plugins: [],
}

