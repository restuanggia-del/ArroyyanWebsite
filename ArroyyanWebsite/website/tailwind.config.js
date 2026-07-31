/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0284c7",   // biru khas air minum, sesuaikan dengan brand Arroyyan
        secondary: "#0f172a",
      },
    },
  },
  plugins: [],
};
