import { Stack } from '@chakra-ui/react';

import { Head } from '@/components';

import { Payment } from '../components/';

export const PaymentView = () => {
  return (
    <>
      <Head title="payment" />

      <Stack spacing={6}>
        <Payment />
      </Stack>
    </>
  );
};
