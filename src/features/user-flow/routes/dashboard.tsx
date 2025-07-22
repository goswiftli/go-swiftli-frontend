import { Stack } from '@chakra-ui/react';

import { Head } from '@/components';

import { Dashboard } from '../components/Dashboard';

export const DashboardView = () => {
  return (
    <>
      <Head title="dashboard" />

      <Stack spacing={6}>
        <Dashboard />
      </Stack>
    </>
  );
};
