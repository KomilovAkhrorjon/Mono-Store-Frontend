const animate = require("tailwindcss-animate")
const colors = require("tailwindcss/colors")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx,vue}',
    './pages/*.{ts,tsx,vue}',
    './components/**/**/*.{ts,tsx,vue}',
    './components/**/*.{ts,tsx,vue}',
    './components/*.{ts,tsx,vue}',
    './layouts/**/*.{ts,tsx,vue}',
    './layouts/*.{ts,tsx,vue}',
    './app/**/*.{ts,tsx,vue}',
    './app/*.{ts,tsx,vue}',
    './src/**/*.{ts,tsx,vue}',
    './src/*.{ts,tsx,vue}',
    './*.{ts,tsx,vue}',
  ],
  prefix: "",
  theme: {
    colors: {
      mg: {
        50: '#F2F2F2',
        100: '#E6F5F0',
        200: '#C0E8D9',
        300: '#9ADBC2',
        400: '#02c3bd',
        500: '#00B9AE',
        600: '#02C3BD',
        700: '#009F93',
        800: '#037171',
        900: '#03312E',
      },
      mr: {
        100: '#fc9ca2',
        200: '#fb747d',
        300: '#fa4c58',
        400: '#f92432',
        500: '#e30613',
        600: '#c70512',
        700: '#9f040e',
        800: '#77030b',
        900: '#500207',
      },
      ...colors,
    },
    screens: {
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      zIndex: (() => {
        const zIndex = {};
        for (let i = 1; i <= 100; i++) {
          zIndex[i] = `${i}`;
        }
        return zIndex;
      })(),
      keyframes: {
        "accordion-down": {
          from: {height: 0},
          to: {height: "var(--radix-accordion-content-height)"},
        },
        "accordion-up": {
          from: {height: "var(--radix-accordion-content-height)"},
          to: {height: 0},
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animate],
}
