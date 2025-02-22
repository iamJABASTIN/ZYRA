/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        kenBurns: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '50%': { transform: 'scale(1.05) translate(-10px, -10px)' },
          '100%': { transform: 'scale(1) translate(0, 0)' },
        },
        textEntrance: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '80%': { opacity: 1, transform: 'translateY(-5px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        kenBurns: 'kenBurns 15s ease-in-out infinite',
        textEntrance: 'textEntrance 1.5s ease forwards',
      },
      colors: {
        primary: "#1098F7",
        black: "#0A0A0A",
        white: "#F5F5F5",
      },
    },
  },
  plugins: [],
};
