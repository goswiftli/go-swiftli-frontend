import {
  FormControl,
  type FormControlProps,
  FormLabel,
  FormErrorMessage,
  Input,
  type InputProps,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

export type FormInputProps = InputProps & {
  label?: ReactNode;
  errorMessage?: string | boolean | string[];
  name: string;
  formControlProps?: FormControlProps;
};

export function FormInput({ label, errorMessage, formControlProps, ...rest }: FormInputProps) {
  return (
    <FormControl {...formControlProps} isInvalid={!!errorMessage}>
      {label && (
        <FormLabel fontWeight="medium" fontSize="lg" fontFamily="body">
          {label}
        </FormLabel>
      )}
      <Input
        {...rest}
        data-testid={rest.name}
        px={4}
        py={3}
        _placeholder={{
          color: 'black.200',
          fontSize: 'sm',
          fontFamily: 'body',
          fontWeight: 'normal',
        }}
      />
      <FormErrorMessage mt="2px" fontSize={'xs'} fontFamily="body">
        {errorMessage}
      </FormErrorMessage>
    </FormControl>
  );
}
