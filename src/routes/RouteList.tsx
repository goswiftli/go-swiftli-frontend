import { Box } from '@chakra-ui/react';
import { Suspense } from 'react';
import { Outlet, RouteObject } from 'react-router';

import { LogoLoader, RouteError } from '@/components';
import { AdminRoutes } from '@/features/admin-flow';
import { AuthRoutes } from '@/features/auth';
import { LandingPageRoutes } from '@/features/landing-page';

import { BaseApp } from './BaseApp';

export const App = () => {
  return (
    <Suspense
      fallback={
        <Box h={'100vh'}>
          <LogoLoader text="Loading App" />
        </Box>
      }
    >
      <Outlet />
    </Suspense>
  );
};

export const AppRoutes: RouteObject = {
  path: '',
  element: <App />,
  children: [LandingPageRoutes, AuthRoutes],
  errorElement: <RouteError />,
};

// eslint-disable-next-line react-refresh/only-export-components
export const RoutesList: RouteObject[] = [
  {
    path: '',
    element: <BaseApp />,
    errorElement: <RouteError />,
    children: [AppRoutes, AdminRoutes],
  },
];
