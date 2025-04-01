import { Box } from '@chakra-ui/react';
import { Suspense } from 'react';
import { Outlet } from 'react-router';

import { LogoLoader } from '@/components/Elements';

export const BaseApp = () => {
  return (
    <Suspense
      fallback={
        <Box h={'100vh'}>
          <LogoLoader text="Loading..." />
        </Box>
      }
    >
      <Outlet />
    </Suspense>
  );
};
