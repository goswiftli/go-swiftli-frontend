import { Stack } from '@chakra-ui/react';

import { Head } from '@/components';

import { Transactions } from '../components';

export const TransactionsView = () => {
  return (
    <>
      <Head title="transactions" />

      <Stack>
        <Transactions />
      </Stack>
    </>
  );
};
