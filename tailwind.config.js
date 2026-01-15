/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        whitesoft: "#fbfbfb",
        black: "#1B1D22",
        beige: "#F0EBE4",
        light: "#F3EDE6",
        accent: "#CE543A",
      },
    },
  },
  plugins: [],
};

