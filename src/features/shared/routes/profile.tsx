import { Stack } from '@chakra-ui/react';

import { Head } from '@/components';

import { Profile } from '../components';

export const ProfileView = () => {
  return (
    <>
      <Head title="profile" />

      <Stack>
        <Profile />
      </Stack>
    </>
  );
};
