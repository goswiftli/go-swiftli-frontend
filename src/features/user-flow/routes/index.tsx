import { Outlet, RouteObject } from 'react-router';

import { RouteError } from '@/components/Error';
import { LINKS } from '@/constants';
import { lazyImport } from '@/utils';

import { Layout } from '../Layout';

const { DashboardView } = lazyImport(() => import('./dashboard'), 'DashboardView');
const UserRouteList: RouteObject[] = [
  {
    path: LINKS.DASHBOARD,
    element: <DashboardView />,
  },
];

const UserRouteOutlet = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export const UserRoutes: RouteObject = {
  path: 'user',
  element: <UserRouteOutlet />,
  errorElement: <RouteError />,
  children: UserRouteList,
};
