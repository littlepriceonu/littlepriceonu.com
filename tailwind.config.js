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
        scrollingGradientFrames: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%' : { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        straightScrollingGradientFrames: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%'}
        }
      },

      animation: {
        scrollingGradient: 'scrollingGradientFrames 15s ease infinite',
        fastScrollingGradient: 'scrollingGradientFrames 5s ease infinite',
        straightScrollingGradient: 'straightScrollingGradientFrames 5s linear infinite'
      },

      height: {
        headerHeight: '10%',
      }
    },
  },
    plugins: [
      require('tailwind-scrollbar'),
      require('tailwindcss-3d'),
    ],
}

// Commmand to start tailwind: npx tailwindcss -i ./src/styles.css -o ./dist/output.css --watch