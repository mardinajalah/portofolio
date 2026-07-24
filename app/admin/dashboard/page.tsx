'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { adminModules } from '@/components/admin/admin-modules';
import { ContactDashboardOverview } from '@/components/admin/dashboard/ContactDashboardOverview';
import { DashboardComingSoon } from '@/components/admin/dashboard/DashboardComingSoon';
import { DashboardModuleNavigator } from '@/components/admin/dashboard/DashboardModuleNavigator';

export const dynamic = 'force-dynamic';

const AdminDashboardPage = () => {
  const { resolvedTheme, theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const isDark = isMounted ? (resolvedTheme ?? theme ?? 'dark') === 'dark' : true;
  const activeModule = adminModules[activeModuleIndex];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const showPreviousModule = () => {
    setActiveModuleIndex((currentIndex) => (
      (currentIndex - 1 + adminModules.length) % adminModules.length
    ));
  };

  const showNextModule = () => {
    setActiveModuleIndex((currentIndex) => (
      (currentIndex + 1) % adminModules.length
    ));
  };

  return (
    <div className='mx-auto w-full max-w-400'>
      <header className='mb-6'>
        <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>
          Admin Dashboard
        </p>
        <h1 className='mt-2 text-2xl font-bold md:text-3xl'>Ringkasan data portofolio</h1>
        <p className={`mt-2 max-w-2xl text-sm leading-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Pilih modul untuk melihat kondisi data terbaru tanpa membuka setiap halaman pengelolaan.
        </p>
      </header>

      <div className='grid grid-cols-1 gap-6 xl:grid-cols-[minmax(270px,0.72fr)_minmax(0,2.28fr)]'>
        <DashboardModuleNavigator
          activeIndex={activeModuleIndex}
          isDark={isDark}
          module={activeModule}
          onNext={showNextModule}
          onPrevious={showPreviousModule}
          totalModules={adminModules.length}
        />

        <div
          id='dashboard-module-content'
          aria-live='polite'
          className='min-w-0'
        >
          {activeModule.id === 'contact' ? (
            <ContactDashboardOverview isDark={isDark} />
          ) : (
            <DashboardComingSoon
              isDark={isDark}
              module={activeModule}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
