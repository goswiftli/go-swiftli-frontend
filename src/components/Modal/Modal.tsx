import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  Fade,
  ModalBody,
  SystemStyleObject,
  ModalCloseButton,
} from '@chakra-ui/react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  body: React.ReactNode;
  id: string;
  styles?: SystemStyleObject | undefined;
  trigger?: React.ReactNode;
  closeOnOverlayClick?: boolean;
}

export const Modal = (props: ModalProps) => {
  const { isOpen, onClose, body, id, styles, trigger, closeOnOverlayClick = false } = props;
  return (
    <>
      {trigger}
      <Fade in={isOpen}>
        <ChakraModal
          size={{ base: 'xs', md: '2xl', lg: '4xl' }}
          id={id}
          isOpen={isOpen}
          onClose={onClose}
          motionPreset="none"
          closeOnOverlayClick={closeOnOverlayClick}
        >
          <ModalOverlay />
          <ModalContent py={10} sx={styles}>
            <ModalCloseButton />
            <ModalBody>{body}</ModalBody>
          </ModalContent>
        </ChakraModal>
      </Fade>
    </>
  );
};
