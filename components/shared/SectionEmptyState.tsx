import type { LucideIcon } from 'lucide-react';

type SectionEmptyStateProps = {
  description: string;
  icon: LucideIcon;
  isDark: boolean;
  title: string;
};

export const SectionEmptyState = ({ description, icon: Icon, isDark, title }: SectionEmptyStateProps) => {
  return (
    <div
      className={`flex min-h-36 w-full flex-col justify-center rounded-xl border border-dashed p-5 ${
        isDark ? 'border-gray-700/70 bg-gray-900/30' : 'border-gray-300/80 bg-white/30'
      }`}
    >
      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${isDark ? 'bg-blue-400/10 text-blue-300' : 'bg-blue-500/10 text-blue-600'}`}>
        <Icon
          aria-hidden='true'
          focusable='false'
          size={20}
        />
      </div>
      <h2 className={`mt-4 text-base font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>{title}</h2>
      <p className={`mt-2 text-sm leading-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{description}</p>
    </div>
  );
};
