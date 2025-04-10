import { Stack, useBreakpointValue } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { LINKS } from '@/constants';

import { Footer } from './Footer';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

const navItems = [
  {
    item: 'Home',
    link: LINKS.HOME,
  },
  {
    item: 'How it starts',
    link: LINKS.HOME,
  },
  {
    item: 'FAQ',
    link: LINKS.HOME,
  },
];

export const Layout = ({ children }: { children: ReactNode }) => {
  const isMobileSize = useBreakpointValue({ base: true, lg: false });
  return (
    <Stack bgColor="#F7F7FC">
      {isMobileSize ? <Sidebar navItems={navItems} /> : <Header />}

      {children}

      <Footer />
    </Stack>
  );
};
