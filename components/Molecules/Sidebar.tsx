'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import DarkModeToggle from '../Atoms/DarkModeToggle';
import LikeButton from '../Atoms/LikeButton';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { SkeletonSidebar } from './Skeleton';

const Sidebar = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const isDark = theme === 'dark';

  const dataNavigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Project', href: '/project' },
    { name: 'Certificate', href: '/certificate' },
    { name: 'Github', href: '/github' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <SkeletonSidebar />;
  }

  return (
    <div
      className={`w-[220px] sm:w-[250px] h-full p-4 sm:p-6 flex flex-col gap-3 items-center transition-colors
        ${isDark ? 'shadow shadow-gray-700' : 'shadow shadow-gray-300'}
      `}
    >
      {/* Profile */}
      <div className='rounded-full overflow-hidden flex justify-center w-[100px] h-[100px] mt-2'>
        <Image
          alt='profile'
          src='/profile.png'
          width={200}
          height={200}
          priority
        />
      </div>

      {/* Name */}
      <div className='flex items-center justify-center gap-1'>
        <h1 className='text-2xl font-bold text-center'>Mardin</h1>
        <Image
          alt='centang biru'
          src='/bluecheck.png'
          height={20}
          width={20}
        />
      </div>

      {/* Controls */}
      <div className='flex items-center gap-2 w-full justify-between capitalize border-b border-gray-300 dark:border-gray-700/40 pb-4'>
        <DarkModeToggle />
        <LikeButton />
      </div>

      {/* Navigation */}
      <div className='w-full flex flex-col gap-2 mt-5'>
        {dataNavigation.map((nav, index) => {
          const isActive = pathname === nav.href;

          return (
            <Link
              key={index}
              href={nav.href}
              className={`p-2 font-semibold rounded-xl transition-colors
                ${isActive ? (isDark ? 'bg-gray-800 text-white' : 'bg-gray-300 text-black') : isDark ? 'hover:bg-gray-800 text-gray-200' : 'hover:bg-gray-300 text-gray-700'}
              `}
            >
              {nav.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
