/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
    },
  },
    plugins: [
      require('tailwind-scrollbar'),
    ],
}

// Commmand to start tailwind: npx tailwindcss -i ./src/styles.css -o ./dist/output.css --watch