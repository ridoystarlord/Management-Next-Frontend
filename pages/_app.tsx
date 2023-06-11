import 'styles/globals.css';
import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

import { defaultQueryClient } from 'services/util';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => defaultQueryClient);
  const getLayout = (Component as any).getLayout || ((page: any) => page);
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        {/* <Script src="/scripts/snow.js" strategy="worker" /> */}
        {getLayout(<Component {...pageProps} />)}
        <Toaster position="bottom-right" reverseOrder={false} />
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
