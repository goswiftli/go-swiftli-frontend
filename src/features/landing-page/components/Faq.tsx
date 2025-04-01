import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';

import faqImg from '@/assets/images/faq-image.jpg';
import { FaPlus, FaMinus } from 'react-icons/fa6';

export const Faq = () => {
  return (
    <section>
      <Box minH="100vh" px={{ base: 4, md: 6, lg: 8, xl: 12 }}>
        <Stack direction={{ base: 'column', lg: 'row' }} spacing={10}>
          <Image width={{ base: 'full', lg: '50%' }} src={faqImg} />
          <Stack flex={1} spacing={12}>
            <Box>
              <Text
                fontFamily="heading"
                fontWeight="normal"
                fontSize={{ base: '3xl', lg: '6xl', xl: '3rem' }}
              >
                Frequently Asked Questions
              </Text>
              <Text fontFamily="lato" fontWeight="normal" fontSize="xl">
                Questions you might ask about our products and services
              </Text>
            </Box>
            <Accordion allowToggle as={Stack} spacing={12}>
              {faqItems.map((item) => (
                <AccordionItem key={item.faq} border="none">
                  {({ isExpanded }) => (
                    <>
                      <AccordionButton
                        p={0}
                        bgColor="transparent"
                        _hover={{ bgColor: 'transparent' }}
                      >
                        <Text
                          textAlign="left"
                          flex="1"
                          fontFamily="lato"
                          fontWeight="medium"
                          fontSize={{ base: 'md', md: 'lg', lg: '2xl' }}
                        >
                          {item.faq}
                        </Text>
                        <AccordionIcon as={isExpanded ? FaMinus : FaPlus} />
                      </AccordionButton>

                      <AccordionPanel
                        fontFamily="body"
                        color="black.500"
                        fontSize={{ base: '', lg: 'xl' }}
                        fontWeight="medium"
                      >
                        {item.answer}
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              ))}
            </Accordion>
            <Text fontFamily="body" fontSize="xl" fontWeight="bold" pb={12}>
              Need more answers? Visit our Help Center.
            </Text>
            <Button w="30%">Contact us</Button>
          </Stack>
        </Stack>
      </Box>
    </section>
  );
};

const faqItems = [
  {
    faq: 'How long do transactions take?',
    answer: 'How long do transactions take?',
  },
  {
    faq: 'Do I need a dollar account?',
    answer: 'Do I need a dollar account?',
  },
  {
    faq: 'How do I contact support?',
    answer: 'How do I contact support?',
  },
  {
    faq: 'How long does a transaction take?',
    answer: 'How long does a transaction take?',
  },
];
