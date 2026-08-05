import React from "react";
import { PiMoon, PiSunDim } from "react-icons/pi";

const Theme = () => {
  const [theme, setTheme] = React.useState("light");
  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={`px-4 py-2 rounded-2xl hover:cursor-pointer ${theme === "light" ? "bg-white text-purple-950" : "bg-purple-950 text-white"}`}
    >
      {theme === "light" ? <PiMoon /> : <PiSunDim />}
    </button>
  );
};

export default Theme;
