// tailwind.config.js

import defaultTheme from "tailwindcss/defaultTheme";

// Colors come from CSS variables (see globals.css) so they switch with dark mode
// and still support opacity modifiers like `bg-paper/85`.
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: token("paper"),
        ink: token("ink"),
        muted: token("muted"),
        line: token("line"),
        accent: token("accent"),
        brand: "#2D9F5E",
        // Page-transition curtain (template.tsx)
        night: token("night"),
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],
        display: ["var(--font-display)", ...defaultTheme.fontFamily.sans],
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "marquee-up": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        // Duration is set per column with an inline style.
        "marquee-up": "marquee-up 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
