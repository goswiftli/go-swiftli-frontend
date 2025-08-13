import { Box, Grid, GridItem, Stack } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { BiSolidPieChartAlt2 } from 'react-icons/bi';

import { ReactComponent as BeneficiariesIcon } from '@/assets/icons/beneficiaries.svg';
import { ReactComponent as ExchangeIcon } from '@/assets/icons/exchange-icon.svg';
import { ReactComponent as OverviewIcon } from '@/assets/icons/overview-icon.svg';
import { ReactComponent as RoleManIcon } from '@/assets/icons/role-man.svg';
import { ReactComponent as SecurityIcon } from '@/assets/icons/security.svg';
import { ReactComponent as SupportIcon } from '@/assets/icons/support-icon.svg';
import { ReactComponent as TransactionIcon } from '@/assets/icons/transactions.svg';
import { ReactComponent as UserManIcon } from '@/assets/icons/user.svg';
import { LINKS } from '@/constants';

import { prefetchUsers } from '../apis';

import { Header } from './Header';
import { Sidebar } from './Sidebar';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Grid
      templateAreas={{
        base: `"header" "main"`,
        lg: `"sidebar main"`,
      }}
      gridTemplateColumns={{ base: '1fr', lg: '25% 1fr', xl: '20% 1fr' }}
      h="100vh"
    >
      <GridItem area="sidebar" display={{ base: 'none', lg: 'block' }} zIndex="1">
        <Sidebar navItems={navItems} />
      </GridItem>

      <GridItem area="main" bgColor="blue.200">
        <Stack>
          <Header />
          <Box h="90vh" className="scrollable-element" overflowY="auto">
            {children}
          </Box>
        </Stack>
      </GridItem>
    </Grid>
  );
};

const navItems = [
  {
    icon: OverviewIcon,
    item: 'Overview',
    link: LINKS.OVERVIEW,
  },
  {
    icon: UserManIcon,
    item: 'User Management',
    link: LINKS.USER_MANAGEMENT,
    action: prefetchUsers,
  },
  {
    icon: TransactionIcon,
    item: 'Transactions',
    link: ('/' + LINKS.TRANSACTIONS) as LINKS,
  },
  {
    icon: BeneficiariesIcon,
    item: 'Beneficiaries',
    link: ('/' + LINKS.BENEFICIARIES) as LINKS,
  },
  {
    icon: ExchangeIcon,
    item: 'Exchange Management',
    link: LINKS.EXCHANGE_MANAGEMENT,
  },
  {
    icon: BiSolidPieChartAlt2,
    item: 'Reports & Analytics',
    link: LINKS.REPORT_ANALYSIS,
  },
  {
    icon: SupportIcon,
    item: 'Customer Support',
    link: LINKS.CUSTOMER_SUPPORT,
  },
  {
    icon: SecurityIcon,
    item: 'Security & Compliance',
    link: LINKS.SECURITY_COMPLIANCE,
  },
  {
    icon: RoleManIcon,
    item: 'Role Management',
    link: LINKS.ROLE_MANAGEMENT,
  },
];
