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
    
  },
  plugins: [],
}
