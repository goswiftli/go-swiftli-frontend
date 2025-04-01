import { Outlet, RouteObject } from 'react-router';

import { Layout, RouteError } from '@/components';
import { lazyImport } from '@/utils';

const { LandingPageView } = lazyImport(() => import('./LandingPage'), 'LandingPageView');

const LandingPageRouteList: RouteObject[] = [
  {
    index: true,
    element: <LandingPageView />,
  },
];

const LandingPageRouteOutlet = () => (
  <Layout>
    <Outlet />
  </Layout>
);

export const LandingPageRoutes: RouteObject = {
  path: '',
  element: <LandingPageRouteOutlet />,
  errorElement: <RouteError />,
  children: LandingPageRouteList,
};
