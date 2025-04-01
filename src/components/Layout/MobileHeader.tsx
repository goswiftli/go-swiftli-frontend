import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  Link as ChakraLink,
  Stack,
  useDisclosure,
  Flex,
  HStack,
  Image,
  Text,
  Divider,
  Button,
  Box,
} from '@chakra-ui/react';
import { Link } from 'react-router';

import logoImg from '@/assets/images/logo.png';

import { MdOutlineMenu, MdClose } from 'react-icons/md';
import { LINKS } from '@/constants';

export const MobileHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex justifyContent="center" alignItems="center" pt={10}>
        <Flex boxShadow="sm" w="90%" bgColor="white" borderRadius="full">
          <HStack justifyContent="space-between" w="full" p={3}>
            <HStack>
              <Image src={logoImg} h="32px" w="20px" />
              <Text fontFamily="lato" fontWeight="semibold" fontSize="md" color="black.600">
                goswiftli
              </Text>
            </HStack>
            <Icon
              as={MdOutlineMenu}
              boxSize="26px"
              onClick={onOpen}
              _hover={{ cursor: 'pointer' }}
            />
          </HStack>
        </Flex>
      </Flex>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton as={MdClose} _hover={{ cursor: 'pointer' }} />
          <DrawerHeader pb={12}>
            <HStack pt={8}>
              <Image src={logoImg} h="32px" w="20px" />
              <Text fontFamily="lato" fontWeight="semibold" fontSize="md" color="black.600">
                goswiftli
              </Text>
            </HStack>
          </DrawerHeader>
          <DrawerBody as={Stack} spacing={6}>
            {navItems.map((item) => (
              <Box key={item.item} _hover={{ bgColor: 'primary.100', p: 3 }}>
                <ChakraLink textDecoration="none" to={item.link} as={Link}>
                  {item.item}
                </ChakraLink>
              </Box>
            ))}
            <Divider borderWidth="1px" borderColor="black.800" />
            <HStack>
              <Button w="40%" variant="secondary">
                Login
              </Button>
              <Button w="60%" variant="primary">
                Create Account
              </Button>
            </HStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const navItems = [
  {
    item: 'Home',
    link: LINKS.HOME,
  },
  {
    item: 'How it starts',
    link: LINKS.HOME,
  },
  {
    item: 'FAQ',
    link: LINKS.HOME,
  },
];
