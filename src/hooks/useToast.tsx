import { Box, useToast as useChakraToast, UseToastOptions } from '@chakra-ui/react';

export const useToast = () => {
  const chakraToast = useChakraToast();

  function toast(options?: UseToastOptions | undefined) {
    const { id } = options || {};
    if (id && !chakraToast.isActive(id)) {
      chakraToast({
        ...options,
        position: 'top',
        isClosable: true,
        size: 'sm',
        icon: undefined,
        variant: 'left-accent',
        description: (
          <Box fontSize="sm" fontFamily="body" fontWeight="medium">
            {options?.description}
          </Box>
        ),
      });
    }
  }

  return toast;
};
