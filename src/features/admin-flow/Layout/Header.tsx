import { Avatar, Box, Flex, HStack, Icon, Text } from '@chakra-ui/react';
import { BiSolidPieChartAlt2 } from 'react-icons/bi';
import { BsFillBellFill } from 'react-icons/bs';
import { MdSettings } from 'react-icons/md';

import { ReactComponent as BeneficiariesIcon } from '@/assets/icons/beneficiaries.svg';
import { ReactComponent as ExchangeIcon } from '@/assets/icons/exchange-icon.svg';
import { ReactComponent as OverviewIcon } from '@/assets/icons/overview-icon.svg';
import { ReactComponent as RoleManIcon } from '@/assets/icons/role-man.svg';
import { ReactComponent as SecurityIcon } from '@/assets/icons/security.svg';
import { ReactComponent as SupportIcon } from '@/assets/icons/support-icon.svg';
import { ReactComponent as TransactionIcon } from '@/assets/icons/transactions.svg';
import { ReactComponent as UserManIcon } from '@/assets/icons/user.svg';
import picture from '@/assets/images/user1.png';
import { LINKS } from '@/constants';

import { Sidebar } from './Sidebar';

type HeaderProps = {
  title: string;
};

export const Header = ({ title }: HeaderProps) => {
  return (
    <header>
      <Box
        bgColor="transparent"
        pl={{ base: 6, md: 8, lg: 10, xl: 14 }}
        pr={{ base: 4, md: 6, lg: 8, xl: 12 }}
      >
        <Flex alignItems="center" justifyContent="space-between" py={6} px={3}>
          <HStack>
            <Box display={{ base: 'block', lg: 'none' }}>
              <Sidebar navItems={navItems} />
            </Box>
            <Box>
              <Text fontFamily="body" fontSize={{ base: '2xl', lg: '4xl' }} fontWeight="semibold">
                {title}
              </Text>
            </Box>
          </HStack>

          <HStack spacing={4} alignItems="center">
            <Icon as={MdSettings} color="grey.400" boxSize="32px" _hover={{ cursor: 'pointer' }} />
            <Icon
              as={BsFillBellFill}
              color="grey.400"
              boxSize="32px"
              _hover={{ cursor: 'pointer' }}
            />
            <Avatar boxSize="42px" src={picture} />
          </HStack>
        </Flex>
      </Box>
    </header>
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
  },
  {
    icon: TransactionIcon,
    item: 'Transactions',
    link: LINKS.TRANSACTIONS,
  },
  {
    icon: BeneficiariesIcon,
    item: 'Beneficiaries',
    link: LINKS.BENEFICIARIES,
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
