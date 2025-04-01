import { Box, Stack, Text } from '@chakra-ui/react';

import { ReactComponent as Logo } from '@/assets/icons/logo.svg';

export const Footer = () => {
  return (
    <footer>
      <Box minH="100vh" px={{ base: 4, md: 6, lg: 8, xl: 12 }} bgColor="white">
        <Stack direction={{ base: 'column', lg: 'row' }} pt="6em" alignItems="start" spacing={12}>
          <Stack w="full" h="full" spacing={6}>
            <Logo />
            <Text fontFamily="body" fontWeight="normal" fontSize="1.25rem">
              GoSwitfli helps businesses and freelancers make seamless international payments for
              purchases from the USA and Europe
            </Text>
          </Stack>
          <Stack w="full" spacing={6}>
            <Text fontFamily="body" fontWeight="medium" fontSize="1.25rem">
              Company
            </Text>
            <Stack spacing={4}>
              <Text fontFamily="body" fontWeight="light" fontSize="1.25rem">
                How it works
              </Text>
              <Text fontFamily="body" fontWeight="light" fontSize="1.25rem">
                Why GoSwiftli?
              </Text>
            </Stack>
          </Stack>
          <Stack w="full" spacing={6}>
            <Text fontFamily="body" fontWeight="medium" fontSize="1.25rem">
              Legal
            </Text>
            <Stack spacing={4}>
              <Text fontFamily="body" fontWeight="light" fontSize="1.25rem">
                Terms and condition
              </Text>
              <Text fontFamily="body" fontWeight="light" fontSize="1.25rem">
                Privacy policy
              </Text>
              <Text fontFamily="body" fontWeight="light" fontSize="1.25rem">
                FAQs
              </Text>
            </Stack>
          </Stack>
          <Stack w="full" spacing={6}>
            <Text fontFamily="body" fontWeight="medium" fontSize="1.25rem">
              Contact support
            </Text>
            <Stack spacing={4}>
              <Text fontFamily="body" fontWeight="light" fontSize="1.25rem">
                Twitter
              </Text>
              <Text fontFamily="body" fontWeight="light" fontSize="1.25rem">
                LinkedIn
              </Text>
              <Text fontFamily="body" fontWeight="light" fontSize="1.25rem">
                Instagram
              </Text>
            </Stack>
          </Stack>
          <Stack w="full" spacing={6}>
            <Text fontFamily="body" fontWeight="medium" fontSize="1.25rem">
              Offices
            </Text>
            <Stack spacing={4}>
              <Text fontFamily="body" fontWeight="semibold" fontSize="1.25rem">
                Nigerian office:
              </Text>
              <Text fontFamily="body" fontWeight="light" fontSize="1.25rem">
                82b, Younis Bashorun street, Victoria Island.
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </footer>
  );
};
