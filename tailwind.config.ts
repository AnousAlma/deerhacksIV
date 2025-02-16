import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'], // Add this line
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background))", // Use rgb() for CSS variables
        foreground: "rgb(var(--foreground))", // Use rgb() for CSS variables
        "muted-foreground": "rgb(var(--muted-foreground))", // Add muted-foreground
      },
    },
  },
  plugins: [],
} satisfies Config;