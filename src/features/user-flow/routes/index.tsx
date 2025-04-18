import { Outlet, RouteObject, useLocation } from 'react-router';

import { RouteError } from '@/components/Error';
import { LINKS } from '@/constants';
import { lazyImport } from '@/utils';

import { Layout } from '../Layout';

const { DashboardView } = lazyImport(() => import('./dashboard'), 'DashboardView');
const { KycView } = lazyImport(() => import('./kyc'), 'KycView');

const UserRouteList: RouteObject[] = [
  {
    path: LINKS.DASHBOARD,
    element: <DashboardView />,
  },
  {
    path: LINKS.DASHBOARD + '/' + LINKS.COMPLETE_KYC,
    element: <KycView />,
  },
];

const UserRouteOutlet = () => {
  const { pathname } = useLocation();

  const getTitle = () => {
    let title = '';

    if (pathname.includes(LINKS.COMPLETE_KYC)) {
      return (title = 'KYC Verification');
    } else {
      return title;
    }
  };

  return (
    <Layout title={getTitle()}>
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
