/** @type {import('tailwindcss').Config} */
const {
  scopedPreflightStyles,
  isolateInsideOfContainer,
} = require("tailwindcss-scoped-preflight");

module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx,css}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        dim: "var(--color-dim)",
        light: "var(--color-light)",
        dark: "var(--color-dark)",
        accent: "var(--color-accent)",
      },
    },
  },
  plugins: [
    scopedPreflightStyles({
      isolationStrategy: isolateInsideOfContainer(["#root"]),
    }),
  ],
};
