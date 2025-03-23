/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'white': "var(--white)",
        'dark-gray': "var(--foreground)",
        'light-gray': "var(--light-gray)",
        'dark-green': "var(--dark-green)",
        'light-green': "var(--light-green)",
        'active-green': "var(--active-green)",
        'yellow': "var(--yellow)",
        'active-yellow': "var(--active-yellow)",
        'light-blue': "var(--light-blue)",
      },
      fontFamily: {
        'poppins': 'var(--mainfont)',
      },
      animation: {
        'scroll': 'scroll 40s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-250px * 4))' },
        },
      }
    },
  },
  plugins: [],
};