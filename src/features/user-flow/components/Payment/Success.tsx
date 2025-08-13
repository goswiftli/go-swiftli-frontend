import { Box, Icon, Stack, Text } from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';

export const Success = () => {
  return (
    <Box minH="80vh">
      <Stack justifyContent="center" alignItems="center">
        <Icon as={FaCheckCircle} boxSize="md" color="success.400" />
        <Box>
          <Text fontWeight="bold" fontSize="6xl" fontFamily="body">
            Payment Successful!
          </Text>
          <Text fontFamily="body" fontSize="md">
            The payment you made has been successful
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};
