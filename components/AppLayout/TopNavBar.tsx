import React from 'react';

const TopNavBar = ({ title }: { title: string }) => {
  return (
    <nav className="sticky top-0 z-30 border-b bg-white">
      <div>
        <div className="flex h-[72px] items-center ">
          <div className="flex flex-1 items-center justify-between px-4">
            <div className="flex flex-col gap-2">
              <div>
                <h1 className="text-3xl font-bold text-slate-700">{title}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;
