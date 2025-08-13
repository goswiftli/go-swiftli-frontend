import { Box } from '@chakra-ui/react';

import { Head } from '@/components';

import { UserManagement } from '../components';

export const UserManagementView = () => {
  return (
    <>
      <Head title="overview" />

      <Box>
        <UserManagement />
      </Box>
    </>
  );
};
