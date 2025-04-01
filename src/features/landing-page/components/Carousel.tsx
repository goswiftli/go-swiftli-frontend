import { Box, HStack, Stack, Text, useBreakpointValue } from '@chakra-ui/react';
import { CustomerCard, CustomerCardProps } from './CustomerCard';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemsPerView = useBreakpointValue({ base: 1, lg: 3 }) ?? 3;

  const autoSlideInterval = 2000;

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [activeIndex]);
  const nextSlide = () => {
    setActiveIndex((prevIndex) => {
      const maxIndex = cardItems.length - itemsPerView;
      return prevIndex >= maxIndex ? 0 : prevIndex + 1;
    });
  };

  // const [currentIndex, setCurrentIndex] = useState(0);
  // const [direction, setDirection] = useState(0);

  // const [positionIndexes, setPositionIndexes] = useState([0, 1, 2, 3, 4]);

  // const positions = ['right', 'center', 'left'];

  // const imageVariants = {
  //   center: { x: '50%', scale: 1, zIndex: 5 },
  //   left: { x: '0%', scale: 0.8, zIndex: 2 },
  //   right: { x: '-50%', scale: 0.8, zIndex: 2 },
  // };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setPositionIndexes((prevIndexes) => [
  //       (prevIndexes[1] + 1) % cardItems.length,
  //       (prevIndexes[2] + 1) % cardItems.length,
  //       (prevIndexes[0] + 1) % cardItems.length,
  //     ]);
  //   }, 3000); // Change every 3 seconds

  //   return () => clearInterval(interval);
  // }, []);

  const visibleItems = cardItems.slice(activeIndex, activeIndex + itemsPerView);
  return (
    <section>
      <Box minH="100vh">
        <Stack justifyContent="center" alignItems="center" spacing={6}>
          <AnimatePresence>
            <HStack
              w="full"
              as={motion.div}
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition="0.5s linear"
              justifyContent="center"
            >
              {visibleItems.map((cardItem) => (
                <CustomerCard key={cardItem.customerName} {...cardItem} />
              ))}
            </HStack>
          </AnimatePresence>

          <Text fontWeight="bold" fontFamily="body" fontSize="md" textAlign="center">
            No Hidden Fees | Competitive Exchange Rates | Fast Processing Times
          </Text>
          <HStack spacing={4} w="full" alignItems="center" justifyContent="center">
            {[...Array(cardItems.length)].map((_, index) => {
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
        </Stack>
      </Box>
    </section>
  );
};

const cardItems: CustomerCardProps[] = [
  {
    customerName: 'Ayo',
    transactionAmount: '$47,000',
    jobType: 'Business',
    jobDescription: 'Island Trader',
  },
  {
    customerName: 'Tayo',
    transactionAmount: '$7,000',
    jobType: 'Freelancer',
    jobDescription: 'Graphic Designer',
  },

  {
    customerName: 'Chioma',
    transactionAmount: '$47,000',
    jobType: 'Business',
    jobDescription: 'Boutique Ownner',
  },
  {
    customerName: 'Ayomide',
    transactionAmount: '$47,000',
    jobType: 'Business',
    jobDescription: 'Island Trader',
  },
  {
    customerName: 'Dayo',
    transactionAmount: '$7,000',
    jobType: 'Freelancer',
    jobDescription: 'Graphic Designer',
  },

  {
    customerName: 'Chisom',
    transactionAmount: '$47,000',
    jobType: 'Business',
    jobDescription: 'Boutique Ownner',
  },
];
