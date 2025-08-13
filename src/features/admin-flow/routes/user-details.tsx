import { Box } from '@chakra-ui/react';

import { Head } from '@/components';

import { UserDetails } from '../components';

export const UserDetailsView = () => {
  return (
    <>
      <Head title="user-details" />

      <Box>
        <UserDetails />
      </Box>
    </>
  );
};
