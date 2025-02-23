import type { Config } from "tailwindcss";

export default {
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
        'dark-green': "var(--dark-green)",
        'light-green': "var(--light-green)",
        'active-green': "var(--active-green)"
      },
      fontFamily: {
        'poppins': 'var(--mainfont)',
      }

    },
  },
  plugins: [],
} satisfies Config;
