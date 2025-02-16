"use client";
import { useState, useEffect, useCallback } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';


export default function ThemeToggle() {
    const [theme, setTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
            setTheme(storedTheme as "light" | "dark");
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);


    return (
        <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            {theme === "light" ? (
                <FiMoon 
                    className="w-7 h-7 text-white hover:text-gray-400" 
                    strokeWidth={1.5}
                />
            ) : (
                <FiSun 
                    className="w-7 h-7 text-yellow-400 hover:text-yellow-300" 
                    strokeWidth={1.5}
                />
            )}
        </button>
    );
}