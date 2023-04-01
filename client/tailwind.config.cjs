/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'Sans-serif'],
        'lato': ['Lato', 'Sans-serif']

      },
      colors:{
        'background': '#2f455c',
        'accent-blue':'#1dcdfe',
        'accent-lightgreen':'#34f5c5',
        'accent-darkgreen': '#21d0b2',
        'background-grey':'#151515',
        'background-grey-dark':'#060606',
        'background-night':'#0a0a0a',
        'accent-cream':'#fbfcd4',
        'accent-s-yellow':'#ffdd02',
        'accent-m-yellow':'#fac402'
        
  
      }
    },
    screens: {
      'sm': {'max': '450px'},
      // => @media (min-width: 640px and max-width: 767px) { ... }

      'md': {'min': '451px', 'max': '1023px'},
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      'lg': {'min': '1024px', 'max': '1279px'},
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      'xl': {'min': '1280px', 'max': '1535px'},
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      '2xl': {'min': '1536px'},
      // => @media (min-width: 1536px) { ... }
    },
    
  },
  plugins: [],
}
