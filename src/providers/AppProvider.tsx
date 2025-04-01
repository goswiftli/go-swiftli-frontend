import { ReactNode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './ThemeProvider';
import { ErrorBoundary } from '@/components';

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
