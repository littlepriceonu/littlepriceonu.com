/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    backgroundSize: {
      gradientSize: '401% 401%',
      miniGradientSize: '40% 40%'
    },
    extend: {
      keyframes: {
        scrollingGradientframes: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%' : { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        }
      },

      animation: {
        scrollingGradient: 'scrollingGradientframes 15s ease infinite',
        fastScrollingGradient: 'scrollingGradientframes 5s ease infinite'
      },

      height: {
        headerHeight: '10%',
      }
    },
  },
    plugins: [
      require('tailwind-scrollbar'),
    ],
}

// Commmand to start tailwind: npx tailwindcss -i ./src/styles.css -o ./dist/output.css --watch