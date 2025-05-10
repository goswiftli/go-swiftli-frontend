import { Stack } from '@chakra-ui/react';

import { Head } from '@/components';

import { Beneficiaries } from '../components';

export const BeneficiariesView = () => {
  return (
    <>
      <Head title="beneficiaries" />

      <Stack>
        <Beneficiaries />
      </Stack>
    </>
  );
};
