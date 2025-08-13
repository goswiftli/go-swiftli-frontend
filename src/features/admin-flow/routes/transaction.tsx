import { Box } from '@chakra-ui/react';

import { Head } from '@/components';

import { Transaction } from '../components';

export const TransactionView = () => {
  return (
    <>
      <Head title="transaction" />

      <Box>
        <Transaction />
      </Box>
    </>
  );
};
