/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Jost', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
      },
      colors: {
        cream: '#FBF9F6',
        sand: '#F3ECE3',
        espresso: '#2C2520',
        terracotta: '#A97C65',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
};
