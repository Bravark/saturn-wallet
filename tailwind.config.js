/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#202020",
        primary: "#797979",
        accent: "#DAA521",
        // foreground: "var(--foreground)",
      },
      backgroundImage: {
        "gold-gradient": `linear-gradient(to right, #FFDF00, #F6D108, #EDC211, #E3B419, #DAA521)`,
      },
    },
  },
  plugins: [],
};
