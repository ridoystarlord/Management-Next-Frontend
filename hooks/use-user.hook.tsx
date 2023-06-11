import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';

import { ROUTES } from 'Routes';
import { getUser } from 'services/authService';

const useUserHook = () => {
  const { api, getKey } = getUser();
  const router = useRouter();
  const response = useQuery(getKey(), api, {
    onError: (error) => {
      toast.error('Failed to load user data', {
        id: 'user-data-error',
      });
      router.push(ROUTES.HOME);
    },
  });

  return response;
};

export default useUserHook;
