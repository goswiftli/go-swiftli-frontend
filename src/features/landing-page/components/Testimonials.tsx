import { Avatar, Box, Flex, HStack, Icon, Stack, Text, useBreakpointValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { MdArrowCircleLeft, MdArrowCircleRight } from 'react-icons/md';

import { ReactComponent as BlockQuotesIcon } from '@/assets/icons/blockquotes.svg';
import user1 from '@/assets/images/user1.png';
import user2 from '@/assets/images/user2.png';
import user3 from '@/assets/images/user3.png';

import { TestimonialCard } from './TestimonialCard';

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemsPerView = useBreakpointValue({ base: 1, lg: 3 }) ?? 3;
  const autoSlideInterval = 5000;

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [activeIndex]);
  const nextSlide = () => {
    setActiveIndex((prevIndex) => {
      const maxIndex = items.length - itemsPerView;
      return prevIndex >= maxIndex ? 0 : prevIndex + 1;
    });
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => {
      const maxIndex = items.length - itemsPerView;
      return prevIndex <= 0 ? maxIndex : prevIndex - 1;
    });
  };

  const visibleItems = items.slice(activeIndex, activeIndex + itemsPerView);
  return (
    <section>
      <Box minH="100vh" px={{ base: 4, md: 6, lg: 8, xl: 12 }}>
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

        <Stack direction={{ base: 'column', lg: 'row' }} spacing={4}>
          <Stack spacing={8} alignItems="center">
            <BlockQuotesIcon />
            <Text
              fontSize={{ base: 'xl', lg: '3xl', xl: '4xl' }}
              fontWeight="bold"
              fontFamily="body"
            >
              What are customers saying
            </Text>
            <HStack w="full" justifyContent="space-between">
              <Icon
                _hover={{ cursor: 'pointer' }}
                onClick={prevSlide}
                as={MdArrowCircleLeft}
                boxSize="34px"
              />
              <HStack spacing={4}>
                {[...Array(items.length)].map((_, index) => {
                  const isActive = index >= activeIndex && index < activeIndex + itemsPerView;
                  return (
                    <Box
                      key={index}
                      boxSize="12px"
                      bgColor={isActive ? 'warning.400' : 'grey.300'}
                      rounded="full"
                    />
                  );
                })}
              </HStack>
              <Icon
                _hover={{ cursor: 'pointer' }}
                color="primary.800"
                as={MdArrowCircleRight}
                onClick={nextSlide}
                boxSize="34px"
              />
            </HStack>
          </Stack>

          <HStack
            display="flex"
            w="full"
            spacing={4}
            as={motion.div}
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition="0.5s linear"
          >
            {visibleItems.map((item) => (
              <Stack key={item.name} w="full">
                <TestimonialCard rating={item.rating} testimonial={item.testimonial} />
                <HStack pt={6} spacing={4} px={12}>
                  <Avatar src={item.img} name={item.name} size="55px" />
                  <Box>
                    <Text fontStyle="lato" fontWeight="semibold" fontSize="1.25rem">
                      {item.name}
                    </Text>
                    <Text fontStyle="lato" fontWeight="medium" fontSize="1.25rem">
                      {item.jobDescription}
                    </Text>
                  </Box>
                </HStack>
              </Stack>
            ))}
          </HStack>
        </Stack>
      </Box>
    </section>
  );
};

const items = [
  {
    testimonial:
      'GoSwiftli made it so easy to pay my Chinese suppliers without waiting days for a bank transfer!',
    rating: 5,
    name: 'Ayo',
    jobDescription: 'Lagos Island Trader',
    img: user1,
  },
  {
    testimonial:
      'As a freelancer, I get paid in USD and GBP, and GoSwiftli helps me convert my money at the best rates',
    rating: 4,
    name: 'Tayo',
    jobDescription: 'Graphic Designer',
    img: user2,
  },
  {
    testimonial:
      'The WhatsApp payment option is a game-changer for our business. Our suppliers get paid in minutes!',
    rating: 4,
    name: 'Chioma',
    jobDescription: 'Boutique Owner',
    img: user3,
  },
  {
    testimonial:
      'GoSwiftli made it so easy to pay my Chinese suppliers without waiting days for a bank transfer!',
    rating: 5,
    name: 'Ronke',
    jobDescription: 'Lagos Island Trader',
    img: user1,
  },
  {
    testimonial:
      'As a freelancer, I get paid in USD and GBP, and GoSwiftli helps me convert my money at the best rates',
    rating: 4,
    name: 'Titi',
    jobDescription: 'Graphic Designer',
    img: user2,
  },
  {
    testimonial:
      'The WhatsApp payment option is a game-changer for our business. Our suppliers get paid in minutes!',
    rating: 4,
    name: 'Chika',
    jobDescription: 'Boutique Owner',
    img: user3,
  },
];
