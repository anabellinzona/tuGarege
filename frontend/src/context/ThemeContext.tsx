"use client";

import { createContext, useState, useEffect, ReactNode } from "react";

interface ThemeContextType {
    theme: string;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    toggleTheme: () => {},
});

export default function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState("light");
    const [mounted, setMounted] = useState(false); // 👈 clave

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") || "light";
        setTheme(storedTheme);

        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(storedTheme);

        setMounted(true); // 👈 recién ahora el cliente está listo
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);

        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(newTheme);
    };

    // ⛔ evita que el server y client rendericen distinto
    if (!mounted) return null;

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
