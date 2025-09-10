import { Outlet, RouteObject } from 'react-router';

import { RouteError } from '@/components/Error';
import { LINKS } from '@/constants';
import { Layout as AdminLayout } from '@/features/admin-flow';
import { Layout as UserLayout } from '@/features/user-flow';
import { useAppSelector } from '@/redux';
import { lazyImport, permissionGuard } from '@/utils';

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
  const { authUser } = useAppSelector((state) => state.auth);
  const isAdminLayout = permissionGuard(authUser.roles);

  const Layout = isAdminLayout ? AdminLayout : UserLayout;
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
