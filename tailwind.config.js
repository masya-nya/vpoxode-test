/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}', './index.html'],
  prefix: 't-',
  theme: {
    extend: {
      colors: {
        primary: '#3490dc',
        secondary: '#f1c40f',
        tertiary: '#e74c3c',
      },
    },
  },
  plugins: [require('tailwindcss'), require('autoprefixer')],
};
