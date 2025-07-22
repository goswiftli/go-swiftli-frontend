import { Stack } from '@chakra-ui/react';

import { Head } from '@/components';

import { Kyc } from '../components/Kyc';

export const KycView = () => {
  return (
    <>
      <Head title="kyc" />

      <Stack>
        <Kyc />
      </Stack>
    </>
  );
};
