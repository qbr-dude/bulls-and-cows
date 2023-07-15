/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "main": "rgb(167, 201, 87)",
        "medium-main": "rgb(106, 153, 78)",
        "dark-main": "rgb(56, 102, 65)",
        "second": "rgb(242, 232, 207)",
        "third": "rgb(188, 71, 73)",
      }
    },
  },
  plugins: [],
}

