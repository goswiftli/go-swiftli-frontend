import { Stack } from '@chakra-ui/react';

import { Head } from '@/components';

import { Withdraw } from '../components';

export const WithdrawView = () => {
  return (
    <>
      <Head title="withdraw" />

      <Stack>
        <Withdraw />
      </Stack>
    </>
  );
};
