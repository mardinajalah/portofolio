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

  const themeQuery = isDark ? 'tokyonight' : 'default';

  return (
    <div className='w-full'>
      <div className='mb-8'>
        <h1 className='text-2xl md:text-3xl font-bold capitalize'>GitHub Analytics</h1>
        <p className='mt-2 text-sm md:text-base'>My open source contributions and activity on GitHub.</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8'>
        {/* GitHub Stats */}
        <GithubStats 
          title="Overview Stats"
          isDark={isDark} 
          src={`https://github-readme-stats.vercel.app/api?username=mardinajalah&show_icons=true&theme=${themeQuery}&hide_border=true&bg_color=00000000`} 
        />

        {/* Streak Stats */}
        <GithubStats
          title="Contribution Streak"
          isDark={isDark}
          src={`https://github-readme-streak-stats.herokuapp.com/?user=mardinajalah&theme=${themeQuery}&hide_border=true&background=00000000`}
        />

        {/* Top Languages */}
        <GithubStats
          title="Top Languages"
          isDark={isDark}
          src={`https://github-readme-stats.vercel.app/api/top-langs/?username=mardinajalah&layout=compact&theme=${themeQuery}&hide_border=true&bg_color=00000000`}
        />
      </div>

      <div
        className={`
          w-full py-8 px-4 rounded-2xl flex flex-col gap-6 justify-center items-center
          transition-all duration-300
          ${isDark ? 'border-gray-700/40 bg-gray-800/20 hover:border-blue-400/40' : 'border-white/30 bg-white/20 hover:border-blue-500/40'}
          backdrop-blur-xl border shadow-md
        `}
      >
        <div className='w-full flex flex-col items-center gap-4'>
          <h2 className={`text-lg font-semibold w-full text-center md:text-left md:px-4 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
            Contribution Calendar
          </h2>
          <div className='w-full overflow-x-auto flex justify-center px-2 py-4'>
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
          <div className='flex flex-wrap gap-3 justify-center mt-2'>
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 cursor-pointer shadow-sm
                  ${selectedYear === year ? 'bg-blue-500 text-white shadow-blue-500/30' : isDark ? 'bg-gray-700/50 text-gray-200 hover:bg-blue-500 hover:text-white' : 'bg-white/50 text-gray-800 hover:bg-blue-500 hover:text-white border border-gray-200'}`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Github;
