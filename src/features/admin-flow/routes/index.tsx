import { Outlet, RouteObject } from 'react-router';

import { RouteError } from '@/components/Error';
import { LINKS } from '@/constants';
import { lazyImport } from '@/utils';

import { Layout } from '../Layout';

const { OverviewView } = lazyImport(() => import('./overview'), 'OverviewView');
const { UserManagementView } = lazyImport(() => import('./user-management'), 'UserManagementView');
const { UserDetailsView } = lazyImport(() => import('./user-details'), 'UserDetailsView');

const AdminRouteList: RouteObject[] = [
  {
    path: LINKS.OVERVIEW,
    element: <OverviewView />,
  },
  {
    path: LINKS.USER_MANAGEMENT,
    element: <UserManagementView />,
  },
  {
    path: LINKS.USER_MANAGEMENT + '/' + LINKS.USER_DETAILS,
    element: <UserDetailsView />,
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
