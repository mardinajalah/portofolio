'use client';

import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import {
  LayoutDashboard,
  LogOut,
} from 'lucide-react';
import { DarkModeToggle } from '@/components/Atoms/ButtonToggle';
import { adminModules } from '@/components/admin/admin-modules';
import { AppSidebar } from '@/components/shared/AppSidebar';
import { SidebarNavigationItem } from '@/components/shared/sidebar-types';

type AdminSidebarProps = {
  isLoggingOut: boolean;
  isOpenSidebar: boolean;
  onLogout: () => void;
  setIsOpenSidebar: Dispatch<SetStateAction<boolean>>;
  userEmail: string | null;
};

const adminNavigation: SidebarNavigationItem[] = [
  {
    href: '/admin/dashboard',
    name: 'Dashboard',
    icon: <LayoutDashboard size={20} />,
  },
  ...adminModules.map((module) => {
    const ModuleIcon = module.icon;

    return {
      href: module.href,
      name: module.title,
      icon: <ModuleIcon size={20} />,
      disabled: !module.isAvailable,
      badge: module.isAvailable ? undefined : 'Soon',
    };
  }),
];

export const AdminSidebar = ({
  isLoggingOut,
  isOpenSidebar,
  onLogout,
  setIsOpenSidebar,
  userEmail,
}: AdminSidebarProps) => {
  const pathname = usePathname();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <AppSidebar
      activePathname={pathname}
      header={
        <div className='mt-8 w-full text-center'>
          <p className={`text-sm font-semibold uppercase tracking-[0.32em] ${isDark ? 'text-blue-400' : 'text-blue-500'}`}>
            PORTFOLIO
          </p>
          <h1 className='mt-2 text-2xl font-bold'>Admin Panel</h1>
        </div>
      }
      controls={
        <div className={`flex w-full items-center justify-center border-b pb-4 ${isDark ? 'border-gray-700/40' : 'border-gray-300'}`}>
          <DarkModeToggle />
        </div>
      }
      footer={
        <div className={`mt-auto w-full border-t pt-4 ${isDark ? 'border-gray-700/40' : 'border-gray-300'}`}>
          <p className='text-xs font-semibold uppercase tracking-[0.16em] text-gray-500'>Logged in</p>
          <p className='mt-2 truncate text-sm font-semibold'>{userEmail}</p>
          <button
            type='button'
            onClick={onLogout}
            disabled={isLoggingOut}
            className='mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60'
          >
            <LogOut size={17} />
            {isLoggingOut ? 'Logout...' : 'Logout'}
          </button>
        </div>
      }
      isOpenSidebar={isOpenSidebar}
      navigationItems={adminNavigation}
      renderLink={(item, className, children) => (
        <Link
          href={item.href}
          className={className}
        >
          {children}
        </Link>
      )}
      setIsOpenSidebar={setIsOpenSidebar}
      showProfile={false}
    />
  );
};
