import React from 'react';

interface GithubStatsProps {
  src: string;
  isDark: boolean;
  title?: string;
}

const GithubStats: React.FC<GithubStatsProps> = ({ src, isDark, title }) => {
  return (
    <div
      className={`
        w-full overflow-hidden rounded-xl backdrop-blur-xl border shadow-md transition-all duration-300 flex flex-col items-center p-4
        ${isDark ? 'bg-gray-800/20 border-gray-700/40 hover:border-blue-400/40' : 'bg-white/20 border-white/30 hover:border-blue-500/40'}
      `}
    >
      {title && (
        <h2 className={`text-lg font-semibold mb-3 w-full text-left ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
          {title}
        </h2>
      )}
      <img
        src={src}
        alt={title || 'GitHub Stats'}
        className='w-full h-auto object-contain'
      />
    </div>
  );
};

export default GithubStats;