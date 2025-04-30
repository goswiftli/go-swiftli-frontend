import { Box, Button, HStack, Text, useDisclosure, VStack } from '@chakra-ui/react';

import { Modal } from '../Modal';

type ApproveProps = {
  text: string;
  actionHandler?: () => void;
};

export const Approve = ({ text, actionHandler }: ApproveProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Modal
      id="approve"
      isOpen={isOpen}
      styles={{ w: { base: 'full', lg: '50%', xl: '40%' } }}
      onClose={onClose}
      trigger={
        <Button w="full" rounded="8px" variant="success-button" onClick={onOpen}>
          Approve
        </Button>
      }
      body={
        <VStack spacing={10}>
          <Box textAlign="center">
            <Text fontFamily="body" fontSize="xl" fontWeight="semibold" pb={4}>
              Approve
            </Text>
            <Text fontFamily="body" fontSize="lg" color="black.400">
              {text}
            </Text>
          </Box>

          <HStack w="full" justifyContent="center">
            <Button w="30%" rounded="8px" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button w="30%" rounded="8px" variant="success-button" onClick={actionHandler}>
              Approve
            </Button>
          </HStack>
        </VStack>
      }
    />
  );
};
