import { Construction } from 'lucide-react';
import type { AdminModuleDefinition } from '@/components/admin/admin-modules';

type DashboardComingSoonProps = {
  isDark: boolean;
  module: AdminModuleDefinition;
};

export const DashboardComingSoon = ({ isDark, module }: DashboardComingSoonProps) => {
  const ModuleIcon = module.icon;

  return (
    <section
      className={`flex min-h-90 flex-col items-center justify-center rounded-2xl border px-6 py-12 text-center shadow-lg md:min-h-105 ${
        isDark ? 'border-gray-800 bg-gray-900/40' : 'border-white/30 bg-white/20'
      }`}
    >
      <span
        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${
          isDark
            ? 'border-amber-400/20 bg-amber-400/10 text-amber-200'
            : 'border-amber-500/30 bg-amber-50 text-amber-700'
        }`}
      >
        <Construction
          aria-hidden='true'
          size={15}
        />
        Coming Soon
      </span>

      <div
        className={`mt-7 flex h-20 w-20 items-center justify-center rounded-2xl ${
          isDark ? 'bg-blue-400/10 text-blue-300' : 'bg-blue-500/10 text-blue-600'
        }`}
      >
        <ModuleIcon
          aria-hidden='true'
          size={40}
          strokeWidth={1.5}
        />
      </div>

      <h2 className='mt-6 text-2xl font-bold'>Ringkasan {module.title}</h2>
      <p className={`mt-3 max-w-lg text-sm leading-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        {module.description}
      </p>
      <p className={`mt-5 max-w-lg text-sm leading-6 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
        Data akan muncul otomatis setelah fitur CRUD {module.title} tersedia di Admin Panel.
      </p>
    </section>
  );
};
