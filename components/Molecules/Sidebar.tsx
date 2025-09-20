'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import DarkModeToggle from '../Atoms/DarkModeToggle';
import LikeButton from '../Atoms/LikeButton';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { SkeletonSidebar } from './Skeleton';
import { House, User, MonitorCog, Dock, Github, CardSim, PanelRightClose, PanelRightOpen } from 'lucide-react';

interface SidebarProps {
  isOpenSidebar: boolean;
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpenSidebar, setIsOpenSidebar }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isDark = theme === 'dark';

  const dataNavigation = [
    { name: 'Home', href: '/', icon: <House size={20} /> },
    { name: 'About', href: '/about', icon: <User size={20} /> },
    { name: 'Project', href: '/project', icon: <MonitorCog size={20} /> },
    { name: 'Certificate', href: '/certificate', icon: <Dock size={20} /> },
    { name: 'Github', href: '/github', icon: <Github size={20} /> },
    { name: 'Contact', href: '/contact', icon: <CardSim size={20} /> },
  ];

  useEffect(() => {
    setMounted(true);

    // fungsi untuk cek ukuran layar
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setIsOpenSidebar(false);
      }

      if (window.innerWidth > 1024) {
        setIsOpenSidebar(true);
      }
    };

    // cek langsung pas pertama render
    handleResize();

    // pasang listener resize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsOpenSidebar]);

  if (!mounted) return <SkeletonSidebar />;

  return (
    <>
      {/* Tombol toggle pojok kiri atas */}
      <div
        className='fixed top-4 left-4 z-50 cursor-pointer bg-[var(--bg)] text-[var(--text)] p-2 rounded-lg shadow'
        onClick={() => setIsOpenSidebar((prev) => !prev)}
      >
        {isOpenSidebar ? <PanelRightClose size={20} /> : <PanelRightOpen size={20} />}
      </div>

      {/* Overlay (hanya muncul di mobile/tablet ketika sidebar terbuka) */}
      {isOpenSidebar && (
        <div
          className='fixed inset-0 bg-black/50 z-30 md:hidden'
          onClick={() => setIsOpenSidebar(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-[250px] p-4 flex flex-col gap-3 items-center
          transition-all duration-300 z-40 shadow
          ${isDark ? `bg-gray-900 text-white ${isOpenSidebar ? 'shadow-gray-700' : ''}` : 'bg-white text-black'}
          bg-opacity-100
          md:bg-[var(--bg)] md:text-[var(--text)]
          ${isOpenSidebar ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Profile */}
        <div className='rounded-full overflow-hidden flex justify-center w-[100px] h-[100px] mt-2'>
          <Image
            alt='profile'
            src='/profile.png'
            width={200}
            height={200}
            priority
          />
        </div>

        {/* Name */}
        <div className='flex items-center justify-center gap-1'>
          <h1 className='text-2xl font-bold text-center'>Mardin</h1>
          <Image
            alt='centang biru'
            src='/bluecheck.png'
            height={20}
            width={20}
          />
        </div>

        {/* Controls */}
        <div className='flex items-center gap-2 w-full justify-between capitalize border-b border-gray-300 dark:border-gray-700/40 pb-4'>
          <DarkModeToggle />
          <LikeButton />
        </div>

        {/* Navigation */}
        <div className='w-full flex flex-col gap-2 mt-5'>
          {dataNavigation.map((nav, index) => {
            const isActive = pathname === nav.href;
            return (
              <Link
                key={index}
                href={nav.href}
                className={`p-2 font-semibold rounded-xl transition-colors flex gap-2 justify-start items-center
              ${isActive ? (isDark ? 'bg-gray-800 text-white' : 'bg-gray-300 text-black') : isDark ? 'hover:bg-gray-800 text-gray-200' : 'hover:bg-gray-300 text-gray-700'}
            `}
              >
                {nav.icon}
                {nav.name}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
