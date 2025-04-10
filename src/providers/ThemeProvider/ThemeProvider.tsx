import '@fontsource/lato';
import '@fontsource/inter';
import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { theme } from './theme';

type ThemeProviderProps = {
  children: ReactNode;
};
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      {children}
    </ChakraProvider>
  );
};
