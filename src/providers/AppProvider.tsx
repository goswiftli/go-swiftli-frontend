import { ReactNode } from 'react';
import { HelmetProvider } from 'react-helmet-async';

import { ErrorBoundary } from '@/components';

import { ThemeProvider } from './ThemeProvider';

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ThemeProvider>
      <HelmetProvider>
        <ErrorBoundary>{children}</ErrorBoundary>
      </HelmetProvider>
    </ThemeProvider>
  );
};
