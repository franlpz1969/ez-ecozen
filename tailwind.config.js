/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './**/*.{js,ts,jsx,tsx}',
    '!./node_modules/**',
    '!./dist/**',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#417D7A',
        secondary: '#C8A55B',
        accent: '#C8A55B',
        dark: '#332E27',
        light: '#F4F0C680',
        background: '#FAF9F3',
      },
      fontFamily: {
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial'],
        serif: ['Cinzel', 'serif'],
      },
    },
  },
  plugins: [],
};