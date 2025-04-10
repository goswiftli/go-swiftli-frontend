import { Stack } from '@chakra-ui/react';

import { Head } from '@/components';

import { BarChartActiveUsers, OverviewHeader } from '../components';
import { Header } from '../Layout';

export const OverviewView = () => {
  return (
    <>
      <Head title="overview" />

      <Stack spacing={6}>
        <Header title="Overview" />
        <OverviewHeader />
        <BarChartActiveUsers />
      </Stack>
    </>
  );
};
