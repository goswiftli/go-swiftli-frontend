import { ComponentDefaultProps } from '@chakra-ui/react';

export const Textarea: ComponentDefaultProps = {
  defaultProps: {
    size: 'md',
    variant: 'primary',
  },
  baseStyle: {
    field: {
      borderRadius: '8px',
      fontFamily: 'body',
      _focus: {
        borderWidth: '1px',
      },
      borderWidth: '1px',
      minHeight: '48px',
    },
  },

  variants: {
    primary: {
      field: {
        bgColor: 'white',
        borderColor: 'black.200',
        _focus: {
          bgColor: 'white',
          borderColor: 'black.400',
        },
        _hover: {
          border: '1px solid',
          borderColor: 'black.500',
          bgColor: 'transparent',
        },
      },
    },
  },
  sizes: {
    sm: {
      field: {
        minHeight: '40px',
        borderRadius: '4px',
        fontSize: 'sm',
      },
    },
    md: {
      field: {
        minHeight: '48px',
        fontSize: 'md',
        p: '12px 16px',
      },
    },
    lg: {
      field: {
        minHeight: '56px',
        borderWidth: '4px solid',
        fontSize: 'lg',
      },
    },
  },
};
