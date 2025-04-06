import { Outlet, RouteObject } from 'react-router';

import { RouteError } from '@/components/Error';
import { LINKS } from '@/constants';
import { lazyImport } from '@/utils';

import { Layout } from '../Layout';

const { OverviewView } = lazyImport(() => import('./overview'), 'OverviewView');

const AdminRouteList: RouteObject[] = [
  {
    path: LINKS.OVERVIEW,
    element: <OverviewView />,
  },
];

const AdminRouteOutlet = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export const AdminRoutes: RouteObject = {
  path: '',
  element: <AdminRouteOutlet />,
  errorElement: <RouteError />,
  children: AdminRouteList,
};
