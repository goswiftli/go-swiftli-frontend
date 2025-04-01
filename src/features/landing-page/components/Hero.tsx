import { Box, Button, Flex, HStack, Text, VStack } from '@chakra-ui/react';

export const Hero = () => {
  return (
    <section>
      <Box minH="100vh" px={{ base: 4, md: 6, lg: 8, xl: 12 }} py="6em">
        <Flex flexDirection="column" justifyContent="center" alignItems="center">
          <Flex w="fit-content" py={3} px={8} rounded="full" bgColor="primary.50">
            <Text
              fontFamily="body"
              fontSize={{ base: 'sm', md: 'md' }}
              fontWeight="bold"
              color="primary.800"
            >
              Best FX Rates for Business Owners & Freelancers
            </Text>
          </Flex>
          <VStack>
            <Text
              pt={10}
              fontFamily="heading"
              fontWeight="normal"
              fontSize={{ base: '2xl', md: '4xl', lg: '7xl', xl: '8xl' }}
              textAlign="center"
              lineHeight="md"
            >
              Seamless Multi-Currency Payments for
            </Text>
            <Text
              fontFamily="body"
              fontWeight="extrabold"
              fontStyle="italic"
              color="warning.400"
              fontSize={{ base: '2xl', md: '4xl', lg: '7xl', xl: '8xl' }}
            >
              African Businesses & Freelancers
            </Text>
            <Text
              textAlign="center"
              fontWeight="normal"
              fontFamily="body"
              fontSize={{ base: 'sm', md: 'xl', lg: '5xl' }}
              py={10}
            >
              Instant FX Conversion | Fast Vendor Payments | No Stress
            </Text>
          </VStack>

          <HStack spacing={10} w={{ base: 'full', md: '50%', lg: '30%' }}>
            <Button size={{ base: 'sm', lg: 'md' }} w="full">
              Get Started
            </Button>
            <Button w="full" size={{ base: 'sm', lg: 'md' }} variant="secondary">
              Check FX Rates
            </Button>
          </HStack>
        </Flex>
      </Box>
    </section>
  );
};
