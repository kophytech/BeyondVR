const withMT = require("@material-tailwind/react/utils/withMT");
/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#000000",
      blue: "#1a3d6e",
      lightBlue: "#2e6fc9",
      "tg-blue": {
        op: "#1a3d6e92",
        oph: "#1a3d6ecd",
      },
      red: "#f54266",
      fuschia: "#EF5DA8",
      tableText: "#45484E",
      tableHeadText: "#141414",
      "bw-pantone": "#ECF3FE",
      "bw-silver": "#FAFAFA",
      "bw-black": {
        100: "#45484E",
        200: "#2E303D",
        300: "#35363A",
        400: "#141414",
      },
    },
  },
  plugins: [],
});
