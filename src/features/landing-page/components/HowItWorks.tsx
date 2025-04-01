import {
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';

import { ReactComponent as SignVerifyIcon } from '@/assets/icons/sign-verify.svg';
import { ReactComponent as CheckRateIcon } from '@/assets/icons/check-rate.svg';
import { ReactComponent as MakePaymentIcon } from '@/assets/icons/make-payment.svg';
import { ReactComponent as TrackConfirmIcon } from '@/assets/icons/track-confirm.svg';

export const HowItWorks = () => {
  return (
    <section>
      <Box minH="100vh">
        <Stack w="full" alignItems="center" pos="relative">
          <Box textAlign="center" pb="6em">
            <Text
              fontSize={{ base: '2xl', lg: '3xl', xl: '4xl' }}
              fontFamily="heading"
              fontWeight="normal"
              color="warning.400"
            >
              How It Works
            </Text>
            <Text
              fontSize={{ base: 'lg', lg: '3xl', xl: '4xl' }}
              fontFamily="heading"
              fontWeight="normal"
              color="primary.800"
            >
              Simple & Clear Process
            </Text>
          </Box>
          <SimpleGrid
            columns={2}
            spacingY="14em"
            w="full"
            spacingX={{ base: '4em', md: '5em', lg: '10em', xl: '12em' }}
          >
            <Flex justifySelf="flex-end">
              <Center
                bgColor="primary.50"
                boxSize={{ base: '50px', lg: '120px' }}
                pos="relative"
                rounded="full"
              >
                <Icon as={SignVerifyIcon} viewBox="0 0 50 50" boxSize="64px" />
                {/* <SignVerifyIcon viewBox='0 0 120 120' height='120' width='120' /> */}
              </Center>
            </Flex>
            <Flex justifySelf="flex-start">
              <Box w={{ base: 'full', md: '80%', lg: '60%' }}>
                <HStack spacing={4} pb={4}>
                  <Center
                    boxSize={{ base: '16px', lg: '36px' }}
                    rounded="full"
                    bgColor="primary.800"
                  >
                    <Text
                      fontStyle="lato"
                      fontWeight="normal"
                      fontSize={{ base: 'xs', lg: 'lg' }}
                      color="grey.50"
                    >
                      1
                    </Text>
                  </Center>
                  <Text
                    fontStyle="lato"
                    fontWeight="bold"
                    fontSize={{ base: 'sm', md: 'lg', lg: '2xl' }}
                    color="black.800"
                  >
                    Sign Up & Verify
                  </Text>
                </HStack>
                <Text
                  fontStyle="lato"
                  fontWeight="normal"
                  fontSize={{ base: 'xs', md: 'md', lg: 'lg' }}
                  color="black.800"
                >
                  Sign up in 2 minutes with your business details and complete quick KYC
                </Text>
              </Box>
            </Flex>
            <Flex justifyContent="end" w="full" pl={2}>
              <Box w={{ base: 'full', md: '80%', lg: '60%' }}>
                <HStack spacing={4} pb={4}>
                  <Center
                    boxSize={{ base: '16px', lg: '36px' }}
                    rounded="full"
                    bgColor="primary.800"
                  >
                    <Text
                      fontStyle="lato"
                      fontWeight="normal"
                      fontSize={{ base: 'xs', lg: 'lg' }}
                      color="grey.50"
                    >
                      2
                    </Text>
                  </Center>
                  <Text
                    fontStyle="lato"
                    fontWeight="bold"
                    fontSize={{ base: 'sm', md: 'lg', lg: '2xl' }}
                    color="black.800"
                  >
                    Check Rate
                  </Text>
                </HStack>
                <Text
                  fontStyle="lato"
                  fontWeight="normal"
                  fontSize={{ base: 'xs', md: 'md', lg: 'lg' }}
                  color="black.800"
                >
                  Check today’s exchange rate and convert NGN to USD, CNY, GBP, or EUR
                </Text>
              </Box>
            </Flex>
            <Flex>
              <Center bgColor="primary.50" boxSize="120px" rounded="full" alignItems="center">
                <CheckRateIcon />
              </Center>
            </Flex>
            <Flex justifySelf="flex-end">
              <Center bgColor="primary.150" boxSize="120px" rounded="full" alignItems="center">
                <MakePaymentIcon />
              </Center>
            </Flex>
            <Flex>
              <Box w={{ base: 'full', md: '80%', lg: '60%' }}>
                <HStack spacing={4} pb={4}>
                  <Center
                    boxSize={{ base: '16px', lg: '36px' }}
                    rounded="full"
                    bgColor="primary.800"
                  >
                    <Text
                      fontStyle="lato"
                      fontWeight="normal"
                      fontSize={{ base: 'xs', lg: 'lg' }}
                      color="grey.50"
                    >
                      3
                    </Text>
                  </Center>
                  <Text
                    fontStyle="lato"
                    fontWeight="bold"
                    fontSize={{ base: 'sm', md: 'lg', lg: '2xl' }}
                    color="black.800"
                  >
                    Make Payment
                  </Text>
                </HStack>
                <Text
                  fontStyle="lato"
                  fontWeight="normal"
                  fontSize={{ base: 'xs', md: 'md', lg: 'lg' }}
                  color="black.800"
                >
                  Pay your supplier or withdraw to your local bank account.
                </Text>
              </Box>
            </Flex>
            <Flex justifyContent="end" pl={2}>
              <Box w={{ base: 'full', md: '80%', lg: '60%' }}>
                <HStack spacing={4} pb={4}>
                  <Center
                    boxSize={{ base: '16px', lg: '36px' }}
                    rounded="full"
                    bgColor="primary.800"
                  >
                    <Text
                      fontStyle="lato"
                      fontWeight="normal"
                      fontSize={{ base: 'xs', lg: 'lg' }}
                      color="grey.50"
                    >
                      4
                    </Text>
                  </Center>
                  <Text
                    fontStyle="lato"
                    fontWeight="bold"
                    fontSize={{ base: 'sm', md: 'lg', lg: '2xl' }}
                    color="black.800"
                  >
                    Track & Confirm
                  </Text>
                </HStack>
                <Text
                  fontStyle="lato"
                  fontWeight="normal"
                  fontSize={{ base: 'xs', md: 'md', lg: 'lg' }}
                  color="black.800"
                >
                  Receive an instant payment confirmation
                </Text>
              </Box>
            </Flex>
            <Flex>
              <Center bgColor="primary.150" boxSize="120px" rounded="full" alignItems="center">
                <TrackConfirmIcon />
              </Center>
            </Flex>
          </SimpleGrid>
          <Box
            bgColor="primary.800"
            top="30%"
            zIndex={1}
            position="absolute"
            rounded="full"
            boxSize={{ base: '16px', lg: '42px' }}
          />
          <Box
            bgColor="primary.800"
            top="55%"
            zIndex={1}
            position="absolute"
            rounded="full"
            boxSize={{ base: '16px', lg: '42px' }}
          />
          <Box
            bgColor="primary.800"
            top="80%"
            zIndex={1}
            position="absolute"
            rounded="full"
            boxSize={{ base: '16px', lg: '42px' }}
          />
          <Divider
            position="absolute"
            orientation="vertical"
            h="90%"
            borderWidth="2px"
            borderColor="black.500"
            top="10%"
          />
        </Stack>
        <Box textAlign="center" py="6em">
          <Text
            fontFamily="heading"
            fontWeight="normal"
            fontSize={{ base: '2xl', lg: '3xl', xl: '4xl' }}
            color="warning.400"
          >
            Who We Serve
          </Text>
          <Text
            fontFamily="heading"
            fontWeight="normal"
            fontSize={{ base: 'lg', lg: '3xl', xl: '4xl' }}
            color="primary.800"
          >
            Tailored for Every Business Type
          </Text>
        </Box>
      </Box>
    </section>
  );
};
