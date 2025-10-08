'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useTheme } from 'next-themes';

interface IconSkillsProps {
  title?: string;
  style?: string;
  icon: any;
}

export const IconSkillsLeft = ({ title, icon, style }: IconSkillsProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-2
        rounded-full
        backdrop-blur-xl border 
        ${isDark ? 'border-gray-700/40 bg-gray-800/20' : 'border-white/30 bg-white/20'}
        shadow-md cursor-default
        min-w-[140px]   /* ✅ disamakan */
      `}
    >
      <FontAwesomeIcon icon={icon} className={`${style} text-2xl`} />
      <h1 className="font-semibold text-sm whitespace-nowrap">{title}</h1>
    </div>
  );
};

export const IconSkillsRight = ({ title, icon }: IconSkillsProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-2
        rounded-full
        backdrop-blur-xl border 
        ${isDark ? 'border-gray-700/40 bg-gray-800/20' : 'border-white/30 bg-white/20'}
        shadow-md cursor-default
        min-w-[140px]   /* ✅ disamakan */
      `}
    >
      <div className="w-[25px] h-[25px] overflow-hidden">
        <Image
          alt={icon}
          src={`/icon/${icon}.png`}
          width={100}
          height={100}
        />
      </div>
      <h1 className="font-semibold text-sm whitespace-nowrap">{title}</h1>
    </div>
  );
};
