import { Box, Flex, HStack, Link as ChakraLink, Button, Text, Image } from '@chakra-ui/react';
import { Link } from 'react-router';

import logoImg from '@/assets/images/logo.png';
import { LINKS } from '@/constants';

export const Header = () => {
  return (
    <header>
      <Flex justifyContent="center" alignItems="center" pt={10}>
        <Flex boxShadow="sm" w={{ lg: '80%' }} bgColor="white" borderRadius="full" py={3}>
          <HStack justifyContent="space-between" w="full">
            <Box pl={{ md: '4em', lg: '5em' }}>
              <HStack>
                <Image src={logoImg} h="57px" w="46px" />
                <Text fontFamily="lato" fontWeight="extrabold" fontSize="4xl" color="black.600">
                  goswiftli
                </Text>
              </HStack>
            </Box>
            <HStack pr={10} justifyContent="flex-end" spacing={12} w="full">
              <HStack spacing={12}>
                <ChakraLink
                  as={Link}
                  to={LINKS.HOME}
                  fontStyle="body"
                  fontWeight="medium"
                  fontSize="lg"
                >
                  Home
                </ChakraLink>
                <ChakraLink
                  fontStyle="body"
                  as={Link}
                  to={LINKS.HOME}
                  fontWeight="medium"
                  fontSize="lg"
                >
                  How it works
                </ChakraLink>
                <ChakraLink
                  as={Link}
                  to={LINKS.HOME}
                  fontStyle="body"
                  fontWeight="medium"
                  fontSize="lg"
                >
                  FAQ
                </ChakraLink>
              </HStack>
              <HStack w={{ lg: '30%' }}>
                <Button w="40%" variant="secondary">
                  Login
                </Button>
                <Button w="60%" variant="primary">
                  Create Account
                </Button>
              </HStack>
            </HStack>
          </HStack>
        </Flex>
      </Flex>
    </header>
  );
};
