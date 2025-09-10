'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IconSkillsProps {
  title: string;
  style: string;
  icon: any;
}

const IconSkills = ({ title, icon, style }: IconSkillsProps) => {
  return (
    <div
      className="
        flex items-center gap-3 px-4 py-2
        rounded-full
        bg-white/20 dark:bg-gray-800/20
        backdrop-blur-xl
        border border-white/30 dark:border-gray-700/40
        shadow-md cursor-default
        min-w-[120px]
      "
    >
      <FontAwesomeIcon icon={icon} className={`${style} text-2xl`} />
      <h1 className="font-semibold text-sm whitespace-nowrap">{title}</h1>
    </div>
  );
};

export default IconSkills;
