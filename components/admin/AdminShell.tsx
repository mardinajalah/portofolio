'use client';

import {
  Award,
  ContactRound,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  PanelsTopLeft,
  UserRound,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { signOut } from 'firebase/auth';
import { getFirebaseAuth } from '@/lib/firebase/client';
import { useAdminAuth } from './AdminAuthGuard';

type AdminShellProps = {
  children: ReactNode;
};

const adminNavigation = [
  {
    href: '/admin/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    isReady: true,
  },
  {
    href: '/admin/contact',
    label: 'Contact',
    icon: ContactRound,
    isReady: true,
  },
  {
    href: '/admin/projects',
    label: 'Projects',
    icon: PanelsTopLeft,
    isReady: false,
  },
  {
    href: '/admin/certificates',
    label: 'Certificates',
    icon: Award,
    isReady: false,
  },
  {
    href: '/admin/home',
    label: 'Home',
    icon: Home,
    isReady: false,
  },
  {
    href: '/admin/about',
    label: 'About',
    icon: UserRound,
    isReady: false,
  },
];

export const AdminShell = ({ children }: AdminShellProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAdminAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await signOut(getFirebaseAuth());
    router.replace('/admin/login');
  };

  return (
    <main className='min-h-screen bg-(--bg) text-(--text)'>
      <div className='mx-auto flex min-h-screen w-full max-w-7xl flex-col lg:flex-row'>
        <aside className='border-b border-gray-800/80 bg-[#111111]/95 px-4 py-4 lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:min-w-[18rem] lg:max-w-[18rem] lg:shrink-0 lg:border-b-0 lg:border-r lg:px-5 lg:py-6'>
          <div className='flex items-center justify-between gap-4 lg:block'>
            <Link
              href='/admin/dashboard'
              className='flex items-center gap-3'
            >
              <span className='flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/30 bg-blue-500/10 text-blue-300'>
                <FileText size={22} />
              </span>
              <span>
                <span className='block text-sm font-semibold uppercase tracking-[0.18em] text-blue-300'>Portfolio</span>
                <span className='block text-lg font-bold'>Admin Panel</span>
              </span>
            </Link>

            <button
              type='button'
              onClick={handleLogout}
              disabled={isLoggingOut}
              className='inline-flex h-10 w-10 items-center justify-center rounded-lg border border-red-400/30 bg-red-500/10 text-red-300 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60 lg:hidden'
              aria-label='Logout admin'
              title='Logout'
            >
              <LogOut size={18} />
            </button>
          </div>

          <nav className='mt-5 flex gap-2 overflow-x-auto pb-1 lg:mt-8 lg:block lg:space-y-2 lg:overflow-visible lg:pb-0'>
            {adminNavigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              const baseClass =
                'flex min-w-max items-center gap-3 rounded-xl border px-3 py-3 text-sm font-semibold transition lg:min-w-0';
              const readyClass = isActive
                ? 'border-blue-400/40 bg-blue-500/15 text-blue-200'
                : 'border-transparent text-gray-300 hover:border-gray-700 hover:bg-gray-800/50';
              const disabledClass = 'cursor-not-allowed border-transparent text-gray-500';

              if (!item.isReady) {
                return (
                  <span
                    key={item.href}
                    className={`${baseClass} ${disabledClass}`}
                    title='Akan dibuat pada tahap berikutnya'
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                    <span className='rounded-full bg-gray-800 px-2 py-0.5 text-[11px] font-medium text-gray-400'>Soon</span>
                  </span>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${baseClass} ${readyClass}`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className='mt-6 hidden rounded-2xl border border-gray-800 bg-gray-900/45 p-4 lg:block'>
            <p className='text-xs font-semibold uppercase tracking-[0.16em] text-gray-500'>Logged in</p>
            <p className='mt-2 truncate text-sm font-semibold text-gray-200'>{user.email}</p>
            <button
              type='button'
              onClick={handleLogout}
              disabled={isLoggingOut}
              className='mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60'
            >
              <LogOut size={17} />
              {isLoggingOut ? 'Logout...' : 'Logout'}
            </button>
          </div>
        </aside>

        <section className='min-w-0 flex-1 px-4 py-6 md:px-8 lg:px-10 lg:py-8'>{children}</section>
      </div>
    </main>
  );
};
