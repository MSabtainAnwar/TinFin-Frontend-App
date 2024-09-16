// theme/index.js
import { extendTheme } from 'native-base';
import colors from './colors';
import typography from './typography';

const customTheme = extendTheme({
  colors,
  ...typography,
  // You can add other customizations like spacing, border radius, etc.
  space: {
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
  },
  sizes: {
    container: 1080,
    lg: 768,
    md: 640,
  },
  borderRadii: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 16,
  },
});

export default customTheme;
