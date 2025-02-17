/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1098F7',
        black: '#0A0A0A',
        white: '#F5F5F5' 
      }
    },
  },
  plugins: [],
}