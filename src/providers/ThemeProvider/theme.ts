import { type ThemeConfig, extendTheme } from '@chakra-ui/react';

import { colors, components, fontConfig } from './customs';

const config: ThemeConfig = {
  useSystemColorMode: true,
  cssVarPrefix: 'exstacck',
};

export const theme = extendTheme({
  config,
  colors,
  ...fontConfig,
  components,
});
