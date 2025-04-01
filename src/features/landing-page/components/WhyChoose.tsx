import { Box, Card, CardBody, Flex, Image, SimpleGrid, Text } from '@chakra-ui/react';

import customerSupportImg from '@/assets/images/customer-support-img.png';
import fastSecureTranImg from '@/assets/images/fast-group-tran-img.png';
import salesImg from '@/assets/images/sales-reliable-img.png';
import transparentImg from '@/assets/images/trans-low-fees-img.png';

export const WhyChoose = () => {
  return (
    <section>
      <Box minH="100vh">
        <Flex py="6em" flexDir="column" justifyContent="center" textAlign="center" pb="6em">
          <Text
            fontFamily="heading"
            fontWeight="normal"
            fontSize={{ base: '2xl', lg: '3xl', xl: '4xl' }}
            color="warning.400"
          >
            Why Choose GoSwiftly?
          </Text>
          <Text
            fontSize={{ base: 'lg', lg: '3xl', xl: '4xl' }}
            fontFamily="heading"
            fontWeight="normal"
            color="primary.800"
          >
            Trust & Social Proof
          </Text>
        </Flex>
        <Flex justifyContent="center">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="80%">
            {items.map((item) => (
              <Card key={item.name} border="1px solid" borderColor="black" rounded="1em">
                <CardBody>
                  <Image w="full" src={item.img} alt={item.name} />
                  <Box pt={10} pb={4}>
                    <Text
                      fontFamily="body"
                      fontSize={{ base: '2xl', lg: '4xl', xl: '2.5rem' }}
                      fontWeight="extrabold"
                    >
                      {item.name}
                    </Text>
                    <Text
                      fontFamily="body"
                      fontSize={{ base: 'md', lg: '2xl' }}
                      fontWeight="normal"
                    >
                      {item.description}
                    </Text>
                  </Box>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </Flex>
      </Box>
    </section>
  );
};

const items = [
  {
    name: 'Fast & Secure Transactions',
    description: 'Payments processed within minutes',
    img: fastSecureTranImg,
  },
  {
    name: 'Transparent & Low Fees',
    description: 'No inflated exchange rates',
    img: transparentImg,
  },
  {
    name: '24/7 Customer Support',
    description: 'Always available to assist with transactions.',
    img: customerSupportImg,
  },
  {
    name: 'Sales & Reliable',
    description: 'Trusted by car dealers across Nigeria',
    img: salesImg,
  },
];
