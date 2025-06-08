module.exports = {
  style: {
    postcss: {
      plugins: [
        require('@tailwindcss/postcss')('./tailwind.config.js'),
        require('autoprefixer'),
      ],
    },
  },
}; 