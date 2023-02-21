/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'background': '#2f455c',
        'accent-blue':'#1dcdfe',
        'accent-lightgreen':'#34f5c5',
        'accent-darkgreen': '#21d0b2',
        'background-grey':'#282a36',
        'background-night':'#0a0a0a',
        'accent-cream':'#6272a4',
        'accent-s-yellow':'#f1fa8c',
        'accent-m-yellow':'#f1fa52'
        
  
      }
    },
    
  },
  plugins: [],
}
