import { ReactNode } from 'react';
import { AdminRouteBoundary } from '@/components/admin/AdminRouteBoundary';

type AdminLayoutProps = {
  children: ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return <AdminRouteBoundary>{children}</AdminRouteBoundary>;
};

export default AdminLayout;
