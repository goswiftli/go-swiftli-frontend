import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  Stack,
  useDisclosure,
  Flex,
  HStack,
  Image,
  Text,
  Box,
  useBreakpointValue,
} from '@chakra-ui/react';
import { MdOutlineMenu } from 'react-icons/md';
import { NavLink, useNavigate } from 'react-router';

import { ReactComponent as SupportIcon } from '@/assets/icons/help-support.svg';
import { ReactComponent as LogoutIcon } from '@/assets/icons/logout.svg';
import logoImg from '@/assets/images/logo.png';
import { LINKS } from '@/constants';
import { clearStorageValues } from '@/utils';

type SidebarProps = {
  navItems: {
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    item: string;
    link: LINKS;
    action?: () => void;
  }[];
};

export const Sidebar = ({ navItems }: SidebarProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const navigate = useNavigate();

  const logoutHandler = () => {
    navigate(LINKS.LOGIN);
    clearStorageValues();
  };

  const SidebarContent = (
    <Stack
      spacing={3}
      w={{ base: 'full', lg: '25%', xl: '20%' }}
      h="100vh"
      boxShadow="sm"
      pos={{ lg: 'fixed' }}
      overflowY="auto"
      overflowX="hidden"
      sx={scrollbarSx}
      pr={3}
    >
      <HStack pb={12} px={6} pt={12}>
        <Image src={logoImg} h="57px" w="34px" />
        <Text fontFamily="lato" fontWeight="semibold" fontSize="4xl" color="black.600">
          goswiftli
        </Text>
      </HStack>
      {navItems.map((item) => (
        <Box
          key={item.item}
          to={item.link}
          onMouseEnter={item.action}
          _hover={{
            bgColor: 'primary.800',
            borderRightRadius: 'full',
            pl: 6,
            color: 'white',
            py: '6px',
            cursor: 'pointer',
            '& svg path': {
              fill: 'white',
              fillOpacity: 1,
            },
          }}
          w="full"
          pl={6}
          py="6px"
          as={NavLink}
          _activeLink={{
            bgColor: 'primary.800',
            borderRightRadius: 'full',
            pl: 6,
            color: 'white',
            py: '6px',
            cursor: 'pointer',
            '& svg path': {
              fill: 'white',
              fillOpacity: 1,
            },
          }}
        >
          <HStack alignItems="start" spacing={4}>
            <Icon
              boxSize={6}
              as={item.icon}
              color="white"
              sx={{
                path: {
                  fill: 'black',
                  fillOpacity: 0.7,
                },
              }}
            />
            <Text fontFamily="body" fontSize="md">
              {item.item}
            </Text>
          </HStack>
        </Box>
      ))}

      <Stack pl={6} w="full" spacing={5} py={12}>
        <HStack spacing={4} _hover={{ cursor: 'pointer' }}>
          <Icon
            boxSize={9}
            as={SupportIcon}
            sx={{
              path: {
                fill: 'black',
                fillOpacity: 1,
              },
            }}
          />
          <Text fontFamily="inter" fontSize="lg">
            Help & Support
          </Text>
        </HStack>

        <HStack spacing={4} _hover={{ cursor: 'pointer' }} onClick={logoutHandler}>
          <Icon
            boxSize={9}
            color="white"
            sx={{
              path: {
                fill: 'black',
                fillOpacity: 1,
              },
            }}
            as={LogoutIcon}
          />
          <Text fontFamily="inter" fontSize="lg">
            Logout
          </Text>
        </HStack>
      </Stack>
    </Stack>
  );

  if (isMobile) {
    return (
      <Flex>
        <Icon as={MdOutlineMenu} boxSize="26px" onClick={onOpen} _hover={{ cursor: 'pointer' }} />
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton _hover={{ cursor: 'pointer' }} />
            <DrawerHeader />
            <DrawerBody>{SidebarContent}</DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    );
  }

  return SidebarContent;
};

const scrollbarSx = {
  '&::-webkit-scrollbar': {
    height: '3px',
    position: 'sticky',
    top: '0',
    backgroundColor: '#ccc',
    opacity: '0.3',
    width: '3px',
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '4px',
    backgroundColor: '#C1C1C1',
    boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
  },
};
