import { ReactNode } from 'react';

export type SidebarNavigationItem = {
  badge?: string;
  disabled?: boolean;
  href: string;
  icon: ReactNode;
  name: string;
};
