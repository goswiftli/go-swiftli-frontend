import {
  Avatar,
  Box,
  Flex,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { BiSolidPieChartAlt2 } from 'react-icons/bi';
import { BsFillBellFill } from 'react-icons/bs';
import { MdSettings } from 'react-icons/md';
import { Link, useLocation, useNavigate } from 'react-router';

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
import { logout } from '@/features/auth';
import { useAppDispatch, useAppSelector } from '@/redux';
import { convertUnderscoreToSpace } from '@/utils';

import { prefetchUserDetails } from '../apis';

import { Sidebar } from './Sidebar';

type HeaderProps = {
  title?: string;
  navItemsUser?: {
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    item: string;
    link: LINKS;
  }[];
  isUser?: boolean;
};

export const Header = ({ navItemsUser, isUser = false, title: headerTitle }: HeaderProps) => {
  const navigate = useNavigate();
  const { authUser } = useAppSelector((state) => state.auth);

  const handleNavigate = () => {
    navigate(LINKS.SETTINGS);
  };

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const prefetchUser = () => {
    prefetchUserDetails(authUser.id);
  };
  const adminMenuItems = [
    {
      item: 'Profile',
      link: LINKS.PROFILE,
      action: prefetchUser,
    },
    {
      item: 'Logout',
      action: handleLogout,
    },
  ];

  const userMenuItems = [
    {
      item: 'Profile',
      link: LINKS.PROFILE,
    },
    {
      item: 'Logout',
      action: handleLogout,
    },
  ];

  const menuItems = isUser ? userMenuItems : adminMenuItems;

  const location = useLocation();
  const title = convertUnderscoreToSpace(location.pathname.split('/')[1]);
  return (
    <header>
      <Box
        bgColor="transparent"
        pl={{ base: 6, md: 8, lg: 10, xl: 14 }}
        pr={{ base: 4, md: 6, lg: 8, xl: 12 }}
      >
        <Flex alignItems="center" justifyContent="space-between" py={8} px={3}>
          <HStack>
            <Box display={{ base: 'block', lg: 'none' }}>
              <Sidebar navItems={navItemsUser || navItems} />
            </Box>
            <Box>
              <Text fontFamily="body" fontSize={{ base: 'xl', lg: '3xl' }} fontWeight="semibold">
                {headerTitle ?? title}
              </Text>
            </Box>
          </HStack>

          <HStack spacing={4} alignItems="center">
            <Box _hover={{ cursor: 'pointer' }} onClick={handleNavigate}>
              <Icon as={MdSettings} color="grey.400" boxSize="32px" />
            </Box>

            <Icon
              as={BsFillBellFill}
              color="grey.400"
              boxSize="32px"
              _hover={{ cursor: 'pointer' }}
            />
            {menuItems && (
              <Menu>
                <MenuButton>
                  <Avatar boxSize="42px" src={picture} />
                </MenuButton>
                <MenuList px={2} color="black.500">
                  {menuItems?.map((item) => (
                    <MenuItem
                      fontSize="md"
                      as={Link}
                      to={item.link}
                      key={item.item}
                      onClick={item?.action}
                    >
                      {item.item}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            )}
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
