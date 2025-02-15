"use client";
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      // Light mode => gray background, dark text
      // Dark mode => black background, white text
      className="p-2 bg-gray-200 text-black dark:bg-gray-800 dark:text-white rounded"
    >
      Toggle {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
}
