module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0a192f',
          800: '#172a45',
          700: '#2a4365',
        },
        cyan: {
          500: '#06b6d4',
          400: '#22d3ee',
          300: '#67e8f9',
        },
        violet: {
          900: '#4c1d95',
          800: '#5b21b6',
        }
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}