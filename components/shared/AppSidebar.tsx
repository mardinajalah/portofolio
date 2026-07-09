'use client';

import Image from 'next/image';
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { PanelRightClose, PanelRightOpen } from 'lucide-react';
import { useTheme } from 'next-themes';
import { SkeletonSidebar } from '@/components/Molecules/Skeleton';
import { SidebarNavigationItem } from './sidebar-types';

type AppSidebarProps = {
  activePathname: string;
  controls?: ReactNode;
  footer?: ReactNode;
  isOpenSidebar: boolean;
  navigationItems: SidebarNavigationItem[];
  profileImageSrc?: string;
  profileTitle?: string;
  renderLink: (item: SidebarNavigationItem, className: string, children: ReactNode) => ReactNode;
  setIsOpenSidebar: Dispatch<SetStateAction<boolean>>;
};

export const AppSidebar = ({
  activePathname,
  controls,
  footer,
  isOpenSidebar,
  navigationItems,
  profileImageSrc = '/profile/profile.png',
  profileTitle = 'Mardin',
  renderLink,
  setIsOpenSidebar,
}: AppSidebarProps) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = theme === 'dark';

  useEffect(() => {
    setMounted(true);

    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setIsOpenSidebar(false);
      }

      if (window.innerWidth > 1024) {
        setIsOpenSidebar(true);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsOpenSidebar]);

  if (!mounted) {
    return <SkeletonSidebar />;
  }

  return (
    <>
      <button
        type='button'
        aria-label={isOpenSidebar ? 'Close sidebar' : 'Open sidebar'}
        className='fixed left-4 top-4 z-50 cursor-pointer rounded-lg bg-(--bg) p-2 text-(--text) shadow'
        onClick={() => setIsOpenSidebar((prev) => !prev)}
      >
        {isOpenSidebar ? <PanelRightClose size={20} /> : <PanelRightOpen size={20} />}
      </button>

      {isOpenSidebar && (
        <button
          type='button'
          aria-label='Close sidebar overlay'
          className='fixed inset-0 z-30 bg-black/50 md:hidden'
          onClick={() => setIsOpenSidebar(false)}
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-40 flex h-full w-62.5 flex-col items-center gap-3 p-4 shadow
          transition-all duration-300
          ${isDark ? `bg-gray-900 text-white ${isOpenSidebar ? 'shadow-gray-700' : ''}` : 'bg-white text-black'}
          bg-opacity-100
          md:bg-(--bg) md:text-(--text)
          ${isOpenSidebar ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className='mt-2 flex h-25 w-25 justify-center overflow-hidden rounded-full'>
          <Image
            alt='profile'
            src={profileImageSrc}
            width={200}
            height={200}
            priority
          />
        </div>

        <div className='flex items-center justify-center gap-1'>
          <h1 className='text-center text-2xl font-bold'>{profileTitle}</h1>
          <Image
            alt='centang biru'
            src='/icon/bluecheck.png'
            height={20}
            width={20}
          />
        </div>

        {controls}

        <nav className='mt-5 flex w-full flex-col gap-2'>
          {navigationItems.map((nav) => {
            const isActive = activePathname === nav.href;
            const linkClassName = `p-2 font-semibold rounded-xl transition-colors flex gap-2 justify-start items-center
              ${isActive ? (isDark ? 'bg-gray-800 text-white' : 'bg-gray-300 text-black') : isDark ? 'hover:bg-gray-800 text-gray-200' : 'hover:bg-gray-300 text-gray-700'}
            `;

            const children = (
              <>
                {nav.icon}
                <span>{nav.name}</span>
                {nav.badge && (
                  <span className='ml-auto rounded-full bg-gray-800 px-2 py-0.5 text-[11px] font-medium text-gray-400'>
                    {nav.badge}
                  </span>
                )}
              </>
            );

            if (nav.disabled) {
              return (
                <span
                  key={nav.href}
                  className={`${linkClassName} cursor-not-allowed opacity-60`}
                  title='Akan dibuat pada tahap berikutnya'
                >
                  {children}
                </span>
              );
            }

            return (
              <span key={nav.href}>
                {renderLink(nav, linkClassName, children)}
              </span>
            );
          })}
        </nav>

        {footer}
      </aside>
    </>
  );
};
