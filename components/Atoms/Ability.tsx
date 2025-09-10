"use client";

import { useTheme } from "next-themes";

interface AbilityProps {
  target: string;
  title: string;
}

const Ability = ({ target, title }: AbilityProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`
        p-4 rounded-xl 
        backdrop-blur-xl border 
        ${isDark ? "bg-gray-800/20 border-gray-700/40" : "bg-white/20 border-white/30"}
        shadow-md cursor-default
      `}
    >
      <h1 className="font-semibold">{title}</h1>
      <div className="mt-2 flex items-center gap-4 justify-between">
        {/* Background bar */}
        <div
          className={`mt-2 w-full h-4 rounded-full overflow-hidden ${
            isDark ? "bg-gray-700/50" : "bg-gray-200/50"
          }`}
        >
          {/* Progress bar */}
          <div
            style={{ width: target }}
            className={`h-4 rounded-full ${
              isDark ? "bg-blue-400" : "bg-blue-500"
            } transition-all`}
          />
        </div>
        {/* Label persen */}
        <p>{target}</p>
      </div>
    </div>
  );
};

export default Ability;
