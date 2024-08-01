/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      maxHeight: {
        '120px': '120px'
      },
      maxWidth: {
        '3xl': '61rem',
        '5xl': '67rem',
        '8xl': '84rem',
      },
      margin: {
        '7.5px':'-7.5px'
      },
      width: {
        '46rem':'46rem',
      },
      inset:{
        '45px' : '58px'
      },
      colors: {
        'lightblack' : '#121212',
        'imageBG' : '#ee6dda',
        'buynowButton': '#fce477',
      },
      screens:{ 
        'xs': '384px',
        'xxs': '128px'
      },
      padding:{
        '5px': '80px'
      }
    },
  },
  plugins: [],
}

