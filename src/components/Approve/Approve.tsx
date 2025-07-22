import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react';

import { Modal } from '../Modal';

type ApproveProps = {
  text: string;
  actionHandler: () => void;
  isLoading: boolean;
  modalOptions: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
  };
};

export const Approve = ({ text, actionHandler, isLoading, modalOptions }: ApproveProps) => {
  return (
    <Modal
      id="approve"
      isOpen={modalOptions.isOpen}
      styles={{ w: { base: 'full', lg: '50%', xl: '40%' } }}
      onClose={modalOptions.onClose}
      trigger={
        <Button w="full" rounded="8px" variant="success-button" onClick={modalOptions.onOpen}>
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
            <Button w="30%" rounded="8px" variant="secondary" onClick={modalOptions.onClose}>
              Cancel
            </Button>
            <Button
              w="30%"
              rounded="8px"
              variant="success-button"
              onClick={actionHandler}
              isLoading={isLoading}
            >
              Approve
            </Button>
          </HStack>
        </VStack>
      }
    />
  );
};
