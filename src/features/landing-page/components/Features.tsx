import { Box, Flex, Image, SimpleGrid, Stack, Text } from '@chakra-ui/react';

import FastestTranImg from '@/assets/images/fastest-tran-image.png';

export const Features = () => {
  return (
    <section>
      <Box minH="100vh" px={{ base: 4, md: 6, lg: 8, xl: 12 }}>
        <Flex py="6em" flexDir="column" justifyContent="center" textAlign="center" pb="6em">
          <Text
            fontSize={{ base: '2xl', lg: '3xl', xl: '4xl' }}
            fontFamily="heading"
            fontWeight="normal"
            color="warning.400"
          >
            Features
          </Text>
          <Text
            fontFamily="heading"
            fontWeight="normal"
            fontSize={{ base: 'lg', lg: '3xl', xl: '4xl' }}
            color="primary.800"
          >
            What Makes Us Different
          </Text>
        </Flex>
        <Stack
          justifyContent={{ base: 'start', lg: 'space-between' }}
          alignItems="center"
          direction={{ base: 'column', lg: 'row' }}
          spacing={6}
        >
          <SimpleGrid
            order={{ base: 2, lg: 1 }}
            spacing={4}
            w={{ base: 'full', lg: '60%' }}
            columns={{ base: 1, md: 2 }}
          >
            {items.map((item) => (
              <Box key={item.name} p={6} rounded="8px" bgColor="white">
                <Stack spacing={4}>
                  <Box boxSize="60px" rounded="4px" bgColor="warning.100" />
                  <Text
                    fontFamily="lato"
                    fontWeight="bold"
                    fontSize={{ base: 'sm', md: 'lg', lg: '2xl' }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    fontFamily="lato"
                    fontWeight="medium"
                    fontSize={{ base: 'xs', md: 'sm', lg: 'xl' }}
                  >
                    {item.content}
                  </Text>
                </Stack>
              </Box>
            ))}
          </SimpleGrid>
          <Image
            flex={1}
            order={{ base: 1, lg: 2 }}
            src={FastestTranImg}
            alt="fastest-transaction"
          />
        </Stack>
      </Box>
    </section>
  );
};

const items = [
  {
    name: 'Best Exchange Rates',
    content: 'Save money with FX rates',
  },
  {
    name: 'Instant Payments',
    content: 'No delays, no middlemen, no stress',
  },
  {
    name: 'No Hidden Fees',
    content: '100% transparent charges',
  },
  {
    name: 'Pay Vendors in 100+ Countries',
    content: 'USD, GBP, CNY, EUR supported',
  },
];
