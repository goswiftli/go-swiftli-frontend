import { Stack } from '@chakra-ui/react';

import { Head } from '@/components';

import { Beneficiaries } from '../components';
import { Header } from '../Layout';

export const BeneficiariesView = () => {
  return (
    <>
      <Head title="beneficiary" />

      <Stack spacing={6}>
        <Header title="Beneficiary Management" />
        <Beneficiaries />
      </Stack>
    </>
  );
};
