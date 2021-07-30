const colors = require("tailwindcss/colors");
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: true, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        cyan: colors.pink,
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
    fontFamily: {
      sans: ['nunito', ...defaultTheme.fontFamily.sans],
      serif: ["Merriweather", "serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require('@tailwindcss/typography'),],
};
