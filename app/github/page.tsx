'use client';

import React, { useEffect, useState } from 'react';
import GitHubCalendar from 'react-github-calendar';
import { useTheme } from 'next-themes';
import { SkeletonGithubPage } from '@/components/Molecules/Skeleton';
import GithubStats from '@/components/Molecules/GithubStats';

const Github = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  const isDark = theme === 'dark';
  const startYear = 2023;
  const years = Array.from({ length: new Date().getFullYear() - startYear + 1 }, (_, i) => startYear + i);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <SkeletonGithubPage />;

  return (
    <>
      <div className='flex flex-col md:flex-row gap-5 flex-wrap justify-center items-center w-full mb-5'>
        {/* GitHub Stats */}
        <GithubStats isDark={isDark} src={`https://github-readme-stats.vercel.app/api?username=mardinajalah&theme=${isDark ? 'tokyonight' : 'graywhite'}&hide_border=true`} />

        {/* Streak Stats */}
        <GithubStats
          src={`https://nirzak-streak-stats.vercel.app/?user=mardinajalah&show_icons=true&theme=${isDark ? 'tokyonight' : 'graywhite'}&hide_border=true`}
          isDark={isDark}
        />
      </div>
      <div
        className={`
          w-full py-8 px-4 rounded-2xl flex flex-col gap-6 justify-center items-center
          transition-colors duration-300
          ${isDark ? 'border-gray-700/70 bg-gray-800/30' : 'border-gray-300 bg-white/30'}
          backdrop-blur-xl shadow-md
        `}
      >
        <div className='w-full flex flex-col items-center gap-4'>
          <div className='w-full overflow-x-auto flex justify-center px-2'>
            <GitHubCalendar
              username='mardinajalah'
              blockSize={16}
              blockMargin={4}
              fontSize={12}
              colorScheme={isDark ? 'dark' : 'light'}
              year={selectedYear}
            />
          </div>

          {/* Tombol tahun */}
          <div className='flex flex-wrap gap-3 justify-center'>
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 
                  ${selectedYear === year ? 'bg-blue-600 text-white' : isDark ? 'bg-gray-700 text-gray-200 hover:bg-blue-500 hover:text-white' : 'bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white'}`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Github;
