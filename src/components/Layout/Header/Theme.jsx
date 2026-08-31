import React from "react";
import { PiMoon, PiSunDim } from "react-icons/pi";

const Theme = () => {
  const [theme, setTheme] = React.useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  React.useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
   
  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={`px-4 py-2 rounded-2xl hover:cursor-pointer ${theme === "light" ? "bg-white text-purple-950" : "bg-purple-400 text-white"}`}
    >
      {theme === "light" ? <PiMoon /> : <PiSunDim />}
    </button>
  );
};

export default Theme;
