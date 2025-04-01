import { Box, Center, Spinner, Text, VisuallyHidden } from '@chakra-ui/react';

type Props = {
  text?: string;
};
export const LogoLoader = ({ text = 'Loading...' }: Props) => {
  return (
    <Box role="status" w="full" h="full" overflow="hidden" inset={0}>
      <Center gap="4" h="full" w="full" flexDirection={'column'}>
        <Spinner size={'md'} color="primary.800" />

        <Text fontSize={'md'} fontWeight={'semibold'} color={'primary.800'}>
          {text}
        </Text>
      </Center>
      <VisuallyHidden>Loading...</VisuallyHidden>
    </Box>
  );
};
