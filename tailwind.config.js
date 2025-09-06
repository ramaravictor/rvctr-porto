// tailwind.config.js

import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-jakarta)", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};

export default config;
