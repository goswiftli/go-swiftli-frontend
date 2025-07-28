import { Outlet, RouteObject, useLocation } from 'react-router';

import { RouteError } from '@/components/Error';
import { LINKS } from '@/constants';
import { lazyImport } from '@/utils';

import { Layout } from '../Layout';

const { DashboardView } = lazyImport(() => import('./dashboard'), 'DashboardView');
const { KycView } = lazyImport(() => import('./kyc'), 'KycView');
const { WithdrawView } = lazyImport(() => import('./withdraw'), 'WithdrawView');
const { AddBeneficiaryView } = lazyImport(() => import('./add-beneficiary'), 'AddBeneficiaryView');
const { ConvertFundView } = lazyImport(() => import('./convert-funds'), 'ConvertFundView');
const { TransactionsView } = lazyImport(() => import('./transactions'), 'TransactionsView');
const { BeneficiariesView } = lazyImport(() => import('./beneficiaries'), 'BeneficiariesView');
const { PaymentView } = lazyImport(() => import('./payment'), 'PaymentView');

const UserRouteList: RouteObject[] = [
  {
    path: LINKS.DASHBOARD,
    element: <DashboardView />,
  },
  {
    path: LINKS.DASHBOARD + '/' + LINKS.COMPLETE_KYC,
    element: <KycView />,
  },
  {
    path: LINKS.DASHBOARD + '/' + LINKS.WITHDRAW,
    element: <WithdrawView />,
  },
  {
    path: LINKS.DASHBOARD + '/' + LINKS.ADD_BENEFICIARY,
    element: <AddBeneficiaryView />,
  },
  {
    path: LINKS.DASHBOARD + '/' + LINKS.CONVERT_FUNDS,
    element: <ConvertFundView />,
  },
  {
    path: LINKS.TRANSACTIONS,
    element: <TransactionsView />,
  },
  {
    path: LINKS.BENEFICIARIES,
    element: <BeneficiariesView />,
  },
  {
    path: LINKS.MAKE_PAYMENT,
    element: <PaymentView />,
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
