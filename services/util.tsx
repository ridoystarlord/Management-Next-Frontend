import { QueryCache, QueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { ROUTES } from 'Routes';
import { isAxiosError } from 'utils/error';
const defaultQueryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (err, query) => {
      if (isAxiosError(err)) {
        if (err?.response?.status === 401 && typeof window !== 'undefined') {
          // redirect to sign in page
          // get path from window.location
          const path = window.location.pathname;
          window.location.href = `${ROUTES.HOME}?redirect=${path}`;
          return;
        }
        if (err?.response?.status === 400) {
          toast.error(`Validation Error`, {
            id: `validationError`,
          });
          return;
        }
        if (
          err?.response?.status != null &&
          err?.response?.status >= 400 &&
          err?.response?.status < 500
        ) {
          toast.error(err.message ?? 'Error', {
            id: 'server error',
          });
        }
      }
    },
  }),
});

defaultQueryClient.setDefaultOptions({
  queries: {
    staleTime: 0,
    notifyOnChangeProps: ['data', 'error'],
  },
  mutations: {
    onError: (err, mutation) => {
      if (isAxiosError(err)) {
        if (err?.response?.status === 401 && typeof window !== 'undefined') {
          // redirect to sign in page
          // get path from window.location
          const path = window.location.pathname;
          window.location.href = `${ROUTES.HOME}?redirect=${path}`;
          return;
        }
        if (err?.response?.status === 400) {
          toast.error(`Validation Error`, {
            id: `validation-error`,
          });
          return;
        }
        if (
          err?.response?.status != null &&
          err?.response?.status >= 400 &&
          err?.response?.status < 500
        ) {
          toast.error(err?.message ?? 'Error', {
            id: 'server error',
          });
        }
      }
    },
  },
});

export { defaultQueryClient };
