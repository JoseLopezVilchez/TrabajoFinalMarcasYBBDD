/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [
    './src/**/*.html',
  ],
  content: [
    "./src/**/*.{html,js}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
  },
  darkMode: 'media',
  plugins: [
    require('flowbite/plugin')
  ]
}

