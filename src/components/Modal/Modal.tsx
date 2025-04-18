import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  Fade,
  ModalBody,
  SystemStyleObject,
} from '@chakra-ui/react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  body: React.ReactNode;
  id: string;
  styles?: SystemStyleObject | undefined;
}

export const Modal = (props: ModalProps) => {
  const { isOpen, onClose, body, id, styles } = props;
  return (
    <>
      <Fade in={isOpen}>
        <ChakraModal
          size={{ base: 'xs', md: '2xl', lg: '4xl' }}
          id={id}
          isOpen={isOpen}
          onClose={onClose}
          motionPreset="none"
        >
          <ModalOverlay />
          <ModalContent py={10} sx={styles}>
            <ModalBody>{body}</ModalBody>
          </ModalContent>
        </ChakraModal>
      </Fade>
    </>
  );
};
