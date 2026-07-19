import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canopy: {
          DEFAULT: "#24402A",
          light: "#345A3C",
          dark: "#152819",
        },
        moss: {
          DEFAULT: "#5B7F5E",
          light: "#7C9C7E",
        },
        clay: {
          DEFAULT: "#B5502B",
          light: "#CC6B44",
          dark: "#8E3D20",
        },
        paper: "#F1F2EA",
        sand: "#E4E1D3",
        ink: "#1B1F17",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      borderRadius: {
        card: "14px",
        tag: "6px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(27, 31, 23, 0.06), 0 4px 16px rgba(27, 31, 23, 0.06)",
        pop: "0 8px 30px rgba(27, 31, 23, 0.12)",
      },
      backgroundImage: {
        "vine-divider": "linear-gradient(90deg, transparent, currentColor, transparent)",
      },
    },
  },
  plugins: [],
};

export default config;
