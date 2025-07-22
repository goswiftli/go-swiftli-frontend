import { Outlet, RouteObject } from 'react-router';

import { RouteError } from '@/components/Error';
import { LINKS } from '@/constants';
import { Layout } from '@/features/user-flow';
import { lazyImport } from '@/utils';

const { SettingsView } = lazyImport(() => import('./settings'), 'SettingsView');
const { ProfileView } = lazyImport(() => import('./profile'), 'ProfileView');

const SharedRouteList: RouteObject[] = [
  {
    path: LINKS.SETTINGS,
    element: <SettingsView />,
  },
  {
    path: LINKS.PROFILE,
    element: <ProfileView />,
  },
];

const SharedRouteOutlet = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export const SharedRoutes: RouteObject = {
  path: '',
  element: <SharedRouteOutlet />,
  errorElement: <RouteError />,
  children: SharedRouteList,
};
