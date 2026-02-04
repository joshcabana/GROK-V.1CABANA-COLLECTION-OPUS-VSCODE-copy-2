/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}", "./src/data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1a1a1a",
        stone: "#f6f3ef",
        sand: "#efe9e2",
        gold: "#d4af37",
        blush: "#f7f1ec",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 20px 40px rgba(15, 15, 15, 0.08)",
      },
    },
  },
  plugins: [],
};
