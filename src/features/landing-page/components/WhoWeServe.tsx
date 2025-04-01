import { Box, Button, Center, Flex, HStack, Stack, Text } from '@chakra-ui/react';

import { ReactComponent as BriefcaseIcon } from '@/assets/icons/briefcase.svg';
import { ReactComponent as FocusIcon } from '@/assets/icons/focusIcon.svg';
import { ReactComponent as HandIcon } from '@/assets/icons/handIcon.svg';

export const WhoWeServe = () => {
  return (
    <section>
      <Box minH="100vh" bgColor="primary.800" px={{ base: 4, md: 6, lg: 8, xl: 12 }} py={12}>
        <Stack spacing={12}>
          <Stack spacing={12} direction={{ base: 'column', lg: 'row' }}>
            <Stack spacing={12} w={{ base: 'full', lg: '50%' }}>
              <Box
                as={HStack}
                p={{ base: 4, lg: 8 }}
                bgColor="warning.100"
                rounded="1em"
                justifyContent="space-between"
              >
                <Stack spacing={4} w="full">
                  <HStack justifyContent="space-between">
                    <Text
                      fontFamily="lato"
                      fontWeight="bold"
                      fontSize={{ base: 'sm', md: 'lg', lg: '2xl' }}
                    >
                      E-Commerce SMEs & Importers
                    </Text>
                    <Center boxSize="69px" borderRadius="6px" bgColor="white" p={1}>
                      <HandIcon />
                    </Center>
                  </HStack>
                  <Text
                    fontFamily="lato"
                    fontWeight="semibold"
                    fontSize={{ base: 'xs', md: 'sm', lg: 'xl' }}
                    color="black.400"
                  >
                    Get FX instantly & pay suppliers abroad.
                  </Text>
                  <Text
                    fontFamily="lato"
                    fontWeight="semibold"
                    fontSize={{ base: 'xs', md: 'sm', lg: 'xl' }}
                    color="black.400"
                  >
                    No need for a dollar account
                  </Text>
                </Stack>
              </Box>
              <Box
                as={HStack}
                p={{ base: 4, lg: 8 }}
                bgColor="warning.100"
                rounded="1em"
                justifyContent="space-between"
                w="full"
              >
                <Stack spacing={4} w="full">
                  <HStack justifyContent="space-between">
                    <Text
                      fontFamily="lato"
                      fontWeight="bold"
                      fontSize={{ base: 'sm', md: 'lg', lg: '2xl' }}
                    >
                      Freelancers & Remote Workers
                    </Text>
                    <Center boxSize="69px" borderRadius="6px" bgColor="white">
                      <FocusIcon />
                    </Center>
                  </HStack>

                  <Text
                    w={{ base: 'full', md: '80%', lg: '70%' }}
                    fontFamily="lato"
                    fontWeight="semibold"
                    fontSize={{ base: 'xs', md: 'sm', lg: 'xl' }}
                    color="black.400"
                  >
                    Convert USD, GBP, and EUR payments to Naira easily.
                  </Text>
                  <Text
                    fontFamily="lato"
                    fontWeight="semibold"
                    fontSize={{ base: 'xs', md: 'sm', lg: 'xl' }}
                    color="black.400"
                  >
                    No need for PayPal or expensive bank transfers.
                  </Text>
                </Stack>
              </Box>
            </Stack>
            <Box>
              <Flex
                flexDir="column"
                flex={1}
                h="full"
                p={{ base: 4, lg: 8 }}
                bgColor="warning.100"
                rounded="1em"
              >
                <Box h="100%" w="full">
                  <HStack justifyContent="space-between">
                    <Text
                      fontFamily="lato"
                      fontWeight="bold"
                      fontSize={{ base: 'sm', md: 'lg', lg: '2xl' }}
                    >
                      Market Traders (Lagos Island, Alaba, Ladipo, etc.)
                    </Text>
                    <Center boxSize="69px" borderRadius="6px" bgColor="white" p={1}>
                      <BriefcaseIcon />
                    </Center>
                  </HStack>
                  <Text
                    fontFamily="lato"
                    fontWeight="semibold"
                    fontSize={{ base: 'xs', md: 'sm', lg: 'xl' }}
                    color="black.400"
                  >
                    Pay Chinese & Turkish vendors fast
                  </Text>
                  <Text
                    fontFamily="lato"
                    fontWeight="semibold"
                    fontSize={{ base: 'xs', md: 'sm', lg: 'xl' }}
                    color="black.400"
                  >
                    FX at better rates than black market
                  </Text>
                  <Text
                    fontFamily="lato"
                    fontWeight="semibold"
                    fontSize={{ base: 'xs', md: 'sm', lg: 'xl' }}
                    color="black.400"
                  >
                    USSD & WhatsApp payments available
                  </Text>
                </Box>
                <Box pt={10} w="full">
                  <HStack justifyContent="space-between">
                    <Text
                      fontFamily="lato"
                      fontWeight="bold"
                      fontSize={{ base: 'sm', md: 'lg', lg: '2xl' }}
                    >
                      Startups & Businesses Expanding Internationally
                    </Text>
                    <Center boxSize="69px" borderRadius="6px" bgColor="white">
                      <BriefcaseIcon />
                    </Center>
                  </HStack>
                  <Text
                    fontFamily="lato"
                    fontWeight="semibold"
                    fontSize={{ base: 'xs', md: 'sm', lg: 'xl' }}
                    color="black.400"
                  >
                    Pay for ads, software, and global team members
                  </Text>
                  <Text
                    fontFamily="lato"
                    fontWeight="semibold"
                    fontSize={{ base: 'xs', md: 'sm', lg: 'xl' }}
                    color="black.400"
                  >
                    Smooth transactions without high banking fees.
                  </Text>
                </Box>
              </Flex>
            </Box>
          </Stack>
          <Center py={8} borderRadius="1em" bgColor="white">
            <Stack justifyContent="center" alignItems="center" spacing={8}>
              <Text
                fontFamily="lato"
                fontWeight="semibold"
                textAlign="center"
                fontSize={{ base: 'sm', md: 'lg', lg: '2xl' }}
              >
                Join thousands of businesses using GoSwiftli to handle FX & global payments!
              </Text>
              <Button size={{ base: 'sm', md: 'md' }} w={{ base: '50%', lg: '30%' }}>
                Get Started
              </Button>
            </Stack>
          </Center>
        </Stack>
      </Box>
    </section>
  );
};
