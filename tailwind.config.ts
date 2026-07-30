import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: "#7B1E3A",
        gold: "#B8935A",
        ivory: "#FBF6EC",
        leaf: "#4A5D3A",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "serif"],
        script: ["var(--font-great-vibes)", "cursive"],
      },
    },
  },
  plugins: [],
};
export default config;
