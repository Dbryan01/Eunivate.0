/** @type {import('tailwindcss').Config} */
  module.exports = {
  content: [
    "./index.html", 
    "./src/**/*.{js,jsx}"
  ],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#F5004F",
        secondary: "#FFEFEF",
        neutral: "#686D76",
        warn: "#FF8343",
        action: "#F9E400",
        danger: "#A02334"
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        opensans: ["Open Sans", "sans-serif"],
        DMsans: ["DM Sans", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
}
