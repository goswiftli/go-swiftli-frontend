import { Stack, useBreakpointValue } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { Footer } from './Footer';
import { Header } from './Header';
import { MobileHeader } from './MobileHeader';

export const Layout = ({ children }: { children: ReactNode }) => {
  const isMobileSize = useBreakpointValue({ base: true, lg: false });
  return (
    <Stack bgColor="#F7F7FC">
      {isMobileSize ? <MobileHeader /> : <Header />}

      {children}

      <Footer />
    </Stack>
  );
};
