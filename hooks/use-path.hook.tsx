import { useRouter } from 'next/router';
import React from 'react';

const usePathHook = () => {
  const router = useRouter();
  const path = router.pathname;
  const paths = path.split('/').filter((val) => val !== '');
  return {
    path,
    paths,
    activePath: paths[paths.length - 1],
  };
};

export default usePathHook;
