import { Box } from '@chakra-ui/react';

import { Head } from '@/components';

import { ExchangeList } from '../components';

export const ExchangeView = () => {
  return (
    <>
      <Head title="exchange" />

      <Box>
        <ExchangeList />
      </Box>
    </>
  );
};
