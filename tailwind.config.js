/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%": {
            "box-shadow": "-38px -6px, -14px 6px,  14px -6px",
          },
          "33%": {
            "box-shadow": "-38px 6px, -14px -6px,  14px 6px",
          },
          "66%": {
            " box-shadow": "-38px -6px, -14px 6px, 14px -6px",
          },
          "100%": {
            " box-shadow": "-38px 6px, -14px -6px, 14px 6px",
          },
        },
      },
      animation: {
        wiggle: "wiggle 1s linear infinite alternate",
      },
    },
  },
  plugins: [],
}

