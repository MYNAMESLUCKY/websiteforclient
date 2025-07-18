/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neutral': {
          900: '#000', // true black for dark mode backgrounds
          50: '#fff',  // true white for light mode backgrounds
        },
        'white': '#fff',
        'black': '#000',
      },
    },
  },
  plugins: [],
}

