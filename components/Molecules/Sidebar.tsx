'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import DarkModeToggle from '../Atoms/DarkModeToggle';
import LikeButton from '../Atoms/LikeButton';
import Link from 'next/link';
import { useTheme } from "next-themes";

const Sidebar = () => {
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
  
    if (!mounted) {
      return (
        <div className="w-[250px] h-full animate-pulse">
          <div className="rounded-full bg-gray-300 w-[150px] h-[150px] mx-auto mb-6"></div>
          <div className="space-y-4">
            <div className="h-10 bg-gray-300 rounded-full w-24 mx-auto"></div>
            <div className="h-8 bg-gray-300 rounded-full w-full"></div>
            <div className="h-8 bg-gray-300 rounded-full w-full"></div>
            <div className="h-8 bg-gray-300 rounded-full w-full"></div>
            <div className="h-8 bg-gray-300 rounded-full w-full"></div>
          </div>
        </div>
      );
    }

  return (
    <div
      className={`w-[250px] h-full p-6 flex flex-col gap-6 items-center transition-colors
        ${theme === 'light'
          ? 'shadow shadow-gray-300'
          : 'shadow shadow-gray-700'}
      `}
    >
      {/* Profile */}
      <div className="rounded-full overflow-hidden flex justify-center w-[150px] h-[150px]">
        <Image
          alt="profile"
          src="/profile.png"
          width={200}
          height={200}
          priority
        />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 w-full justify-between capitalize">
        <DarkModeToggle />
        <LikeButton />
      </div>

      {/* Navigation */}
      <div className="w-full flex flex-col gap-2">
        <Link
          href="/"
          className={`p-2 rounded-xl transition-colors ${
            theme === 'light' ? 'hover:bg-gray-300' : 'hover:bg-gray-800'
          }`}
        >
          Home
        </Link>
        <Link
          href="/about"
          className={`p-2 rounded-xl transition-colors ${
            theme === 'light' ? 'hover:bg-gray-300' : 'hover:bg-gray-800'
          }`}
        >
          About
        </Link>
        <Link
          href="#"
          className={`p-2 rounded-xl transition-colors ${
            theme === 'light' ? 'hover:bg-gray-300' : 'hover:bg-gray-800'
          }`}
        >
          Project
        </Link>
        <Link
          href="#"
          className={`p-2 rounded-xl transition-colors ${
            theme === 'light' ? 'hover:bg-gray-300' : 'hover:bg-gray-800'
          }`}
        >
          Certificate
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
