'use client';

import { Dispatch, ReactNode, SetStateAction, useState } from 'react';

type SidebarLayoutProps = {
  children: ReactNode;
  renderSidebar: (props: {
    isOpenSidebar: boolean;
    setIsOpenSidebar: Dispatch<SetStateAction<boolean>>;
  }) => ReactNode;
};

export const SidebarLayout = ({ children, renderSidebar }: SidebarLayoutProps) => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  return (
    <div className='relative flex h-screen w-full flex-row overflow-hidden'>
      {renderSidebar({ isOpenSidebar, setIsOpenSidebar })}

      <div
        data-auto-hide-scrollbar='container'
        className={`w-full min-w-0 flex-1 overflow-y-auto overflow-x-hidden px-4 py-6 transition-all duration-300 md:px-10 ${
          isOpenSidebar ? 'md:ml-62.5' : 'ml-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
};
