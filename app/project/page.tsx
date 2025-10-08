'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { SkeletonProjectPage } from '@/components/Molecules/Skeleton';

const Project = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <SkeletonProjectPage />;
  }

  return (
    <div className='w-full flex flex-col items-center sm:items-start gap-10 px-4'>
      {/* Card Project */}
      <div className='w-full sm:w-[400px] overflow-hidden rounded-lg shadow-md'>
        {/* Image */}
        <div className='w-full'>
          <Image
            src='/assets/image-projects/dashboard-web-kasir.png'
            alt='dashboard web kasir'
            width={400}
            height={400}
            priority
            className='object-cover'
          />
        </div>

        {/* Content */}
        <div className={`p-4 border ${isDark ? 'bg-gray-800/20 border-gray-700/40' : 'bg-white/20 border-white/30'}`}>
          <h1 className='font-semibold text-xl mb-1'>Dashboard Web Kasir</h1>
          <p className='text-sm text-gray-400'>React TS, Tailwind CSS, Express JS, MySQL</p>
          <p className='text-sm text-gray-500 mt-1'>Web aplikasi kasir untuk usaha kecil dan menengah.</p>

          {/* Buttons */}
          <div className='flex flex-wrap gap-2 mt-3'>
            <button className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition'>Demo</button>
            <button className='bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition'>Code</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
