/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#034b26",
          greenHover: "#02371c",
          navy: "#013f5e",
          navyHover: "#012d44",
          yellow: "#ffbf00",
          blue: "#2b57a2",
          whatsapp: "#25d366",
          dark: "#212529",
          muted: "#666666",
          light: "#f8f9fa",
          border: "#ebebeb",
        },
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "Outfit", "sans-serif"],
        display: ["var(--font-dmsans)", "DM Sans", "sans-serif"],
        body: ["var(--font-poppins)", "Poppins", "sans-serif"],
      },
      maxWidth: {
        container: "1280px",
      },
      boxShadow: {
        card: "0 2px 10px rgba(0,0,0,0.06)",
        cardHover: "0 8px 25px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};
