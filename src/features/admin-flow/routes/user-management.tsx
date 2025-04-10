import { Stack } from '@chakra-ui/react';

import { Head } from '@/components';

import { UserManagement } from '../components';
import { Header } from '../Layout';

export const UserManagementView = () => {
  return (
    <>
      <Head title="overview" />

      <Stack spacing={6}>
        <Header title="User Management" />
        <UserManagement />
      </Stack>
    </>
  );
};
