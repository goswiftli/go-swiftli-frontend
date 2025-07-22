import { Stack } from '@chakra-ui/react';

import { Head } from '@/components';

import { AddBeneficiary } from '../components';

export const AddBeneficiaryView = () => {
  return (
    <>
      <Head title="add-beneficiary" />

      <Stack>
        <AddBeneficiary />
      </Stack>
    </>
  );
};
