/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,css,tsx,jsx}',
    "./App.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}

