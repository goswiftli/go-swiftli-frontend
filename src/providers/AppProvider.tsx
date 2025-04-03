import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { lazy, ReactNode, Suspense, useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';

import { ErrorBoundary } from '@/components';

import { ThemeProvider } from './ThemeProvider';

type AppProviderProps = {
  children: ReactNode;
};

const ReactQueryDevtoolsProduction = lazy(() =>
  import('@tanstack/react-query-devtools').then((d) => ({
    default: d.ReactQueryDevtools,
  }))
);
export const AppProvider = ({ children }: AppProviderProps) => {
  const [showDevtools, setShowDevtools] = useState(false);

  useEffect(() => {
    // @ts-ignore
    window.toggleDevtools = () => setShowDevtools((old) => !old);
  }, []);

  const queryClient = new QueryClient();
  return (
    <ThemeProvider>
      <HelmetProvider>
        <ErrorBoundary>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
            {showDevtools && (
              <Suspense fallback={null}>
                <ReactQueryDevtoolsProduction />
              </Suspense>
            )}
          </QueryClientProvider>
        </ErrorBoundary>
      </HelmetProvider>
    </ThemeProvider>
  );
};
