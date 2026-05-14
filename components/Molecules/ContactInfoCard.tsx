'use client';

import { LucideIcon } from 'lucide-react';

interface ContactInfoCardProps {
  href?: string;
  icon: LucideIcon;
  isDark: boolean;
  label: string;
  value: string;
}

const ContactInfoCard = ({ href, icon: Icon, isDark, label, value }: ContactInfoCardProps) => {
  const className = `
    p-4 rounded-xl backdrop-blur-xl border shadow-md transition-all duration-300
    ${isDark ? 'bg-gray-800/20 border-gray-700/40 hover:border-blue-400/40' : 'bg-white/20 border-white/30 hover:border-blue-500/40'}
  `;

  const content = (
    <div className='flex items-center gap-3'>
      <div className={`w-10 h-10 rounded-lg flex shrink-0 items-center justify-center ${isDark ? 'bg-blue-400/10 text-blue-400' : 'bg-blue-500/10 text-blue-500'}`}>
        <Icon size={20} />
      </div>
      <div className='min-w-0'>
        <p className='text-sm text-gray-500 dark:text-gray-400'>{label}</p>
        <p className='font-semibold wrap-break-word'>{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target='_blank'
        rel='noreferrer'
        className={className}
      >
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
};

export default ContactInfoCard;
