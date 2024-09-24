/** @type {import('tailwindcss').Config} */
const { scopedPreflightStyles, isolateInsideOfContainer } = require('tailwindcss-scoped-preflight');

module.exports = {
    content: ["./src/**/*.{html,js,ts,tsx,css}"],
    theme: {
        extend: {},
    },
    plugins: [scopedPreflightStyles({
        isolationStrategy: isolateInsideOfContainer(["#root"]),
    })],
}