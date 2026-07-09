'use client';
import { Dispatch, SetStateAction } from 'react';
import { DarkModeToggle, LanguageToggle } from '../Atoms/ButtonToggle';
import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { House, User, MonitorCog, Dock, Github, CardSim } from 'lucide-react';
import { AppSidebar } from '@/components/shared/AppSidebar';
import { SidebarNavigationItem } from '@/components/shared/sidebar-types';

interface SidebarProps {
  isOpenSidebar: boolean;
  setIsOpenSidebar: Dispatch<SetStateAction<boolean>>;
}

const Sidebar = ({ isOpenSidebar, setIsOpenSidebar }: SidebarProps) => {
  const pathname = usePathname();
  const t = useTranslations('Sidebar');

  const dataNavigation: SidebarNavigationItem[] = [
    { name: t('home'), href: '/', icon: <House size={20} /> },
    { name: t('about'), href: '/about', icon: <User size={20} /> },
    { name: t('project'), href: '/project', icon: <MonitorCog size={20} /> },
    { name: t('certificate'), href: '/certificate', icon: <Dock size={20} /> },
    { name: t('github'), href: '/github', icon: <Github size={20} /> },
    { name: t('contact'), href: '/contact', icon: <CardSim size={20} /> },
  ];

  return (
    <AppSidebar
      activePathname={pathname}
      controls={
        <div className='flex w-full items-center justify-between gap-2 border-b border-gray-300 pb-4 capitalize dark:border-gray-700/40'>
          <DarkModeToggle />
          <LanguageToggle />
        </div>
      }
      isOpenSidebar={isOpenSidebar}
      navigationItems={dataNavigation}
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

export default Sidebar;
