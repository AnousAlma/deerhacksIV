"use client";
import { useState, useEffect, useCallback } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

function persistItem(key: string, value: string) {
    localStorage.setItem(key, value)
    return value
}

function usePersistentState(key: string, initialValue: string): [string, (newState: string) => string] {
    const [state, setState] = useState(
        () => localStorage.getItem(key) || persistItem(key, initialValue)
    )

    const setStateAndPersist = useCallback(
        (newState: string) => {
            setState(newState)
            return persistItem(key, newState)
        },
        [key, setState]
    )
    return [state, setStateAndPersist]
}


export default function ThemeToggle() {
    const [theme, setTheme] = usePersistentState("theme", "light");

    useEffect(() => {
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