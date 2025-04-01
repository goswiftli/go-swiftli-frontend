import '@fontsource/lato';
import { ReactNode } from 'react';
import { theme } from './theme';
import { ChakraProvider } from '@chakra-ui/react';

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
