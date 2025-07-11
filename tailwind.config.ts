import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",    // Sky Blue / Indigo
        secondary: "#10B981",  // Emerald Green
        accent: "#F59E0B",     // Amber / Warm Yellow
        bg: "#F9FAFB",         // Light Gray Background
        text: "#111827",       // Dark Gray Text
        muted: "#6B7280",      // Muted Gray
        hover: "#2563EB",      // Indigo Hover
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
