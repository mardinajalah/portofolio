'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { AdminAuthGuard } from './AdminAuthGuard';
import { AdminShell } from './AdminShell';

type AdminRouteBoundaryProps = {
  children: ReactNode;
};

export const AdminRouteBoundary = ({ children }: AdminRouteBoundaryProps) => {
  const pathname = usePathname();
  const isPublicAdminRoute = pathname === '/admin/login' || pathname === '/admin';

  if (isPublicAdminRoute) {
    return <>{children}</>;
  }

  return (
    <AdminAuthGuard>
      <AdminShell>{children}</AdminShell>
    </AdminAuthGuard>
  );
};
