import React from 'react'
import { PiSunDim, PiMoon } from "react-icons/pi";

const ThemeToggle = () => {

    const [theme, setTheme] = React.useState(() => {
        // Pega o valor salvo no localStorage ou light como padrão
        return localStorage.getItem("theme") || "light"
    });

    React.useEffect(() => {
        // Salvar tema no localStorage (navegador)
        localStorage.setItem("theme", theme)

        if (theme === "dark") {
            // Pegar tag HTML e adicionar classe "dark"
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    return (
        <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="
                h-10 w-10 grid place-items-center rounded-full hover:cursor-pointer text-lg
                border border-purple-200 dark:border-white/15 bg-field
                text-purple-700 dark:text-purple-200
                hover:brightness-95 dark:hover:brightness-125
            "
        >
            {theme === "light" ? <PiMoon /> : <PiSunDim />}
        </button>
    )
}

export default ThemeToggle
