'use client';

import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { usePathname } from 'next/navigation';
import {
  Award,
  ContactRound,
  Home,
  LayoutDashboard,
  LogOut,
  PanelsTopLeft,
  UserRound,
} from 'lucide-react';
import { DarkModeToggle } from '@/components/Atoms/ButtonToggle';
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
  {
    href: '/admin/contact',
    name: 'Contact',
    icon: <ContactRound size={20} />,
  },
  {
    href: '/admin/projects',
    name: 'Projects',
    icon: <PanelsTopLeft size={20} />,
    disabled: true,
    badge: 'Soon',
  },
  {
    href: '/admin/certificates',
    name: 'Certificates',
    icon: <Award size={20} />,
    disabled: true,
    badge: 'Soon',
  },
  {
    href: '/admin/home',
    name: 'Home',
    icon: <Home size={20} />,
    disabled: true,
    badge: 'Soon',
  },
  {
    href: '/admin/about',
    name: 'About',
    icon: <UserRound size={20} />,
    disabled: true,
    badge: 'Soon',
  },
];

export const AdminSidebar = ({
  isLoggingOut,
  isOpenSidebar,
  onLogout,
  setIsOpenSidebar,
  userEmail,
}: AdminSidebarProps) => {
  const pathname = usePathname();

  return (
    <AppSidebar
      activePathname={pathname}
      controls={
        <div className='flex w-full items-center justify-center border-b border-gray-300 pb-4 dark:border-gray-700/40'>
          <DarkModeToggle />
        </div>
      }
      footer={
        <div className='mt-auto w-full border-t border-gray-300 pt-4 dark:border-gray-700/40'>
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
    />
  );
};
