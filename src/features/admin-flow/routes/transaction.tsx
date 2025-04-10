import { Stack } from '@chakra-ui/react';

import { Head } from '@/components';

import { Transaction } from '../components';
import { Header } from '../Layout';

export const TransactionView = () => {
  return (
    <>
      <Head title="transaction" />

      <Stack spacing={6}>
        <Header title="Transaction management" />
        <Transaction />
      </Stack>
    </>
  );
};
