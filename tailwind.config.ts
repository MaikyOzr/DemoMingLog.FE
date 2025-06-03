import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4f46e5",
        secondary: "#6366f1",
        moodGood: "#34d399",
        moodBad: "#f87171",
      },
    },
  },
  plugins: [],
};
export default config; 