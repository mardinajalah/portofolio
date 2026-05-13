'use client';

import { LucideIcon } from 'lucide-react';

interface AboutInfoCardProps {
  icon: LucideIcon;
  isDark: boolean;
  label: string;
  value: string;
}

const AboutInfoCard = ({ icon: Icon, isDark, label, value }: AboutInfoCardProps) => {
  return (
    <div
      className={`
        p-4 rounded-xl backdrop-blur-xl border shadow-md
        ${isDark ? 'bg-gray-800/20 border-gray-700/40' : 'bg-white/20 border-white/30'}
      `}
    >
      <div className='flex items-center gap-3'>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-blue-400/10 text-blue-400' : 'bg-blue-500/10 text-blue-500'}`}>
          <Icon size={20} />
        </div>
        <div>
          <p className='text-sm text-gray-500 dark:text-gray-400'>{label}</p>
          <h2 className='font-semibold'>{value}</h2>
        </div>
      </div>
    </div>
  );
};

export default AboutInfoCard;
