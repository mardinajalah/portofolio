"use client";
import { Heart } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

const LikeButton = () => {
  const [liked, setLiked] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setLiked(!liked)}
      className={`relative flex items-center w-24 h-10 rounded-full transition-colors duration-500 overflow-hidden border shadow-md ${
        liked
          ? "bg-red-500/70 border-red-600/40 pl-2"
          : isDark
          ? "bg-gray-800/20 border-gray-700/40 pl-11"
          : "bg-white/20 border-white/30 pl-11"
      }`}
    >
      {/* Ikon bulat */}
      <div
        className={`absolute top-1 left-1 w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-md transform transition-transform duration-500 ${
          liked ? "translate-x-14" : "translate-x-0"
        }`}
      >
        <Heart
          size={18}
          className={`${liked ? "text-red-500 fill-red-500" : "text-gray-700"}`}
        />
      </div>

      {/* Label */}
      <span
        className={`text-xs font-bold transition-colors duration-500 ${
          liked ? "text-white" : isDark ? "text-white" : "text-gray-700"
        }`}
      >
        {liked ? "Liked 21" : "Like 20"}
      </span>
    </button>
  );
};

export default LikeButton;