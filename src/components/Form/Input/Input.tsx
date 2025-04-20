import {
  FormControl,
  type FormControlProps,
  FormLabel,
  FormErrorMessage,
  Input,
  type InputProps,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

export type FormInputProps = InputProps & {
  label?: ReactNode;
  errorMessage?: string | boolean | string[];
  name: string;
  formControlProps?: FormControlProps;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
};

export function FormInput({
  label,
  errorMessage,
  formControlProps,
  leftElement,
  rightElement,
  ...rest
}: FormInputProps) {
  return (
    <FormControl {...formControlProps} isInvalid={!!errorMessage}>
      {label && (
        <FormLabel fontWeight="medium" fontSize="lg" fontFamily="body">
          {label}
        </FormLabel>
      )}
      <InputGroup>
        {leftElement && <InputLeftElement>{leftElement}</InputLeftElement>}
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
        {rightElement && <InputRightElement>{rightElement}</InputRightElement>}
      </InputGroup>
      <FormErrorMessage mt="2px" fontSize="xs" fontFamily="body">
        {errorMessage}
      </FormErrorMessage>
    </FormControl>
  );
}
