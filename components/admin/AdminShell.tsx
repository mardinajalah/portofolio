'use client';

import { ReactNode, useState } from 'react';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { getFirebaseAuth } from '@/lib/firebase/client';
import { SidebarLayout } from '@/components/shared/SidebarLayout';
import { useAdminAuth } from './AdminAuthGuard';
import { AdminSidebar } from './AdminSidebar';

type AdminShellProps = {
  children: ReactNode;
};

export const AdminShell = ({ children }: AdminShellProps) => {
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
      <SidebarLayout
        renderSidebar={({ isOpenSidebar, setIsOpenSidebar }) => (
          <AdminSidebar
            isLoggingOut={isLoggingOut}
            isOpenSidebar={isOpenSidebar}
            onLogout={handleLogout}
            setIsOpenSidebar={setIsOpenSidebar}
            userEmail={user.email}
          />
        )}
      >
        {children}
      </SidebarLayout>
    </main>
  );
};
