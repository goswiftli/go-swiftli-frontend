import { Stack } from '@chakra-ui/react';

import { Head } from '@/components';

import { BarChartActiveUsers, OverviewHeader } from '../components';

export const OverviewView = () => {
  return (
    <>
      <Head title="overview" />

      <Stack spacing={6}>
        <OverviewHeader />
        <BarChartActiveUsers />
      </Stack>
    </>
  );
};
