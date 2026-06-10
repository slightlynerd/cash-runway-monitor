import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1F2937",
        mint: "#34D399",
        coral: "#FB7185",
        sand: "#F6F1E9"
      },
      boxShadow: {
        panel: "0 16px 30px -20px rgba(20, 18, 40, 0.45)"
      }
    }
  },
  plugins: []
} satisfies Config;
