/** @type {import('tailwindcss').Config} */
const baseConfig = require('../../config/tailwind/base.config');

module.exports = {
  presets: [baseConfig],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
};
