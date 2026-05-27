'use client';

import { useState } from 'react';
import { ThemeProvider } from 'next-themes';
import Sidebar from '@/components/Molecules/Sidebar';

interface AppShellProps {
  children: React.ReactNode;
}

const AppShell = ({ children }: AppShellProps) => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='dark'
      enableSystem
    >
      <div className='flex h-screen w-full overflow-hidden flex-row relative'>
        <Sidebar
          isOpenSidebar={isOpenSidebar}
          setIsOpenSidebar={setIsOpenSidebar}
        />

        <div
          className={`flex-1 py-6 px-4 md:px-10 w-full overflow-y-auto overflow-x-hidden transition-all duration-300
          ${isOpenSidebar ? 'md:ml-62.5' : 'ml-0'}`}
        >
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AppShell;
