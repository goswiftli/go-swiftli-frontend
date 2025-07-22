import { Stack } from '@chakra-ui/react';

import { Head } from '@/components';

import { ConvertFund } from '../components';

export const ConvertFundView = () => {
  return (
    <>
      <Head title="convert-fund" />

      <Stack>
        <ConvertFund />
      </Stack>
    </>
  );
};
