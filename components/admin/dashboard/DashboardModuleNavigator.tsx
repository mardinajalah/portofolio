'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { AdminModuleDefinition } from '@/components/admin/admin-modules';

type DashboardModuleNavigatorProps = {
  activeIndex: number;
  isDark: boolean;
  module: AdminModuleDefinition;
  onNext: () => void;
  onPrevious: () => void;
  totalModules: number;
};

export const DashboardModuleNavigator = ({
  activeIndex,
  isDark,
  module,
  onNext,
  onPrevious,
  totalModules,
}: DashboardModuleNavigatorProps) => {
  const ModuleIcon = module.icon;

  const navigationButtonClassName = `inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
    isDark
      ? 'border-gray-700 bg-gray-950/70 text-gray-200 hover:border-blue-400/40 hover:bg-blue-500/10 focus-visible:ring-offset-gray-950'
      : 'border-gray-300 bg-white/70 text-gray-700 hover:border-blue-500/40 hover:bg-blue-50 focus-visible:ring-offset-white'
  }`;

  return (
    <section
      aria-label='Pemilih modul dashboard'
      className={`flex min-h-90 flex-col rounded-2xl border p-5 shadow-lg md:min-h-105 md:p-6 ${
        isDark ? 'border-gray-800 bg-gray-900/40' : 'border-white/30 bg-white/20'
      }`}
    >
      <div className='flex items-center justify-between gap-3'>
        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${
            module.isAvailable
              ? isDark
                ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200'
                : 'border-emerald-500/30 bg-emerald-50 text-emerald-700'
              : isDark
                ? 'border-gray-700 bg-gray-950/60 text-gray-400'
                : 'border-gray-300 bg-white/60 text-gray-600'
          }`}
        >
          {module.isAvailable ? 'Aktif' : 'Coming Soon'}
        </span>
        <span className={`text-sm font-semibold tabular-nums ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
          {activeIndex + 1} / {totalModules}
        </span>
      </div>

      <div className='relative flex flex-1 items-center justify-center py-8'>
        <button
          type='button'
          aria-controls='dashboard-module-content'
          aria-label='Tampilkan modul sebelumnya'
          className={`${navigationButtonClassName} absolute left-0`}
          onClick={onPrevious}
          title='Modul sebelumnya'
        >
          <ChevronLeft size={22} />
        </button>

        <div className='flex min-w-0 max-w-40 flex-col items-center text-center sm:max-w-56'>
          <div
            className={`flex h-24 w-24 items-center justify-center rounded-2xl sm:h-28 sm:w-28 ${
              isDark ? 'bg-blue-400/10 text-blue-300' : 'bg-blue-500/10 text-blue-600'
            }`}
          >
            <ModuleIcon
              aria-hidden='true'
              className='h-14 w-14 sm:h-17 sm:w-17'
              strokeWidth={1.35}
            />
          </div>
          <p className={`mt-6 text-xs font-semibold uppercase tracking-[0.16em] ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>
            Data Modul
          </p>
          <h2 className='mt-2 text-2xl font-bold'>{module.title}</h2>
        </div>

        <button
          type='button'
          aria-controls='dashboard-module-content'
          aria-label='Tampilkan modul berikutnya'
          className={`${navigationButtonClassName} absolute right-0`}
          onClick={onNext}
          title='Modul berikutnya'
        >
          <ChevronRight size={22} />
        </button>
      </div>

      <p className={`text-center text-sm leading-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        {module.description}
      </p>
    </section>
  );
};
