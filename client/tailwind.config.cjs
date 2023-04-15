/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "Sans-serif"],
        lato: ["Lato", "Sans-serif"],
        robotomono: ["Roboto", "monospace"],
      },
      colors: {
        "dark-primary": "#1b1b1b",
        "dark-secondary": "#000000",
        "dark-highlight": "#a92344",
        "dark-heading-text": "#676162",
        "dark-paragraph-text": "#FFFFFF",
        "dark-text-on-primary":"#ffffff",
        "dark-text-hover-color": "#413f45",
        "dark-text-button-hover-color": "#413f45",
        "dark-selected-color": "#4a4163",
        "dark-button-color": "#b6ebd3",
        "dark-button-text-color": "#1b1b1b",
        "dark-button-hover-color": "#3f6b59",


        "light-primary": "#1b1b1b",
        "light-secondary": "#f15d64",
        "light-highlight": "#7a64ab",
        "light-heading-text": "#676162",
        "light-paragraph-text": "#676162",
        "light-text-on-primary":"#ffffff",
        "light-text-hover-color": "#413f45",
        "light-text-button-hover-color": "#413f45",
        "light-selected-color": "#4a4163",
        "light-button-color": "#b6ebd3",
        "light-button-text-color": "#1b1b1b",
        "light-button-hover-color": "#3f6b59",

        "accent-blue": "#1dcdfe",
        "accent-lightgreen": "#34f5c5",
        "accent-darkgreen": "#21d0b2",
        "background-grey": "#282828",
        "background-grey-dark": "#1a1a1a",
        "background-night": "#0a0a0a",
        "accent-cream": "#fbfcd4",
        "accent-s-yellow": "#ffdd02",
        "accent-m-yellow": "#fac402",

        carnation: "#f15d64", //pinkish red
        "cod-gray": "#1b1b1b", //almost black
        cruise: "#b6ebd3", //lightest green
        deluge: "#7a64ab", //purple
        "ocean-green": "#45b084", //darker green
        scorpion: "#676162", //light gray/brown
        "mulled-wine": "#4a4163", //purple gray / dark purple
        "mineral-green": "#3f6b59", //darkerer green
        "ship-gray": "#413f45", //dark gray
      },
    },
    screens: {
      sm: { max: "450px" },

      md: { min: "451px", max: "1023px" },

      lg: { min: "1024px", max: "1279px" },

      xl: { min: "1280px", max: "1535px" },

      "2xl": { min: "1536px" },
    },
  },

  plugins: [],
};
