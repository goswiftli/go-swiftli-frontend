import { Stack } from '@chakra-ui/react';

import { Head } from '@/components';

import { UserDetails } from '../components';
import { Header } from '../Layout';

export const UserDetailsView = () => {
  return (
    <>
      <Head title="user-details" />

      <Stack spacing={6}>
        <Header title="User Management" />
        <UserDetails />
      </Stack>
    </>
  );
};
