import { Box } from '@chakra-ui/react';

import { Head } from '@/components';

import { Beneficiaries } from '../components';

export const BeneficiariesView = () => {
  return (
    <>
      <Head title="beneficiary" />

      <Box>
        <Beneficiaries />
      </Box>
    </>
  );
};
