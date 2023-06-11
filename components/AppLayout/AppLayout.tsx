import React from 'react';

import LeftSideBar from './LeftSideBar';
import TopNavBar from './TopNavBar';

type Props = {
  children: React.ReactNode;
  title: string;
};

const AppLayout = ({ children, title }: Props) => {
  return (
    <div>
      <div>
        <div className="flex h-screen overflow-hidden bg-white">
          <LeftSideBar />
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-slate-100">
            <TopNavBar title={title} />
            <main className="relative p-4">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
