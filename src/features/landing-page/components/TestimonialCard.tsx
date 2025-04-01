import { Box, HStack, Icon, Stack, Text } from '@chakra-ui/react';
import { IoMdStar } from 'react-icons/io';

import { ReactComponent as BlockQuotesIcon } from '@/assets/icons/blockquotes.svg';

type TestimonialCardProps = {
  testimonial: string;
  rating: number;
};

const RightAngleTriangle = ({ width = 100, height = 50, color = 'blue' }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="1" stdDeviation="0" floodOpacity="0" />
      </filter>
    </defs>
    <path d={`M0 0 L${width} 0 L0 ${height} Z`} fill={color} filter="url(#shadow)" />
  </svg>
);

export const TestimonialCard = ({ rating, testimonial }: TestimonialCardProps) => {
  return (
    <Box
      p={6}
      bgColor="white"
      position="relative"
      boxShadow="box-shadow: 0px 2px 2px 0px #0000001A"
    >
      <Stack spacing={8}>
        <BlockQuotesIcon />
        <Text noOfLines={3} fontFamily="body" fontSize="lg" fontWeight="medium" color="black.500">
          {testimonial}
        </Text>
        <Rating rating={rating} />
      </Stack>
      <Box position="absolute" bottom="-17%" left="0px">
        <RightAngleTriangle width={100} height={50} color="white" />
      </Box>
    </Box>
  );
};

const Rating = ({ rating }: { rating: number }) => {
  return (
    <HStack spacing={1} zIndex={10}>
      {[...Array(5)].map((_, index) => (
        <Icon
          key={index}
          as={IoMdStar}
          boxSize="25px"
          color={index < rating ? 'warning.400' : 'grey.300'}
        />
      ))}
    </HStack>
  );
};
