import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

type DashboardAccent = 'blue' | 'emerald' | 'amber';

type DashboardSummaryCardProps = {
  accent: DashboardAccent;
  children: ReactNode;
  description: string;
  icon: LucideIcon;
  isDark: boolean;
  metric: string;
  title: string;
};

const accentClassNames: Record<DashboardAccent, { dark: string; light: string }> = {
  amber: {
    dark: 'bg-amber-400/10 text-amber-300',
    light: 'bg-amber-500/10 text-amber-700',
  },
  blue: {
    dark: 'bg-blue-400/10 text-blue-300',
    light: 'bg-blue-500/10 text-blue-700',
  },
  emerald: {
    dark: 'bg-emerald-400/10 text-emerald-300',
    light: 'bg-emerald-500/10 text-emerald-700',
  },
};

export const DashboardSummaryCard = ({
  accent,
  children,
  description,
  icon: Icon,
  isDark,
  metric,
  title,
}: DashboardSummaryCardProps) => {
  const accentClassName = isDark ? accentClassNames[accent].dark : accentClassNames[accent].light;

  return (
    <article
      className={`flex min-h-96 min-w-0 flex-col rounded-2xl border p-5 shadow-lg ${
        isDark ? 'border-gray-800 bg-gray-900/40' : 'border-white/30 bg-white/20'
      }`}
    >
      <div className='flex items-start justify-between gap-4'>
        <div className='min-w-0'>
          <p className={`text-xs font-semibold uppercase tracking-[0.12em] ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
            {title}
          </p>
          <p className='mt-2 text-3xl font-bold tabular-nums'>{metric}</p>
          <p className={`mt-1 text-sm leading-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {description}
          </p>
        </div>
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${accentClassName}`}>
          <Icon
            aria-hidden='true'
            size={21}
          />
        </div>
      </div>

      <div className={`mt-5 flex-1 border-t pt-4 ${isDark ? 'border-gray-800' : 'border-gray-300/80'}`}>
        {children}
      </div>
    </article>
  );
};
