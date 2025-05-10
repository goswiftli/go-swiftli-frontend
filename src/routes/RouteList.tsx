import { Box } from '@chakra-ui/react';
import { Suspense, useCallback } from 'react';
import { Navigate, Outlet, RouteObject, useLocation } from 'react-router';

import { LogoLoader, RouteError } from '@/components';
import { LINKS } from '@/constants';
import { AdminRoutes } from '@/features/admin-flow';
import { AuthRoutes } from '@/features/auth';
import { LandingPageRoutes } from '@/features/landing-page';
import { UserRoutes } from '@/features/user-flow';
import { useAppSelector } from '@/redux';
import { storage } from '@/utils';

import { BaseApp } from './BaseApp';

import { SharedRoutes } from '@/features/shared';

export const App = () => {
  const location = useLocation();
  const { token } = useAppSelector((state) => state.auth);

  const saveRoute = useCallback(() => {
    storage.session.setValue('redirect-path', location.pathname);
  }, [location]);

  if (!token) {
    saveRoute();
    return <Navigate to={LINKS.LOGIN} replace />;
  }
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
  children: [AdminRoutes, UserRoutes, SharedRoutes],
  errorElement: <RouteError />,
};

// eslint-disable-next-line react-refresh/only-export-components
export const RoutesList: RouteObject[] = [
  {
    path: '',
    element: <BaseApp />,
    errorElement: <RouteError />,
    children: [LandingPageRoutes, AuthRoutes, AppRoutes],
  },
];
