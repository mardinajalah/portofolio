'use client';

import React, { useEffect, useState } from 'react';
import GitHubCalendar from 'react-github-calendar';
import { useTheme } from 'next-themes';

const Github = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  const isDark = theme === 'dark';

  const startYear = 2023;

  const years = Array.from({ length: new Date().getFullYear() - startYear + 1 }, (_, i) => startYear + i);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className='flex flex-col justify-center items-center'>
        <div className='h-6 bg-gray-300 rounded-full w-1/3 mt-10 animate-pulse mb-5' />
        <div className='w-full h-[250px] bg-gray-300 rounded-2xl animate-pulse' />
      </div>
    );
  }

  return (
    <>
      <div
        className={`
          w-full py-5 rounded-2xl flex flex-col gap-5 justify-center items-center
          ${isDark ? 'bg-gray-800/20 border-gray-700/40' : 'bg-white/20 border-white/30'}
          backdrop-blur-xl border shadow-lg
        `}
      >
        {/* Kalender GitHub */}
        <GitHubCalendar
          username='mardinajalah'
          blockSize={16.5}
          blockMargin={5}
          fontSize={14}
          colorScheme={isDark ? 'dark' : 'light'}
          year={selectedYear}
        />

        {/* Tombol tahun dinamis */}
        <div className='flex flex-wrap gap-3 justify-center'>
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-4 py-2 rounded-lg transition cursor-pointer ${selectedYear === year ? 'bg-blue-600 text-white' : `bg-gray-300 ${isDark && "bg-gray-800 text-gray-200"} hover:bg-blue-500 hover:text-white`}`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Github;
