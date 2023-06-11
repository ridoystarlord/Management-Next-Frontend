import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BiSupport, BiPurchaseTag, BiPackage, BiLogOut } from 'react-icons/bi';
import { FaUsers } from 'react-icons/fa';
import { FiTruck } from 'react-icons/fi';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { TbShoppingCartDiscount } from 'react-icons/tb';
import { TbTruckDelivery } from 'react-icons/tb';
import Cookies from 'universal-cookie';

import Header from 'components/Header/Header';
import usePathHook from 'hooks/use-path.hook';
import { ROUTES } from 'Routes';
import { sessionLogout } from 'services/authService';
import { defaultQueryClient } from 'services/util';
import { isAxiosError } from 'utils/error';

const LeftSideBar = () => {
  const { path } = usePathHook();
  const router = useRouter();
  const { mutateAsync } = useMutation(() => sessionLogout(), {
    onSuccess: () => {
      defaultQueryClient.clear();
      const cookies = new Cookies();
      cookies.remove('hasToken');
      router.push(ROUTES.HOME);
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        if (error.code === '401') {
          toast.error('Session expired. Please login again.', {
            id: 'session-expired',
          });
          router.push(ROUTES.HOME);
        }
      }
    },
  });
  const handleLogOut = () => {
    toast.promise(
      mutateAsync(),
      {
        loading: 'Logging out',
        success: 'Logged out',
        error: 'Error logging out',
      },
      {
        id: 'logout',
      },
    );
  };
  return (
    <aside
      id="sidebar"
      className="flex w-[256px] overflow-y-auto bg-slate-800"
      aria-label="Sidebar"
    >
      <div className="w-full">
        <div className="flex h-[64px] w-full items-center justify-center text-white">
          <Link
            passHref
            href={ROUTES.DASHBOARD.HOME}
            className="text-lg font-bold"
          >
            Management Next
          </Link>
        </div>
        <div className="flex-1">
          <ul className="menu-container">
            <li>
              <Link
                passHref
                href={ROUTES.DASHBOARD.HOME}
                className={`${
                  path === ROUTES.DASHBOARD.HOME ? 'active' : null
                }`}
              >
                <MdOutlineSpaceDashboard className="left-bar-icon" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <button
                className="flex w-full items-center gap-2 rounded-lg p-3 font-semibold text-white hover:bg-slate-600 "
                onClick={handleLogOut}
              >
                <BiLogOut className="left-bar-icon" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default LeftSideBar;
