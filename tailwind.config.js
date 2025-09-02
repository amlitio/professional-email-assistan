/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin': 'spin 1s linear infinite',
      },
      backdropBlur: {
        'xs': '2px',
      },
      colors: {
        slate: {
          950: '#0a0f1e',
        }
      }
    },
  },
  plugins: [],
}
