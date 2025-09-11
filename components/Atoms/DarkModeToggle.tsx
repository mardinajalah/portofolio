"use client";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative flex items-center w-24 h-10 rounded-full transition-colors duration-500 overflow-hidden border shadow-md ${
        isDark ? "bg-gray-800/20 border-gray-700/40 pl-4" : "bg-white/20 border-white/30 pl-12"
      }`}
    >
      <div
        className={`absolute top-1 left-1 w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-md transform transition-transform duration-500 ${
          isDark ? "translate-x-14" : "translate-x-0"
        }`}
      >
        {isDark ? (
          <Moon className="text-gray-800" size={18} />
        ) : (
          <Sun className="text-yellow-500" size={18} />
        )}
      </div>

      <span
        className={`text-xs font-bold transition-colors ${
          isDark ? "text-white" : "text-gray-700"
        }`}
      >
        {isDark ? "Dark" : "Light"}
      </span>
    </button>
  );
};

export default DarkModeToggle;
