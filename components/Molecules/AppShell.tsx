'use client';

import { ThemeProvider } from 'next-themes';
import Sidebar from '@/components/Molecules/Sidebar';
import { SidebarLayout } from '@/components/shared/SidebarLayout';

interface AppShellProps {
  children: React.ReactNode;
}

const AppShell = ({ children }: AppShellProps) => {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='dark'
      enableSystem
    >
      <SidebarLayout
        renderSidebar={({ isOpenSidebar, setIsOpenSidebar }) => (
          <Sidebar
            isOpenSidebar={isOpenSidebar}
            setIsOpenSidebar={setIsOpenSidebar}
          />
        )}
      >
        {children}
      </SidebarLayout>
    </ThemeProvider>
  );
};

export default AppShell;
