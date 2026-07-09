'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { ThemeProvider } from 'next-themes';
import { AdminAuthGuard } from './AdminAuthGuard';
import { AdminShell } from './AdminShell';

type AdminRouteBoundaryProps = {
  children: ReactNode;
};

export const AdminRouteBoundary = ({ children }: AdminRouteBoundaryProps) => {
  const pathname = usePathname();
  const isPublicAdminRoute = pathname === '/admin/login' || pathname === '/admin';

  if (isPublicAdminRoute) {
    return (
      <ThemeProvider
        attribute='class'
        defaultTheme='dark'
        enableSystem
      >
        {children}
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='dark'
      enableSystem
    >
      <AdminAuthGuard>
        <AdminShell>{children}</AdminShell>
      </AdminAuthGuard>
    </ThemeProvider>
  );
};
