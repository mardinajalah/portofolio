'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import DarkModeToggle from '../Atoms/DarkModeToggle';
import LikeButton from '../Atoms/LikeButton';
import Link from 'next/link';
import { useTheme } from 'next-themes';

const Sidebar = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  const isDark = theme === 'dark';

  const dataNavigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Project', href: '#' },
    { name: 'Certificate', href: '#' },
    { name: 'Github', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className='w-[250px] h-full animate-pulse'>
        <div className='rounded-full bg-gray-300 w-[150px] h-[150px] mx-auto mb-6' />
        <div className='space-y-4'>
          <div className='h-10 bg-gray-300 rounded-full w-24 mx-auto' />
          <div className='h-8 bg-gray-300 rounded-full w-full' />
          <div className='h-8 bg-gray-300 rounded-full w-full' />
          <div className='h-8 bg-gray-300 rounded-full w-full' />
          <div className='h-8 bg-gray-300 rounded-full w-full' />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-[250px] h-full p-6 flex flex-col gap-3 items-center transition-colors
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
        {dataNavigation.map((nav, index) => (
          <Link
            key={index}
            href={nav.href}
            className={`p-2 font-semibold rounded-xl transition-colors ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-300'}`}
          >
            {nav.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
