import { Outlet, RouteObject } from 'react-router';

import { RouteError } from '@/components/Error';
import { LINKS } from '@/constants';
import { lazyImport } from '@/utils';

const { SignupView } = lazyImport(() => import('./sign-up'), 'SignupView');
const { VerifyEmailView } = lazyImport(() => import('./verify-email'), 'VerifyEmailView');
const { LoginView } = lazyImport(() => import('./login'), 'LoginView');
const { ForgotPasswordView } = lazyImport(() => import('./forgot-password'), 'ForgotPasswordView');
const { ChangePasswordView } = lazyImport(() => import('./change-password'), 'ChangePasswordView');

const AuthRouteList: RouteObject[] = [
  {
    path: LINKS.CREATE_ACCOUNT,
    element: <SignupView />,
  },
  {
    path: LINKS.VERIFY_EMAIL,
    element: <VerifyEmailView />,
  },
  {
    path: LINKS.LOGIN,
    element: <LoginView />,
  },
  {
    path: LINKS.FORGOT_PASSWORD,
    element: <ForgotPasswordView />,
  },
  {
    path: LINKS.CHANGE_PASSWORD,
    element: <ChangePasswordView />,
  },
];

const AuthRouteOutlet = () => {
  return <Outlet />;
};

export const AuthRoutes: RouteObject = {
  path: '',
  element: <AuthRouteOutlet />,
  errorElement: <RouteError />,
  children: AuthRouteList,
};
