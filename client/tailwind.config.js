/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0554f2",
        secondary: "#333",
        heading: "#0e2258",
        light: "#e8f7f7",
      },
      container: {
        width: "70%",
      },
    },
  },
  plugins: [],
};

// "react-scripts": "5.0.1",