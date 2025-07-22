import { Grid, GridItem, Stack } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { ReactComponent as BeneficiariesIcon } from '@/assets/icons/beneficiaries.svg';
import { ReactComponent as DashboardIcon } from '@/assets/icons/overview-icon.svg';
import { ReactComponent as PaymentIcon } from '@/assets/icons/payment-icon.svg';
import { ReactComponent as TransactionIcon } from '@/assets/icons/transactions.svg';
import { LINKS } from '@/constants';
import { Header, Sidebar } from '@/features/admin-flow';

export const Layout = ({ children, title }: { children: ReactNode; title?: string }) => {
  return (
    <Grid
      templateAreas={{
        base: `"header" "main"`,
        lg: `"sidebar main"`,
      }}
      gridTemplateColumns={{ base: '1fr', lg: '25% 1fr', xl: '20% 1fr' }}
      h="100vh"
    >
      <GridItem
        area="sidebar"
        display={{ base: 'none', lg: 'block' }}
        h="100vh"
        overflowY="auto"
        zIndex="1"
      >
        <Sidebar navItems={navItems} />
      </GridItem>

      <GridItem area="main" overflowY="auto" bgColor="blue.200">
        <Stack>
          <Header isUser navItemsUser={navItems} title={title ?? ''} />
          {children}
        </Stack>
      </GridItem>
    </Grid>
  );
};

const navItems = [
  {
    icon: DashboardIcon,
    item: 'Dashboard',
    link: ('/user' + '/' + LINKS.DASHBOARD) as LINKS,
  },
  {
    icon: PaymentIcon,
    item: 'Payment',
    link: LINKS.PAYMENT,
  },
  {
    icon: TransactionIcon,
    item: 'Transactions',
    link: ('/user' + '/' + LINKS.TRANSACTIONS) as LINKS,
  },
  {
    icon: BeneficiariesIcon,
    item: 'Beneficiaries',
    link: ('/user' + '/' + LINKS.BENEFICIARIES) as LINKS,
  },
];
