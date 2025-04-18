export const Button = {
  defaultProps: {
    size: 'md',
    fontFamily: 'body',
    variant: 'primary',
  },
  baseStyle: {
    rounded: 'full',
    fontFamily: 'body',
    fontWeight: 'normal',
  },
  variants: {
    primary: {
      color: 'white',
      bgColor: 'primary.800',
      _focus: {
        bgColor: 'primary.800',
        color: 'white',
      },
      _hover: {
        bgColor: 'primary.800',
        color: 'white',
      },
    },
    secondary: {
      color: 'black.700',
      bgColor: 'white',
      border: '1px solid',
      borderColor: 'primary.800',
      _hover: {
        bgColor: 'gray.400',
        color: 'primary.800',
        border: 'none',
      },
      _focus: {
        bgColor: 'gray.400',
        color: 'primary.800',
        border: 'none',
      },
    },
    tertiary: {
      color: 'primary.500',
      bgColor: 'white',
      border: '1.8px solid',
      borderColor: 'primary.500',
      _hover: {
        bgColor: 'primary.500',
        color: 'white',
      },
      _focus: {
        border: '8px solid',
        borderColor: 'primary.100',
        boxShadow: ' 0px 0px 27px rgba(24, 19, 162, 0.2)',
        bgColor: 'brand.primary.500',
      },
    },
    'outline-1': {
      color: 'white',
      bgColor: 'transparent',
      border: '1px solid',
      borderColor: 'info.100',
      _hover: {
        bgColor: 'transparent',
        color: 'white',
      },
    },
  },
  sizes: {
    sm: {
      h: '40px',
      fontSize: 'sm',
    },
    md: {
      h: '48px',
      fontSize: 'md',
    },
    lg: {
      h: '56px',
      fontSize: 'xl',
    },
  },
};
