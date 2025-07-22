import { Stack } from '@chakra-ui/react';

import { Head } from '@/components';

import { Settings } from '../components';

export const SettingsView = () => {
  return (
    <>
      <Head title="settings" />

      <Stack>
        <Settings />
      </Stack>
    </>
  );
};
